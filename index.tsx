import { ScrollView, Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useMBTI } from "@/lib/mbti-context";
import { useI18n } from "@/lib/i18n-context";
import { getLatestMBTIResult } from "@/lib/storage";
import { useEffect, useState } from "react";
import type { MBTIResult } from "@/shared/types";
import type { Language } from "@/shared/i18n";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const router = useRouter();
  const { resetQuiz } = useMBTI();
  const { t, language, setLanguage } = useI18n();
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
        return "繁體";
      case "zh-CN":
        return "简体";
      case "en":
        return "English";
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Language Selector - Top Right with Globe Icon (Outside ScrollView) */}
      <View className="absolute top-12 right-6 z-50">
        <Pressable
          onPress={() => setShowLanguageMenu(!showLanguageMenu)}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.9 : 1 }] }]}
        >
          <MaterialIcons name="language" size={24} color="#0a7ea4" />
        </Pressable>

        {/* Language Dropdown Menu */}
        {showLanguageMenu && (
          <View className="absolute top-10 right-0 bg-surface rounded-lg border border-border shadow-lg overflow-visible" style={{ minWidth: 120 }}>
            {(["zh-TW", "zh-CN", "en"] as Language[]).map((lang) => (
              <Pressable
                key={lang}
                onPress={() => handleLanguageChange(lang)}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1, paddingHorizontal: 12, paddingVertical: 10 },
                  language === lang && { backgroundColor: "rgba(10, 126, 164, 0.1)" },
                ]}
              >
                <Text
                  className={`text-sm font-medium ${language === lang ? "text-primary" : "text-foreground"}`}
                >
                  {getLanguageName(lang)}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="flex-1 gap-8 pt-2">

          {/* Hero Section - with top padding for language button */}
          <View className="items-center gap-2 pt-4">
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
                router.push("/psychology-list");
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="w-full border-2 border-primary rounded-xl p-4 items-center">
                <Text className="text-primary font-semibold text-base">
                  {language === "zh-TW" ? "心理測驗" : language === "zh-CN" ? "心理测验" : "Psychology Tests"}
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Features */}
          <View className="gap-3 pb-4">
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
                <Text className="flex-1 text-sm text-foreground leading-relaxed">{feature}</Text>
              </View>
            ))}
          </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    </View>
  );
}
