import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { getPsychologyTestResults } from "@/lib/storage";
import type { PsychologyTestResult } from "@/shared/types";
import { paramToString } from "@/lib/route-params";
import * as Haptics from "expo-haptics";

const LEVEL_LABELS = {
  "zh-TW": { low: "低", moderate: "中等", high: "高", "very-high": "非常高" },
  "zh-CN": { low: "低", moderate: "中等", high: "高", "very-high": "非常高" },
  en: { low: "Low", moderate: "Moderate", high: "High", "very-high": "Very High" },
} as const;

const LEVEL_COLORS: Record<PsychologyTestResult["level"], string> = {
  low: "bg-success",
  moderate: "bg-warning",
  high: "bg-error",
  "very-high": "bg-error",
};

export default function PsychologyResultScreen() {
  const raw = useLocalSearchParams<{ resultId?: string | string[] }>();
  const resultId = paramToString(raw.resultId);
  const router = useRouter();
  const { language } = useI18n();

  const [result, setResult] = useState<PsychologyTestResult | null>(null);
  const [loading, setLoading] = useState(true);

  const copy = useMemo(() => {
    if (language === "en") {
      return {
        loading: "Loading...",
        notFound: "Result not found",
        result: "Test Result",
        interpretation: "Interpretation",
        tips: "Tips",
        tipsBody:
          "This result is based on your answers in this session. You can retake the test anytime to track changes.",
        backHome: "Back to Home",
      };
    }
    if (language === "zh-CN") {
      return {
        loading: "加载中...",
        notFound: "找不到结果",
        result: "测验结果",
        interpretation: "解释",
        tips: "提示",
        tipsBody: "此结果基于你在本次测验中的回答。你可以稍后再次进行测验并追踪变化。",
        backHome: "返回首页",
      };
    }
    return {
      loading: "載入中...",
      notFound: "找不到結果",
      result: "測驗結果",
      interpretation: "解釋",
      tips: "提示",
      tipsBody: "此結果基於你在本次測驗中的回答。你可以稍後再次進行測驗並追蹤變化。",
      backHome: "返回首頁",
    };
  }, [language]);

  const loadResult = useCallback(async () => {
    try {
      if (resultId) {
        const results = await getPsychologyTestResults();
        const data = results.find((r) => r.id === resultId);
        setResult(data || null);
      } else {
        setResult(null);
      }
    } catch (error) {
      console.error("Error loading result:", error);
    } finally {
      setLoading(false);
    }
  }, [resultId]);

  useEffect(() => {
    void loadResult();
  }, [loadResult]);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-foreground">{copy.loading}</Text>
      </ScreenContainer>
    );
  }

  if (!result) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-foreground">{copy.notFound}</Text>
      </ScreenContainer>
    );
  }

  const handleBackToHome = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/(tabs)");
  };

  const levelLabel = LEVEL_LABELS[language][result.level];

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="bg-surface rounded-2xl p-6 mb-6 border border-border">
          <Text className="text-sm text-muted mb-2">{copy.result}</Text>
          <Text className="text-2xl font-semibold text-foreground mb-1">{result.testName}</Text>
          <Text className="text-3xl font-bold text-foreground mb-4">{result.percentage}%</Text>

          <View className="flex-row items-center gap-3 mb-4">
            <View className={`${LEVEL_COLORS[result.level]} rounded-full px-3 py-1`}>
              <Text className="text-background font-semibold text-sm">{levelLabel}</Text>
            </View>
            <Text className="text-foreground font-semibold">
              {result.totalScore} / {result.maxScore}
            </Text>
          </View>

          <View className="h-3 bg-border rounded-full overflow-hidden">
            <View className="h-full bg-primary" style={{ width: `${result.percentage}%` }} />
          </View>
        </View>

        <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
          <Text className="text-lg font-semibold text-foreground mb-3">{copy.interpretation}</Text>
          <Text className="text-sm text-muted leading-relaxed">{result.interpretation}</Text>
        </View>

        <View className="bg-primary/10 rounded-lg p-4 mb-6 border border-primary/20">
          <Text className="text-sm text-foreground leading-relaxed">
            <Text className="font-semibold">{copy.tips}:</Text> {copy.tipsBody}
          </Text>
        </View>

        <View className="gap-3 mt-auto">
          <Pressable
            onPress={handleBackToHome}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View className="bg-primary rounded-lg py-3 items-center">
              <Text className="text-background font-semibold">{copy.backHome}</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
