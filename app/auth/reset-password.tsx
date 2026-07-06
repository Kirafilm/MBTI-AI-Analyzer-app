import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import { getSupabaseClient } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const colors = useColors();
  const { t } = useI18n();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  // Extract the recovery token from the URL hash (#access_token=xxx&type=recovery)
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    async function initSession() {
      try {
        const hash = window.location.hash;
        if (!hash) {
          setInvalidLink(true);
          return;
        }
        const params = new URLSearchParams(hash.replace("#", ""));
        const token = params.get("access_token");
        const type = params.get("type");

        if (!token || type !== "recovery") {
          setInvalidLink(true);
          return;
        }

        setAccessToken(token);

        // Use the recovery token to establish a temporary Supabase session
        // so that updateUser({ password }) will work.
        const supabase = getSupabaseClient();
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: token,
          refresh_token: params.get("refresh_token") ?? "",
        });

        if (sessionError) {
          console.error("[ResetPassword] setSession error:", sessionError.message);
          setSessionError(sessionError.message);
          // Don't set invalidLink — let user see the error on form submit
          return;
        }

        setSessionReady(true);
      } catch (err) {
        console.error("[ResetPassword] initSession error:", err);
        setInvalidLink(true);
      }
    }

    void initSession();
  }, []);

  const handleReset = async () => {
    if (submitting || success || invalidLink) return;

    if (!sessionReady) {
      setError(sessionError ? `${t("failed")}：${sessionError}` : t("invalidOrExpiredLink"));
      return;
    }

    if (newPassword.length < 6) {
      setError(t("passwordTooShort"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const supabase = getSupabaseClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        console.error("[ResetPassword] Supabase updateUser error:", updateError.message);
        setError(`${t("failed")}：${updateError.message}`);
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error("[ResetPassword] Unexpected error:", err);
      setError(`${t("failed")}：${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="p-6">
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.replace("/auth/login")}
            accessibilityRole="button"
            accessibilityLabel={t("goBack")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View className="p-2 rounded-lg bg-surface border border-border">
              <MaterialIcons name="arrow-back" size={20} color={colors.text} />
            </View>
          </Pressable>
        </View>

        <View className="flex-1 items-center justify-center gap-6">
          {/* Invalid / expired link */}
          {invalidLink ? (
            <>
              <View className="w-16 h-16 rounded-full bg-error/10 items-center justify-center">
                <MaterialIcons name="link-off" size={32} color={colors.error || "#ef4444"} />
              </View>
              <Text className="text-2xl font-bold text-foreground text-center">
                {t("invalidOrExpiredLink")}
              </Text>
              <Text className="text-sm text-muted text-center max-w-sm">
                {t("invalidOrExpiredLinkDescription")}
              </Text>
              <Pressable
                onPress={() => router.replace("/auth/login")}
                accessibilityRole="button"
                accessibilityLabel={t("backToLogin")}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
                ]}
              >
                <View
                  style={{ minWidth: 260 }}
                  className="bg-primary rounded-xl px-5 py-4 items-center justify-center"
                >
                  <Text className="text-background font-semibold text-base">{t("backToLogin")}</Text>
                </View>
              </Pressable>
            </>
          ) : success ? (
            /* Success */
            <>
              <View className="w-16 h-16 rounded-full bg-green-500/10 items-center justify-center">
                <MaterialIcons name="check-circle" size={32} color="#22c55e" />
              </View>
              <Text className="text-2xl font-bold text-foreground text-center">
                {t("resetSuccess")}
              </Text>
              <Text className="text-sm text-muted text-center max-w-sm">
                {t("resetSuccessDescription")}
              </Text>
              <Pressable
                onPress={() => router.replace("/auth/login")}
                accessibilityRole="button"
                accessibilityLabel={t("login")}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
                ]}
              >
                <View
                  style={{ minWidth: 260 }}
                  className="bg-primary rounded-xl px-5 py-4 flex-row items-center justify-center gap-2"
                >
                  <MaterialIcons name="login" size={20} color={colors.background} />
                  <Text className="text-background font-semibold text-base">{t("login")}</Text>
                </View>
              </Pressable>
            </>
          ) : (
            /* Reset form */
            <>
              <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center">
                <MaterialIcons name="lock-reset" size={32} color={colors.tint} />
              </View>
              <View className="items-center gap-2">
                <Text className="text-2xl font-bold text-foreground">
                  {t("forgotPasswordTitle")}
                </Text>
                <Text className="text-sm text-muted text-center max-w-sm">
                  {t("forgotPasswordDescription")}
                </Text>
              </View>

              <View className="w-full gap-3" style={{ maxWidth: 420 }}>
                <View className="gap-1">
                  <Text className="text-xs font-semibold text-muted">{t("newPassword")}</Text>
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    placeholder={t("newPassword")}
                    placeholderTextColor={colors.muted}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
                  />
                </View>
                <View className="gap-1">
                  <Text className="text-xs font-semibold text-muted">{t("confirmPassword")}</Text>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholder={t("confirmPassword")}
                    placeholderTextColor={colors.muted}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
                    onSubmitEditing={() => { void handleReset(); }}
                  />
                </View>
              </View>

              <Pressable
                onPress={() => { void handleReset(); }}
                disabled={submitting || !sessionReady}
                accessibilityRole="button"
                accessibilityLabel={t("forgotPasswordTitle")}
                style={({ pressed }) => [
                  {
                    opacity: submitting || !sessionReady ? 0.6 : pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
              >
                <View
                  style={{ minWidth: 260 }}
                  className="w-full bg-primary rounded-xl px-5 py-4 flex-row items-center justify-center gap-2"
                >
                  {submitting ? (
                    <ActivityIndicator color={colors.background} />
                  ) : (
                    <MaterialIcons name="lock-reset" size={20} color={colors.background} />
                  )}
                  <Text className="text-background font-semibold text-base">
                    {t("forgotPasswordTitle")}
                  </Text>
                </View>
              </Pressable>

              {error ? (
                <Text className="text-sm text-error text-center">{error}</Text>
              ) : null}
            </>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}
