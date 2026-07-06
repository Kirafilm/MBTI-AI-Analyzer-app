import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import type { MBTIResult, PersonalityAnalysis } from "@/shared/types";
import { getMBTIResults, getPersonalityAnalysisByResultId, savePersonalityAnalysis } from "@/lib/storage";
import { trpc } from "@/lib/trpc";

export default function MBTIAnalysisScreen() {
  const router = useRouter();
  const { t, language } = useI18n();
  const colors = useColors();
  const { resultId } = useLocalSearchParams();

  const [result, setResult] = useState<MBTIResult | null>(null);
  const [analysis, setAnalysis] = useState<PersonalityAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mbtiType, setMbtiType] = useState<string | null>(null);

  // Use tRPC mutation hook correctly
  const generateAnalysisMutation = trpc.analysis.generatePersonalityAnalysis.useMutation();

  useEffect(() => {
    loadAnalysis();
  }, [resultId, language]);

  const loadAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 加載測驗結果
      const results = await getMBTIResults();
      const found = results.find((r) => r.id === resultId);
      if (!found) {
        setError(t("notFound"));
        return;
      }
      setResult(found);

      // 設置 MBTI 類型以觸發 mutation（會根據當前語言生成）
      setMbtiType(found.type);
    } catch (err) {
      const message = err instanceof Error ? err.message : t("failed");
      setError(message);
      console.error("Error loading analysis:", err);
      setIsLoading(false);
    }
  };

  // 當 mbtiType 改變時，觸發 mutation
  useEffect(() => {
    if (!mbtiType) return;

    const generateAnalysis = async () => {
      try {
        // 將 zh-TW 轉換為 zh-HK（後端支持的格式）
        const apiLanguage = language === "zh-TW" ? "zh-HK" : (language as "zh-CN" | "en" | "zh-HK");
        const response = await generateAnalysisMutation.mutateAsync({
          mbtiType: mbtiType,
          language: apiLanguage,
        });

        const newAnalysis: PersonalityAnalysis = {
          resultId: resultId as string,
          mbtiType: mbtiType as any,
          overview: response.overview,
          strengths: response.strengths,
          challenges: response.challenges,
          personalDevelopment: response.personalDevelopment,
          relationships: response.relationships,
          workStyle: response.workStyle,
          createdAt: new Date(),
        };

        await savePersonalityAnalysis(newAnalysis);
        setAnalysis(newAnalysis);
        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : t("failedToGenerateAnalysis");
        setError(message);
        console.error("Error generating analysis:", err);
        setIsLoading(false);
      }
    };

    generateAnalysis();
  }, [mbtiType, language]);



  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <View className="gap-3 items-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="text-foreground text-sm">{t("generatingAnalysis")}</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !analysis) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground font-semibold">{error || t("failedToGenerateAnalysis")}</Text>
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">{t("personalityAnalysis")}</Text>
            <Text className="text-sm text-muted">{t("basedOn")} {result?.type}</Text>
          </View>

          {/* Overview */}
          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("personalityOverview")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">{analysis.overview}</Text>
          </View>

          {/* Strengths */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">{t("strengths")}</Text>
            {analysis.strengths.map((strength, index) => (
              <View key={index} className="flex-row gap-3">
                <View className="w-6 h-6 rounded-full bg-success items-center justify-center">
                  <Text className="text-background text-xs font-bold">{index + 1}</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground leading-relaxed">{strength}</Text>
              </View>
            ))}
          </View>

          {/* Challenges */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">{t("challenges")}</Text>
            {analysis.challenges.map((challenge, index) => (
              <View key={index} className="flex-row gap-3">
                <View className="w-6 h-6 rounded-full bg-warning items-center justify-center">
                  <Text className="text-background text-xs font-bold">{index + 1}</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground leading-relaxed">{challenge}</Text>
              </View>
            ))}
          </View>

          {/* Personal Development */}
          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("personalDevelopment")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">
              {analysis.personalDevelopment}
            </Text>
          </View>

          {/* Relationships */}
          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("relationships")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">{analysis.relationships}</Text>
          </View>

          {/* Work Style */}
          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("workStyle")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">{analysis.workStyle}</Text>
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mt-4">
            <Pressable
              onPress={() => router.push(`/(tabs)/mbti-career?resultId=${resultId}`)}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="p-4 bg-primary rounded-lg items-center">
                <Text className="text-background font-semibold">{t("viewCareerGuide")}</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(tabs)")}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="p-4 bg-surface rounded-lg items-center">
                <Text className="text-foreground font-semibold">{t("backToHome")}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
