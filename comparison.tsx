import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import type { MBTIResult } from "@/shared/types";
import { getMBTIResults } from "@/lib/storage";
import * as Haptics from "expo-haptics";

export default function ComparisonScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const colors = useColors();
  const { resultId1, resultId2 } = useLocalSearchParams();

  const [result1, setResult1] = useState<MBTIResult | null>(null);
  const [result2, setResult2] = useState<MBTIResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResults();
  }, [resultId1, resultId2]);

  const loadResults = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await getMBTIResults();

      const r1 = results.find((r) => r.id === resultId1);
      const r2 = results.find((r) => r.id === resultId2);

      if (!r1 || !r2) {
        setError(t("notFound"));
        return;
      }

      // 按時間排序（較早的在前）
      if (new Date(r1.createdAt) < new Date(r2.createdAt)) {
        setResult1(r1);
        setResult2(r2);
      } else {
        setResult1(r2);
        setResult2(r1);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : t("failed");
      setError(message);
      console.error("Error loading results:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateChange = (score1: number, score2: number): { value: number; direction: string } => {
    const change = score2 - score1;
    return {
      value: Math.abs(change),
      direction: change > 0 ? "up" : change < 0 ? "down" : "same",
    };
  };

  const getDimensionLabel = (dimension: string): string => {
    return dimension; // Use dimension abbreviations only, translations handled by i18n
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <View className="gap-3 items-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="text-foreground text-sm">{t("loading")}</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !result1 || !result2) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground font-semibold">{error || t("failed")}</Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        >
          <View className="px-6 py-3 bg-primary rounded-lg">
            <Text className="text-background font-semibold">{t("close")}</Text>
          </View>
        </Pressable>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">{t("comparison")}</Text>
            <Text className="text-sm text-muted">
              從 {new Date(result1.createdAt).toLocaleDateString("zh-HK")} 到{" "}
              {new Date(result2.createdAt).toLocaleDateString("zh-HK")}
            </Text>
          </View>

          {/* Type Comparison */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">{t("comparison")}</Text>
            <View className="flex-row gap-3">
              {/* Before */}
              <View className="flex-1 p-4 bg-surface rounded-lg items-center gap-2">
                <Text className="text-xs text-muted">Before</Text>
                <Text className="text-3xl font-bold text-primary">{result1.type}</Text>
                <Text className="text-xs text-muted text-center">
                  {new Date(result1.createdAt).toLocaleDateString("zh-HK")}
                </Text>
              </View>

              {/* Arrow */}
              <View className="items-center justify-center">
                <Text className="text-2xl text-primary">→</Text>
              </View>

              {/* After */}
              <View className="flex-1 p-4 bg-surface rounded-lg items-center gap-2">
                <Text className="text-xs text-muted">After</Text>
                <Text className="text-3xl font-bold text-primary">{result2.type}</Text>
                <Text className="text-xs text-muted text-center">
                  {new Date(result2.createdAt).toLocaleDateString("zh-HK")}
                </Text>
              </View>
            </View>
          </View>

          {/* Dimension Changes */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">{t("dimensionChange")}</Text>
            {(["EI", "SN", "TF", "JP"] as const).map((dim) => {
              const score1 = result1.scores[dim];
              const score2 = result2.scores[dim];
              const change = calculateChange(score1, score2);

              return (
                <View key={dim} className="p-4 bg-surface rounded-lg gap-3">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm font-semibold text-foreground">
                      {getDimensionLabel(dim)}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs text-muted">{score1}%</Text>
                      <Text className="text-xs text-muted">→</Text>
                      <Text className="text-xs text-muted">{score2}%</Text>
                      {change.direction !== "same" && (
                        <View className="flex-row items-center gap-1 ml-2">
                          <Text
                            className={`text-sm font-bold ${
                              change.direction === "up" ? "text-success" : "text-error"
                            }`}
                          >
                            {change.direction === "up" ? "↑" : "↓"}
                          </Text>
                          <Text
                            className={`text-xs font-semibold ${
                              change.direction === "up" ? "text-success" : "text-error"
                            }`}
                          >
                            {change.value}%
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Visual Comparison */}
                  <View className="gap-2">
                    {/* Before Bar */}
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs text-muted w-8">B</Text>
                      <View className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary/50"
                          style={{ width: `${score1}%` }}
                        />
                      </View>
                    </View>

                    {/* After Bar */}
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs text-muted w-8">A</Text>
                      <View className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary"
                          style={{ width: `${score2}%` }}
                        />
                      </View>
                    </View>
                  </View>

                  {/* Interpretation */}
                  <Text className="text-xs text-muted leading-relaxed">
                    {change.direction === "same"
                      ? t("stable")
                      : change.direction === "up"
                        ? t("increased") + ` (${change.value}%)`
                        : t("decreased") + ` (${change.value}%)`}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Summary */}
          <View className="p-4 bg-primary/10 rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("comparison")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">
              {result1.type === result2.type
                ? `你的性格類型保持穩定為 ${result1.type}。這表明你的核心性格特徵相對一致。`
                : `你的性格類型從 ${result1.type} 變化為 ${result2.type}。這可能反映了你在某些情況下的行為變化或個人成長。`}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="p-4 bg-primary rounded-lg items-center">
                <Text className="text-background font-semibold">{t("backToHome")}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
