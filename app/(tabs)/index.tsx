import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { useMBTI } from "@/lib/mbti-context";
import { useI18n } from "@/lib/i18n-context";
import { getLatestMBTIResult } from "@/lib/storage";
import { useColors } from "@/hooks/use-colors";
import { useEffect, useState } from "react";
import type { MBTIResult } from "@/shared/types";
import type { Language } from "@/shared/i18n";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const router = useRouter();
  const { resetQuiz } = useMBTI();
  const { t, language, setLanguage } = useI18n();
  const colors = useColors();
  const [latestResult, setLatestResult] = useState<MBTIResult | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  useEffect(() => {
    loadLatestResult();
  }, []);

  const loadLatestResult = async () => {
    try {
      const result = await getLatestMBTIResult();
      setLatestResult(result);
    } catch (error) {
      console.error("Error loading latest result:", error);
    }
  };

  const handleStartQuiz = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    resetQuiz();
    router.push("/(tabs)/mbti-quiz");
  };

  const handleViewLastResult = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (latestResult?.id) {
      router.push({
        pathname: "/(tabs)/mbti-result",
        params: { resultId: latestResult.id },
      });
    }
  };

  const handleLanguageChange = async (lang: Language) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setLanguage(lang);
    setShowLanguageMenu(false);
  };

  const getLanguageName = (lang: Language) => {
    switch (lang) {
      case "zh-TW":
        return "繁體中文";
      case "zh-CN":
        return "简体中文";
      case "en":
        return "English";
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-8 pt-4">
          {showLanguageMenu ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("close")}
              onPress={() => {
                setShowLanguageMenu(false);
              }}
              style={[StyleSheet.absoluteFillObject, { zIndex: 5 }]}
              className="bg-black/10"
            />
          ) : null}
          {/* Language Selector - Top Right */}
          <View className="absolute top-4 right-6 z-10 flex-row items-center gap-2">
            <View>
              <Pressable
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/profile");
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className="p-2 rounded-lg bg-surface border border-border">
                  <MaterialIcons name="person" size={20} color={colors.tint} />
                </View>
              </Pressable>
            </View>

            <View>
              <Pressable
                onPress={() => {
                  setShowLanguageMenu(!showLanguageMenu);
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className="p-2 rounded-lg bg-surface border border-border">
                  <MaterialIcons name="language" size={20} color={colors.tint} />
                </View>
              </Pressable>

              {showLanguageMenu && (
                <View
                  style={{ minWidth: 120 }}
                  className="absolute top-12 right-0 bg-surface rounded-lg border border-border shadow-lg overflow-hidden"
                >
                  {(["zh-TW", "zh-CN", "en"] as Language[]).map((lang) => (
                    <Pressable
                      key={lang}
                      onPress={() => handleLanguageChange(lang)}
                      style={({ pressed }) => [
                        { opacity: pressed ? 0.7 : 1, paddingHorizontal: 12, paddingVertical: 6 },
                        language === lang && { backgroundColor: "rgba(10, 126, 164, 0.1)" },
                      ]}
                    >
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="clip"
                        className={`text-xs font-semibold ${language === lang ? "text-primary" : "text-foreground"}`}
                      >
                        {getLanguageName(lang)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Hero Section */}
          <View className="items-center gap-2 mt-12">
            <Text className="text-3xl font-bold text-foreground">{t("appTitle")}</Text>
            <Text className="text-base text-muted text-center">
              {t("appSubtitle")}
            </Text>
          </View>

          {/* Latest Result Card */}
          {latestResult && (
            <Pressable
              onPress={handleViewLastResult}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="w-full bg-surface rounded-2xl p-6 border border-primary gap-3">
                <Text className="text-sm text-muted">{t("result")}</Text>
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-3xl font-bold text-primary">{latestResult.type}</Text>
                    <Text className="text-xs text-muted mt-1">
                      {new Date(latestResult.createdAt).toLocaleDateString(
                        language === "zh-TW" ? "zh-HK" : language === "zh-CN" ? "zh-CN" : "en-US"
                      )}
                    </Text>
                  </View>
                  <Text className="text-xs text-muted">→</Text>
                </View>
              </View>
            </Pressable>
          )}

          {/* CTA Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={handleStartQuiz}
              style={({ pressed }) => [
                { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
              ]}
            >
              <View className="w-full bg-primary rounded-xl p-4 items-center">
                <Text className="text-background font-semibold text-base">
                  {t("startQuiz")}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("/(tabs)/history");
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="w-full border-2 border-primary rounded-xl p-4 items-center">
                <Text className="text-primary font-semibold text-base">
                  {t("viewHistory")}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("/(tabs)/psychology-list");
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="w-full border-2 border-primary rounded-xl p-4 items-center">
                <Text className="text-primary font-semibold text-base">
                  {t("psychologyTests")}
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Features */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">{t("features")}</Text>
            {[
              t("feature1"),
              t("feature2"),
              t("feature3"),
              t("feature4"),
            ].map((feature, index) => (
              <View key={index} className="flex-row gap-3 items-start">
                <View className="w-5 h-5 rounded-full bg-primary items-center justify-center mt-0.5">
                  <Text className="text-background text-xs font-bold">✓</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground">{feature}</Text>
              </View>
            ))}
          </View>

          <View className="gap-2 pb-4">
            <Pressable
              onPress={() => router.push("/mbti-guide")}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <Text className="text-sm text-primary font-semibold text-center">MBTI Guide</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/about")}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <Text className="text-sm text-muted text-center">About</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
