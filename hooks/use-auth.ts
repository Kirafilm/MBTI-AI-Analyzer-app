import * as Api from "@/lib/_core/api";
import * as Auth from "@/lib/_core/auth";
import { setTestPremiumOverride, getTestPremiumOverride } from "@/lib/premium-access";
import { getSupabaseClient } from "@/lib/supabase";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";

type UseAuthOptions = {
  autoFetch?: boolean;
};

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

      console.log("[useAuth] Checking for session token...");
      const sessionToken = await Auth.getSessionToken();
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
        // Backend is unavailable — try to verify the session via Supabase
        // so real users aren't logged out just because the custom API is down.
        try {
          const supabase = getSupabaseClient();
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData.session?.user) {
            const sbUser = sessionData.session.user;
            const supabaseUser: Auth.User = {
              id: 0,
              openId: sbUser.id,
              name: sbUser.user_metadata?.full_name ?? sbUser.email?.split("@")[0] ?? null,
              email: sbUser.email ?? null,
              loginMethod: "supabase",
              lastSignedIn: new Date(),
            };
            setUser(supabaseUser);
            await Auth.setUserInfo(supabaseUser);
            return;
          }
        } catch (sbErr) {
          console.warn("[useAuth] Supabase getSession fallback failed:", sbErr);
        }

        // Test account fallback (when backend is down and no Supabase session)
        // Only enable if EXPO_PUBLIC_ENABLE_TEST_LOGIN is true
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
      const error = err instanceof Error ? err : new Error("Failed to fetch user");
      console.error("[useAuth] fetchUser error:", error);
      // If test override is active and test login is enabled, keep the user session alive even on error
      if (isTestLoginEnabled) {
        const hasTestOverride = await getTestPremiumOverride();
        if (!hasTestOverride) {
          setError(error);
          setUser(null);
        }
      } else {
        setError(error);
        setUser(null);
      }
    } finally {
      setLoading(false);
      console.log("[useAuth] fetchUser completed, loading:", false);
    }
  }, []);

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
