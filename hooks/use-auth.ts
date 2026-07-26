import * as Api from "@/lib/_core/api";
import * as Auth from "@/lib/_core/auth";
import { setTestPremiumOverride, getTestPremiumOverride } from "@/lib/premium-access";
import { getSupabaseClient } from "@/lib/supabase";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";

type UseAuthOptions = {
  autoFetch?: boolean;
};

function userFromSupabase(sbUser: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
}): Auth.User {
  const meta = sbUser.user_metadata ?? {};
  const fullName =
    typeof meta.full_name === "string"
      ? meta.full_name
      : typeof meta.name === "string"
        ? meta.name
        : null;

  return {
    id: 0,
    openId: sbUser.id,
    name: fullName ?? sbUser.email?.split("@")[0] ?? null,
    email: sbUser.email ?? null,
    loginMethod: "supabase",
    lastSignedIn: new Date(),
  };
}

async function syncAuthTokenFromSupabase(): Promise<{
  accessToken: string | null;
  user: Auth.User | null;
}> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.warn("[useAuth] supabase.getSession error:", error.message);
      return { accessToken: null, user: null };
    }

    const session = data.session;
    if (!session?.access_token || !session.user) {
      return { accessToken: null, user: null };
    }

    await Auth.setSessionToken(session.access_token);
    return {
      accessToken: session.access_token,
      user: userFromSupabase(session.user),
    };
  } catch (err) {
    console.warn("[useAuth] syncAuthTokenFromSupabase failed:", err);
    return { accessToken: null, user: null };
  }
}

export function useAuth(options?: UseAuthOptions) {
  const { autoFetch = true } = options ?? {};
  const [user, setUser] = useState<Auth.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const isTestLoginEnabled = process.env.EXPO_PUBLIC_ENABLE_TEST_LOGIN === "true";

  const fetchUser = useCallback(async () => {
    console.log("[useAuth] fetchUser called");
    try {
      setLoading(true);
      setError(null);

      // Prefer a live Supabase session (includes refresh) over a stale local token.
      const supabaseSession = await syncAuthTokenFromSupabase();
      let sessionToken = supabaseSession.accessToken ?? (await Auth.getSessionToken());

      console.log(
        "[useAuth] Session token:",
        sessionToken ? `present (${sessionToken.substring(0, 20)}...)` : "missing",
      );

      if (!sessionToken) {
        console.log("[useAuth] No session token, setting user to null");
        setUser(null);
        await setTestPremiumOverride(false);
        await Auth.clearUserInfo();
        return;
      }

      const apiUser = await Api.getMe();
      console.log("[useAuth] API user response:", apiUser);
      if (!apiUser) {
        // Backend unavailable / token rejected — keep the user signed in when
        // Supabase still has a valid (or refreshed) session.
        if (supabaseSession.user) {
          setUser(supabaseSession.user);
          await Auth.setUserInfo(supabaseSession.user);
          return;
        }

        // Retry once after forcing a token refresh.
        try {
          const supabase = getSupabaseClient();
          const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession();
          if (!refreshError && refreshed.session?.access_token && refreshed.session.user) {
            await Auth.setSessionToken(refreshed.session.access_token);
            const retryUser = await Api.getMe();
            if (retryUser) {
              const userInfo: Auth.User = {
                id: retryUser.id,
                openId: retryUser.openId,
                name: retryUser.name,
                email: retryUser.email,
                loginMethod: retryUser.loginMethod,
                lastSignedIn: new Date(retryUser.lastSignedIn),
              };
              setUser(userInfo);
              await Auth.setUserInfo(userInfo);
              return;
            }

            const fallback = userFromSupabase(refreshed.session.user);
            setUser(fallback);
            await Auth.setUserInfo(fallback);
            return;
          }
        } catch (refreshErr) {
          console.warn("[useAuth] refreshSession fallback failed:", refreshErr);
        }

        // Test account fallback (when backend is down and no Supabase session)
        if (isTestLoginEnabled) {
          const hasTestOverride = await getTestPremiumOverride();
          if (hasTestOverride) {
            const cached = await Auth.getUserInfo();
            const fallbackUser: Auth.User = cached ?? {
              id: 0,
              openId: "test-user",
              name: "測試帳號",
              email: process.env.EXPO_PUBLIC_TEST_LOGIN_EMAIL?.trim() ?? null,
              loginMethod: "supabase",
              lastSignedIn: new Date(),
            };
            setUser(fallbackUser);
            await Auth.setUserInfo(fallbackUser);
            return;
          }
        }

        await setTestPremiumOverride(false);
        setUser(null);
        await Auth.removeSessionToken();
        await Auth.clearUserInfo();
        return;
      }

      const userInfo: Auth.User = {
        id: apiUser.id,
        openId: apiUser.openId,
        name: apiUser.name,
        email: apiUser.email,
        loginMethod: apiUser.loginMethod,
        lastSignedIn: new Date(apiUser.lastSignedIn),
      };
      setUser(userInfo);
      await Auth.setUserInfo(userInfo);
      return;
    } catch (err) {
      const nextError = err instanceof Error ? err : new Error("Failed to fetch user");
      console.error("[useAuth] fetchUser error:", nextError);

      // Keep signed-in state if Supabase session is still valid.
      const { user: sbUser } = await syncAuthTokenFromSupabase();
      if (sbUser) {
        setUser(sbUser);
        await Auth.setUserInfo(sbUser);
        return;
      }

      if (isTestLoginEnabled) {
        const hasTestOverride = await getTestPremiumOverride();
        if (!hasTestOverride) {
          setError(nextError);
          setUser(null);
        }
      } else {
        setError(nextError);
        setUser(null);
      }
    } finally {
      setLoading(false);
      console.log("[useAuth] fetchUser completed, loading:", false);
    }
  }, [isTestLoginEnabled]);

  const logout = useCallback(async () => {
    try {
      try {
        const supabase = getSupabaseClient();
        await supabase.auth.signOut();
      } catch (err) {
        console.warn("[Auth] Supabase signOut failed:", err instanceof Error ? err.message : err);
      }
      await Api.logout();
    } catch (err) {
      console.error("[Auth] Logout API call failed:", err);
    } finally {
      await setTestPremiumOverride(false);
      await Auth.removeSessionToken();
      await Auth.clearUserInfo();
      setUser(null);
      setError(null);
    }
  }, []);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  useEffect(() => {
    console.log("[useAuth] useEffect triggered, autoFetch:", autoFetch, "platform:", Platform.OS);
    if (autoFetch) {
      fetchUser();
    } else {
      console.log("[useAuth] autoFetch disabled, setting loading to false");
      setLoading(false);
    }
  }, [autoFetch, fetchUser]);

  // Keep app session token in sync when Supabase refreshes access tokens.
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    try {
      const supabase = getSupabaseClient();
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_OUT") {
          await Auth.removeSessionToken();
          await Auth.clearUserInfo();
          setUser(null);
          return;
        }

        if (
          (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") &&
          session?.access_token
        ) {
          await Auth.setSessionToken(session.access_token);
          if (session.user && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
            const nextUser = userFromSupabase(session.user);
            setUser((prev) => prev ?? nextUser);
            await Auth.setUserInfo(nextUser);
          }
        }
      });
      unsubscribe = () => data.subscription.unsubscribe();
    } catch (err) {
      console.warn("[useAuth] onAuthStateChange setup failed:", err);
    }

    return () => {
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    console.log("[useAuth] State updated:", {
      hasUser: !!user,
      loading,
      isAuthenticated,
      error: error?.message,
    });
  }, [user, loading, isAuthenticated, error]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    refresh: fetchUser,
    logout,
  };
}
