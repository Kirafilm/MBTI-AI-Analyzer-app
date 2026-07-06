import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { paramToString } from "@/lib/route-params";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import { localeForDates, translations } from "@/shared/i18n";
import type { MBTIResult } from "@/shared/types";
import { getMBTIResults } from "@/lib/storage";

export default function ComparisonScreen() {
  const router = useRouter();
  const colors = useColors();
  const { t, language } = useI18n();
  const raw = useLocalSearchParams<{
    resultId1?: string | string[];
    resultId2?: string | string[];
  }>();
  const resultId1 = paramToString(raw.resultId1);
  const resultId2 = paramToString(raw.resultId2);

  const dateLocale = localeForDates(language);

  const [result1, setResult1] = useState<MBTIResult | null>(null);
  const [result2, setResult2] = useState<MBTIResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dimensionLabels = useMemo(() => {
    const tr = translations[language];
    return {
      EI: tr.dimensionEI,
      SN: tr.dimensionSN,
      TF: tr.dimensionTF,
      JP: tr.dimensionJP,
    };
  }, [language]);

  const loadResults = useCallback(async () => {
    const tr = translations[language];
    try {
      setIsLoading(true);
      setError(null);
      const results = await getMBTIResults();

      const r1 = resultId1 ? results.find((r) => r.id === resultId1) : undefined;
      const r2 = resultId2 ? results.find((r) => r.id === resultId2) : undefined;

      if (!r1 || !r2) {
        setError(tr.quizResultNotFound);
        return;
      }

      if (new Date(r1.createdAt) < new Date(r2.createdAt)) {
        setResult1(r1);
        setResult2(r2);
      } else {
        setResult1(r2);
        setResult2(r1);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : tr.failedToLoadResults;
      setError(message);
      console.error("Error loading results:", err);
    } finally {
      setIsLoading(false);
    }
  }, [resultId1, resultId2, language]);

  useEffect(() => {
    void loadResults();
  }, [loadResults]);

  const calculateChange = (
    score1: number,
    score2: number,
  ): { value: number; direction: string } => {
    const change = score2 - score1;
    return {
      value: Math.abs(change),
      direction: change > 0 ? "up" : change < 0 ? "down" : "same",
    };
  };

  const getDimensionLabel = (dimension: string): string => {
    return dimensionLabels[dimension as keyof typeof dimensionLabels] || dimension;
  };

  const formatDate = (d: Date) =>
    new Date(d).toLocaleDateString(dateLocale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

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
        <Text className="text-foreground font-semibold">{error || t("failedToLoad")}</Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        >
          <View className="px-6 py-3 bg-primary rounded-lg">
            <Text className="text-background font-semibold">{t("goBack")}</Text>
          </View>
        </Pressable>
      </ScreenContainer>
    );
  }

  const headerRange = t("comparisonFromTo")
    .replace("{from}", formatDate(result1.createdAt))
    .replace("{to}", formatDate(result2.createdAt));

  const summaryText =
    result1.type === result2.type
      ? t("comparisonSummaryStable").replace("{type}", result1.type)
      : t("comparisonSummaryChanged")
          .replace("{from}", result1.type)
          .replace("{to}", result2.type);

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              {t("personalityComparisonTitle")}
            </Text>
            <Text className="text-sm text-muted">{headerRange}</Text>
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">{t("typeChangeTitle")}</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 p-4 bg-surface rounded-lg items-center gap-2">
                <Text className="text-xs text-muted">{t("labelBefore")}</Text>
                <Text className="text-3xl font-bold text-primary">{result1.type}</Text>
                <Text className="text-xs text-muted text-center">
                  {formatDate(result1.createdAt)}
                </Text>
              </View>

              <View className="items-center justify-center">
                <Text className="text-2xl text-primary">→</Text>
              </View>

              <View className="flex-1 p-4 bg-surface rounded-lg items-center gap-2">
                <Text className="text-xs text-muted">{t("labelNow")}</Text>
                <Text className="text-3xl font-bold text-primary">{result2.type}</Text>
                <Text className="text-xs text-muted text-center">
                  {formatDate(result2.createdAt)}
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">
              {t("dimensionAnalysisTitle")}
            </Text>
            {(["EI", "SN", "TF", "JP"] as const).map((dim) => {
              const score1 = result1.scores[dim];
              const score2 = result2.scores[dim];
              const change = calculateChange(score1, score2);

              const interpretation =
                change.direction === "same"
                  ? t("comparisonDimStable")
                  : change.direction === "up"
                    ? t("comparisonDimIncrease").replace("{value}", String(change.value))
                    : t("comparisonDimDecrease").replace("{value}", String(change.value));

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

                  <View className="gap-2">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs text-muted w-8">{t("labelBefore")}</Text>
                      <View className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary/50"
                          style={{ width: `${score1}%` }}
                        />
                      </View>
                    </View>

                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs text-muted w-8">{t("labelNow")}</Text>
                      <View className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary"
                          style={{ width: `${score2}%` }}
                        />
                      </View>
                    </View>
                  </View>

                  <Text className="text-xs text-muted leading-relaxed">{interpretation}</Text>
                </View>
              );
            })}
          </View>

          <View className="p-4 bg-primary/10 rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("changeSummaryTitle")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">{summaryText}</Text>
          </View>

          <View className="gap-3">
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="p-4 bg-primary rounded-lg items-center">
                <Text className="text-background font-semibold">{t("backToHistory")}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
