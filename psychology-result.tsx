import { ScrollView, Text, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { useState, useEffect } from "react";
import { getPsychologyTestResults } from "@/lib/storage";
import type { PsychologyTestResult } from "@/shared/psychology-tests";
import type { PsychologyTestResult as PsychologyTestResultType } from "@/shared/types";
import * as Haptics from "expo-haptics";

const LEVEL_COLORS: Record<string, string> = {
  low: "bg-success",
  moderate: "bg-warning",
  high: "bg-error",
  very_high: "bg-error",
};

const LEVEL_LABELS: Record<string, string> = {
  low: "低",
  moderate: "中等",
  high: "高",
  very_high: "非常高",
};

export default function PsychologyResultScreen() {
  const { resultId } = useLocalSearchParams<{ resultId: string }>();
  const router = useRouter();
  const { t } = useI18n();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResult();
  }, [resultId]);

  const loadResult = async () => {
    try {
      if (resultId) {
        const results = await getPsychologyTestResults();
        const data = results.find((r) => r.id === resultId);
        setResult(data as any || null);
      }
    } catch (error) {
      console.error("Error loading result:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-foreground">載入中...</Text>
      </ScreenContainer>
    );
  }

  if (!result) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-foreground">找不到結果</Text>
      </ScreenContainer>
    );
  }

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: Implement share functionality
    alert("分享功能即將推出");
  };

  const handleBackToHome = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/(tabs)");
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Result Card */}
        <View className="bg-surface rounded-2xl p-6 mb-6 border border-border">
          <Text className="text-sm text-muted mb-2">測驗結果</Text>
          <Text className="text-3xl font-bold text-foreground mb-4">
            {result.percentage}%
          </Text>

          {/* Level Badge */}
          <View className="flex-row items-center gap-3 mb-4">
            <View className={`${LEVEL_COLORS[result.level]} rounded-full px-3 py-1`}>
              <Text className="text-background font-semibold text-sm">
                {LEVEL_LABELS[result.level]}
              </Text>
            </View>
            <Text className="text-foreground font-semibold">
              {result.totalScore} / {result.maxScore}
            </Text>
          </View>

          {/* Score Bar */}
          <View className="h-3 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary"
              style={{ width: `${result.percentage}%` }}
            />
          </View>
        </View>

        {/* Interpretation */}
        <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
          <Text className="text-lg font-semibold text-foreground mb-3">解釋</Text>
          <Text className="text-sm text-muted leading-relaxed">{result.interpretation}</Text>
        </View>

        {/* Info Box */}
        <View className="bg-primary/10 rounded-lg p-4 mb-6 border border-primary/20">
          <Text className="text-sm text-foreground leading-relaxed">
            💡 <Text className="font-semibold">提示：</Text>此結果基於你在本次測驗中的回答。如果你想了解更多，可以稍後再次進行測驗。
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="gap-3 mt-auto">
          <Pressable
            onPress={handleShare}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View className="bg-surface border border-border rounded-lg py-3 items-center">
              <Text className="text-foreground font-semibold">分享結果</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={handleBackToHome}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View className="bg-primary rounded-lg py-3 items-center">
              <Text className="text-background font-semibold">返回首頁</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
