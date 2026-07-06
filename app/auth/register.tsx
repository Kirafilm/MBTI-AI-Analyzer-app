import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import { getSupabaseClient } from "@/lib/supabase";
import * as Auth from "@/lib/_core/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function RegisterScreen() {
  const router = useRouter();
  const colors = useColors();
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const normalizedEmail = email.trim();
      if (!normalizedEmail.includes("@")) {
        setError(t("invalidEmail"));
        return;
      }
      if (password.length < 6) {
        setError(t("passwordTooShort"));
        return;
      }

      const supabase = getSupabaseClient();
      const result = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
      });

      if (result.error) {
        console.error("[Register] Supabase signUp error:", result.error.message);
        setError(`${t("failed")}：${result.error.message}`);
        return;
      }

      const token = result.data.session?.access_token;
      if (token) {
        await Auth.setSessionToken(token);
        router.replace("/(tabs)");
        return;
      }

      setMessage(t("checkYourEmail"));
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      console.error("[Register] Unexpected error:", err);
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
            onPress={() => router.replace("/auth/login")}
            accessibilityRole="button"
            accessibilityLabel={t("login")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text className="text-sm font-semibold text-primary">{t("login")}</Text>
          </Pressable>
        </View>

        <View className="flex-1 items-center justify-center gap-6">
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">{t("registerTitle")}</Text>
            <Text className="text-sm text-muted text-center">{t("registerWithEmail")}</Text>
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
          </View>

          <Pressable
            onPress={handleRegister}
            disabled={submitting}
            accessibilityRole="button"
            accessibilityLabel={t("register")}
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
                <MaterialIcons name="person-add" size={20} color={colors.background} />
              )}
              <Text className="text-background font-semibold text-base">{t("register")}</Text>
            </View>
          </Pressable>

          {error ? (
            <Text className="text-sm text-error text-center">{error}</Text>
          ) : null}

          {message ? (
            <Text className="text-sm text-muted text-center">{message}</Text>
          ) : null}

          <Pressable
            onPress={() => router.replace("/auth/login")}
            accessibilityRole="button"
            accessibilityLabel={t("alreadyHaveAccount")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text className="text-sm text-muted">{t("alreadyHaveAccount")}</Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}
