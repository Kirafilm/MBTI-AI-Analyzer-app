import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import { getSupabaseClient } from "@/lib/supabase";
import * as Auth from "@/lib/_core/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const TEST_LOGIN_EMAIL = process.env.EXPO_PUBLIC_TEST_LOGIN_EMAIL?.trim() ?? "";
const TEST_LOGIN_PASSWORD = process.env.EXPO_PUBLIC_TEST_LOGIN_PASSWORD ?? "";
const ENABLE_TEST_LOGIN = process.env.EXPO_PUBLIC_ENABLE_TEST_LOGIN === "true";

export default function LoginScreen() {
  const router = useRouter();
  const colors = useColors();
  const { t, language } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot password modal state
  const [forgotVisible, setForgotVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSending, setForgotSending] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  const hasTestLogin = Boolean(ENABLE_TEST_LOGIN && TEST_LOGIN_EMAIL && TEST_LOGIN_PASSWORD);

  const getTestLoginText = () => {
    if (language === "en") {
      return {
        button: "Test Account Login",
        hint: "For internal testing only",
        missing: "Test account is not configured yet.",
        needsConfirmation:
          "Test account was created. If email confirmation is enabled in Supabase, confirm the email before signing in.",
      };
    }
    if (language === "zh-CN") {
      return {
        button: "测试账号登录",
        hint: "仅供内部测试使用",
        missing: "测试账号尚未配置。",
        needsConfirmation: "测试账号已创建。如 Supabase 开启邮箱验证，请先完成验证后再登录。",
      };
    }
    return {
      button: "測試帳號登入",
      hint: "只供內部測試使用",
      missing: "測試帳號尚未配置。",
      needsConfirmation: "測試帳號已建立。如 Supabase 開啟 Email 驗證，請先完成驗證後再登入。",
    };
  };

  const completeLogin = async (token: string) => {
    await Auth.setSessionToken(token);
    router.replace("/(tabs)");
  };

  const handleLogin = async (overrideCredentials?: {
    email: string;
    password: string;
    allowAutoCreate?: boolean;
  }) => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const normalizedEmail = (overrideCredentials?.email ?? email).trim();
      const activePassword = overrideCredentials?.password ?? password;
      if (!normalizedEmail.includes("@")) {
        setError(t("invalidEmail"));
        return;
      }
      if (activePassword.length < 6) {
        setError(t("passwordTooShort"));
        return;
      }

      // --- Dev-only fast path: skip Supabase for the built-in test account ---
      const isTestAccount =
        overrideCredentials?.allowAutoCreate === true &&
        normalizedEmail === TEST_LOGIN_EMAIL &&
        activePassword === TEST_LOGIN_PASSWORD;

      if (isTestAccount) {
        // Create a synthetic JWT so session logic works without a backend.
        // The token is only used as a localStorage key — it is never sent to
        // the backend API because the test-override flag prevents that call.
        const fakeToken = `dev-test-${Date.now()}`;
        await completeLogin(fakeToken);
        return;
      }

      const supabase = getSupabaseClient();
      const result = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: activePassword,
      });

      if (result.error) {
        console.error("[Login] Supabase signInWithPassword error:", result.error.message);
        const msg = result.error.message.toLowerCase();
        if (overrideCredentials?.allowAutoCreate && (msg.includes("invalid") || msg.includes("credentials"))) {
          const signUpResult = await supabase.auth.signUp({
            email: normalizedEmail,
            password: activePassword,
          });

          if (signUpResult.error) {
            setError(`${t("failed")}：${signUpResult.error.message}`);
            return;
          }

          const createdToken = signUpResult.data.session?.access_token;
          if (!createdToken) {
            setError(getTestLoginText().needsConfirmation);
            return;
          }

          await completeLogin(createdToken);
          return;
        }

        if (msg.includes("invalid") || msg.includes("credentials")) {
          setError(t("invalidCredentials"));
          return;
        }
        setError(`${t("failed")}：${result.error.message}`);
        return;
      }

      const token = result.data.session?.access_token;
      if (!token) {
        setError(t("failed"));
        return;
      }

      await completeLogin(token);
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      console.error("[Login] Unexpected error:", err);
      if (code === "SUPABASE_NOT_CONFIGURED") {
        setError(t("supabaseNotConfigured"));
      } else if (code === "SUPABASE_URL_INVALID") {
        setError(t("supabaseUrlInvalid"));
      } else {
        setError(`${t("failed")}：${code || String(err)}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const openForgotPassword = () => {
    setForgotEmail(email);
    setForgotError(null);
    setForgotSent(false);
    setForgotVisible(true);
  };

  const handleForgotPassword = async () => {
    const normalizedEmail = forgotEmail.trim();
    if (!normalizedEmail.includes("@")) {
      setForgotError(t("invalidEmail"));
      return;
    }
    setForgotSending(true);
    setForgotError(null);
    try {
      const supabase = getSupabaseClient();
      const redirectTo = window.location.origin + "/auth/reset-password";
      const { error: sbError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, { redirectTo });
      if (sbError) {
        console.error("[ForgotPassword] Supabase error:", sbError.message);
        setForgotError(`${t("failed")}：${sbError.message}`);
        return;
      }
      setForgotSent(true);
    } catch (err) {
      console.error("[ForgotPassword] Unexpected error:", err);
      setForgotError(`${t("failed")}：${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setForgotSending(false);
    }
  };

  const closeForgotPassword = () => {
    setForgotVisible(false);
  };

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="p-6">
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t("goBack")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View className="p-2 rounded-lg bg-surface border border-border">
              <MaterialIcons name="arrow-back" size={20} color={colors.text} />
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/auth/register")}
            accessibilityRole="button"
            accessibilityLabel={t("register")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text className="text-sm font-semibold text-primary">{t("register")}</Text>
          </Pressable>
        </View>

        <View className="flex-1 items-center justify-center gap-6">
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">{t("loginTitle")}</Text>
            <Text className="text-sm text-muted text-center">{t("loginWithEmail")}</Text>
          </View>

          <View className="w-full gap-3" style={{ maxWidth: 420 }}>
            <View className="gap-1">
              <Text className="text-xs font-semibold text-muted">{t("email")}</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder={t("email")}
                placeholderTextColor={colors.muted}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              />
            </View>
            <View className="gap-1">
              <Text className="text-xs font-semibold text-muted">{t("password")}</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder={t("password")}
                placeholderTextColor={colors.muted}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              />
            </View>
            <Pressable
              onPress={openForgotPassword}
              accessibilityRole="button"
              accessibilityLabel={t("forgotPassword")}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Text className="text-sm text-primary font-medium text-right">{t("forgotPassword")}</Text>
            </Pressable>
          </View>

          {hasTestLogin ? (
            <Pressable
              onPress={() => {
                setEmail(TEST_LOGIN_EMAIL);
                setPassword(TEST_LOGIN_PASSWORD);
                void handleLogin({
                  email: TEST_LOGIN_EMAIL,
                  password: TEST_LOGIN_PASSWORD,
                  allowAutoCreate: true,
                });
              }}
              disabled={submitting}
              accessibilityRole="button"
              accessibilityLabel={getTestLoginText().button}
              style={({ pressed }) => [
                { opacity: submitting ? 0.6 : pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
              ]}
            >
              <View
                style={{ maxWidth: 420 }}
                className="w-full bg-surface border border-primary rounded-xl px-5 py-4 flex-row items-center justify-center gap-2"
              >
                <MaterialIcons name="bolt" size={20} color={colors.tint} />
                <Text className="text-primary font-semibold text-base">{getTestLoginText().button}</Text>
              </View>
            </Pressable>
          ) : (
            <Text className="text-xs text-muted text-center">{getTestLoginText().missing}</Text>
          )}

          {hasTestLogin ? (
            <Text className="text-xs text-muted text-center">{getTestLoginText().hint}</Text>
          ) : null}

          <Pressable
            onPress={() => {
              void handleLogin();
            }}
            disabled={submitting}
            accessibilityRole="button"
            accessibilityLabel={t("login")}
            style={({ pressed }) => [
              { opacity: submitting ? 0.6 : pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
          >
            <View
              style={{ minWidth: 260 }}
              className="w-full bg-primary rounded-xl px-5 py-4 flex-row items-center justify-center gap-2"
            >
              {submitting ? (
                <ActivityIndicator color={colors.background} />
              ) : (
                <MaterialIcons name="login" size={20} color={colors.background} />
              )}
              <Text className="text-background font-semibold text-base">{t("login")}</Text>
            </View>
          </Pressable>

          {error ? (
            <Text className="text-sm text-error text-center">{error}</Text>
          ) : null}

          <Pressable
            onPress={() => router.replace("/auth/register")}
            accessibilityRole="button"
            accessibilityLabel={t("noAccount")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text className="text-sm text-muted">{t("noAccount")}</Text>
          </Pressable>
        </View>
      </View>

      {/* Forgot Password Modal */}
      <Modal
        visible={forgotVisible}
        transparent
        animationType="fade"
        onRequestClose={closeForgotPassword}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end"
        >
          <Pressable
            onPress={closeForgotPassword}
            className="absolute inset-0 bg-black/50"
          />
          <View
            className="bg-card rounded-t-3xl p-6 gap-5"
            style={{ maxWidth: 420, width: "100%", alignSelf: "center" }}
          >
            <View className="w-12 h-1 rounded-full bg-border self-center" />
            <Text className="text-2xl font-bold text-foreground text-center">
              {forgotSent ? t("resetLinkSent") : t("forgotPasswordTitle")}
            </Text>
            <Text className="text-sm text-muted text-center">
              {forgotSent ? t("resetLinkSentDescription") : t("forgotPasswordDescription")}
            </Text>

            {forgotSent ? (
              <Pressable
                onPress={closeForgotPassword}
                accessibilityRole="button"
                accessibilityLabel={t("backToLogin")}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
                ]}
              >
                <View className="w-full bg-primary rounded-xl px-5 py-4 items-center justify-center">
                  <Text className="text-background font-semibold text-base">{t("backToLogin")}</Text>
                </View>
              </Pressable>
            ) : (
              <>
                <View className="gap-1">
                  <Text className="text-xs font-semibold text-muted">{t("email")}</Text>
                  <TextInput
                    value={forgotEmail}
                    onChangeText={setForgotEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder={t("email")}
                    placeholderTextColor={colors.muted}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
                  />
                </View>

                {forgotError ? (
                  <Text className="text-sm text-error text-center">{forgotError}</Text>
                ) : null}

                <Pressable
                  onPress={() => { void handleForgotPassword(); }}
                  disabled={forgotSending}
                  accessibilityRole="button"
                  accessibilityLabel={t("sendResetLink")}
                  style={({ pressed }) => [
                    { opacity: forgotSending ? 0.6 : pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
                  ]}
                >
                  <View className="w-full bg-primary rounded-xl px-5 py-4 flex-row items-center justify-center gap-2">
                    {forgotSending ? (
                      <ActivityIndicator color={colors.background} />
                    ) : (
                      <MaterialIcons name="email" size={20} color={colors.background} />
                    )}
                    <Text className="text-background font-semibold text-base">{t("sendResetLink")}</Text>
                  </View>
                </Pressable>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScreenContainer>
  );
}
