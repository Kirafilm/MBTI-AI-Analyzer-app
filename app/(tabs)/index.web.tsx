import { ScrollView, Text, useWindowDimensions, View, Pressable } from "react-native";
import { Link, useRouter, type Href } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { SeoHead } from "@/components/seo-head";
import { useMBTI } from "@/lib/mbti-context";
import { useI18n } from "@/lib/i18n-context";
import { getLatestMBTIResult } from "@/lib/storage";
import { useColors } from "@/hooks/use-colors";
import { useEffect, useState } from "react";
import type { MBTIResult } from "@/shared/types";
import { localeForDates } from "@/shared/i18n";
import { WEB_MAX_CONTENT_WIDTH } from "@/lib/web-layout";
import { DEFAULT_SEO } from "@/lib/seo";

const QUICK_ACTIONS = [
  {
    titleKey: "startQuiz" as const,
    descKey: "feature1" as const,
    icon: "play-circle-outline" as const,
    color: "#0a7ea4",
    bg: "#e8f4f8",
    border: "#0a7ea4",
    route: "/(tabs)/mbti-quiz" as const,
    resetQuiz: true,
  },
  {
    titleKey: "psychologyTests" as const,
    descKey: "allPsychologyTestsDesc" as const,
    icon: "psychology" as const,
    color: "#7c3aed",
    bg: "#f3effe",
    border: "#7c3aed",
    route: "/(tabs)/psychology-list" as const,
    resetQuiz: false,
  },
  {
    titleKey: "history" as const,
    descKey: "historyEmptyDescription" as const,
    icon: "history" as const,
    color: "#059669",
    bg: "#ecfdf5",
    border: "#059669",
    route: "/(tabs)/history" as const,
    resetQuiz: false,
  },
  {
    titleKey: "contactUs" as const,
    descKey: "contactUsDescription" as const,
    icon: "mail-outline" as const,
    color: "#d97706",
    bg: "#fffbeb",
    border: "#d97706",
    route: "/contact-us" as const,
    resetQuiz: false,
  },
] as const;

const FEATURE_CARDS = [
  { icon: "quiz" as const, key: "feature1" as const, color: "#0a7ea4" },
  { icon: "auto-awesome" as const, key: "feature2" as const, color: "#7c3aed" },
  { icon: "work-outline" as const, key: "feature3" as const, color: "#059669" },
  { icon: "shield" as const, key: "feature4" as const, color: "#d97706" },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const { resetQuiz } = useMBTI();
  const { t, language } = useI18n();
  const colors = useColors();
  const { width } = useWindowDimensions();
  const [latestResult, setLatestResult] = useState<MBTIResult | null>(null);
  const isWide = width >= 900;

  useEffect(() => {
    void getLatestMBTIResult().then(setLatestResult).catch(console.error);
  }, []);

  return (
    <>
      <SeoHead
        title={DEFAULT_SEO.title}
        description={DEFAULT_SEO.description}
        path="/"
        includeSiteGraph
      />
    <ScrollView
      className="flex-1 bg-background"
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View className="w-full bg-primary/5 border-b border-border">
        <View
          className="w-full mx-auto px-4 md:px-6"
          style={{
            maxWidth: WEB_MAX_CONTENT_WIDTH,
            minHeight: isWide ? 340 : 300,
            justifyContent: "center",
            paddingVertical: 48,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            <View
              style={{
                flex: 1,
                minWidth: 280,
                gap: 20,
                justifyContent: "center",
                alignItems: isWide ? "flex-start" : "center",
              }}
            >
              <View className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Text className="text-xs font-semibold text-primary">AI · MBTI · Psychology</Text>
              </View>
              <Text
                accessibilityRole="header"
                className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
                style={{ textAlign: isWide ? "left" : "center" }}
              >
                MBTI 性格測驗 — 用 AI 讀懂你的天賦
              </Text>
              <Text
                className="text-lg text-muted leading-relaxed max-w-xl"
                style={{ textAlign: isWide ? "left" : "center" }}
              >
                {t("appSubtitle")} 探索 INTJ、ENFP 等 16 型人格，並取得職涯與自由職方向建議。
              </Text>
              <View className="flex-row flex-wrap gap-3 pt-2">
                <Pressable
                  onPress={() => {
                    resetQuiz();
                    router.push("/(tabs)/mbti-quiz");
                  }}
                  className="bg-primary rounded-xl px-6 py-3.5"
                >
                  <Text className="text-white font-semibold text-base">{t("startQuiz")}</Text>
                </Pressable>
                <Link href={"/types" as Href} asChild>
                  <Pressable className="border border-primary rounded-xl px-6 py-3.5">
                    <Text className="text-primary font-semibold text-base">16 型人格解析</Text>
                  </Pressable>
                </Link>
              </View>
            </View>

            <View
              className="rounded-2xl border border-border bg-surface p-6 gap-4 shadow-sm"
              style={{ minWidth: 280, flex: 1, maxWidth: 380 }}
            >
              <Text className="text-sm font-semibold text-muted uppercase tracking-wide">
                {latestResult ? t("result") : t("features")}
              </Text>
              {latestResult ? (
                <>
                  <View className="flex-row items-end gap-3">
                    <Text className="text-5xl font-bold text-primary">{latestResult.type}</Text>
                    <Text className="text-sm text-muted pb-2">
                      {new Date(latestResult.createdAt).toLocaleDateString(localeForDates(language))}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/mbti-result",
                        params: { resultId: latestResult.id },
                      })
                    }
                    className="flex-row items-center justify-center gap-2 py-3 rounded-xl bg-primary/10"
                  >
                    <Text className="text-primary font-semibold">{t("viewDetails")}</Text>
                    <MaterialIcons name="arrow-forward" size={18} color={colors.tint} />
                  </Pressable>
                </>
              ) : (
                <View className="gap-3">
                  {FEATURE_CARDS.slice(0, 3).map((item) => (
                    <View key={item.key} className="flex-row items-center gap-3">
                      <View
                        className="w-8 h-8 rounded-lg items-center justify-center"
                        style={{ backgroundColor: `${item.color}18` }}
                      >
                        <MaterialIcons name={item.icon} size={18} color={item.color} />
                      </View>
                      <Text className="flex-1 text-sm text-foreground">{t(item.key)}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      <ScreenContainer>
        <View style={{ gap: 32, paddingBottom: 40 }}>
          {/* Quick actions */}
          <View className="gap-4">
            <Text className="text-xl font-bold text-foreground">{t("features")}</Text>
            <View
              className="w-full"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              {QUICK_ACTIONS.map((card) => (
                <Pressable
                  key={card.titleKey}
                  onPress={() => {
                    if (card.resetQuiz) resetQuiz();
                    router.push(card.route);
                  }}
                  style={{
                    flex: isWide ? 1 : undefined,
                    width: isWide ? undefined : ("100%" as const),
                    minWidth: isWide ? 0 : undefined,
                    minHeight: 176,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: card.border,
                    backgroundColor: card.bg,
                    padding: 20,
                    gap: 12,
                  }}
                >
                  <View
                    className="w-11 h-11 rounded-xl items-center justify-center"
                    style={{ backgroundColor: `${card.color}22` }}
                  >
                    <MaterialIcons name={card.icon} size={24} color={card.color} />
                  </View>
                  <Text className="text-base font-bold text-foreground">{t(card.titleKey)}</Text>
                  <Text className="text-sm text-muted leading-relaxed flex-1">{t(card.descKey)}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Feature grid */}
          <View className="gap-4">
            <Text className="text-xl font-bold text-foreground">Why MBTI AI Analyzer</Text>
            <View className="flex-row flex-wrap gap-4">
              {FEATURE_CARDS.map((item) => (
                <View
                  key={item.key}
                  className="flex-1 rounded-2xl border border-border bg-background p-5 gap-3"
                  style={{ minWidth: 220 }}
                >
                  <View
                    className="w-11 h-11 rounded-xl items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <MaterialIcons name={item.icon} size={24} color={item.color} />
                  </View>
                  <Text className="text-sm text-foreground leading-relaxed">{t(item.key)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScreenContainer>
    </ScrollView>
    </>
  );
}
