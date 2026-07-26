import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import type { AnalysisLocale } from "@/shared/i18n";
import { toAnalysisLocale } from "@/shared/i18n";
import type { MBTIResult, PersonalityAnalysis } from "@/shared/types";
import { getMBTIResults, getPersonalityAnalysisByResultId, savePersonalityAnalysis } from "@/lib/storage";
import { paramToString } from "@/lib/route-params";
import { useI18n } from "@/lib/i18n-context";
import { trpc } from "@/lib/trpc";

type GenerateAnalysisTask = {
  resultId: string;
  mbtiType: string;
  locale: AnalysisLocale;
};

export default function MBTIAnalysisScreen() {
  const router = useRouter();
  const colors = useColors();
  const { language } = useI18n();
  const params = useLocalSearchParams<{ resultId?: string | string[] }>();
  const resultId = paramToString(params.resultId);

  const [result, setResult] = useState<MBTIResult | null>(null);
  const [analysis, setAnalysis] = useState<PersonalityAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generateTask, setGenerateTask] = useState<GenerateAnalysisTask | null>(null);

  const generateAnalysisMutation = trpc.analysis.generatePersonalityAnalysis.useMutation();

  const loadAnalysis = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setAnalysis(null);
      setGenerateTask(null);

      if (!resultId) {
        setError("找不到測驗結果");
        setIsLoading(false);
        return;
      }

      const locale = toAnalysisLocale(language);
      const results = await getMBTIResults();
      const found = results.find((r) => r.id === resultId);
      if (!found) {
        setError("找不到測驗結果");
        setIsLoading(false);
        return;
      }
      setResult(found);

      const existingAnalysis = await getPersonalityAnalysisByResultId(resultId, locale);
      if (existingAnalysis) {
        setAnalysis(existingAnalysis);
        setIsLoading(false);
        return;
      }

      setGenerateTask({
        resultId,
        mbtiType: found.type,
        locale,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "加載失敗";
      setError(message);
      console.error("Error loading analysis:", err);
      setIsLoading(false);
    }
  }, [resultId, language]);

  useEffect(() => {
    void loadAnalysis();
  }, [loadAnalysis]);

  useEffect(() => {
    if (!generateTask) return;

    let cancelled = false;

    const run = async () => {
      try {
        const response = await generateAnalysisMutation.mutateAsync({
          mbtiType: generateTask.mbtiType,
          language: generateTask.locale,
        });

        if (cancelled) return;

        const newAnalysis: PersonalityAnalysis = {
          resultId: generateTask.resultId,
          mbtiType: generateTask.mbtiType as PersonalityAnalysis["mbtiType"],
          locale: generateTask.locale,
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
      } catch (err) {
        if (cancelled) return;
        // Prefer tRPC's server message over generic "Failed to fetch".
        const anyErr = err as { message?: string; data?: { message?: string }; shape?: { message?: string } };
        const message =
          anyErr?.data?.message ||
          anyErr?.shape?.message ||
          (err instanceof Error ? err.message : null) ||
          "生成分析失敗";
        const friendly =
          /429|Too Many Requests|rate limit/i.test(message)
            ? "AI 免費額度已用完，請稍後再試，或更換 NVIDIA / OpenRouter 模型。"
            : message;
        setError(friendly);
        console.error("Error generating analysis:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [generateTask, generateAnalysisMutation]);

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <View className="gap-3 items-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="text-foreground text-sm">正在生成性格分析...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !analysis) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground font-semibold">{error || "生成分析失敗"}</Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        >
          <View className="px-6 py-3 bg-primary rounded-lg">
            <Text className="text-background font-semibold">返回</Text>
          </View>
        </Pressable>
      </ScreenContainer>
    );
  }

  const careerResultId = result?.id ?? analysis.resultId;

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">性格深度分析</Text>
            <Text className="text-sm text-muted">基於 {result?.type} 類型</Text>
          </View>

          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">性格概述</Text>
            <Text className="text-sm text-foreground leading-relaxed">{analysis.overview}</Text>
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">主要優勢</Text>
            {analysis.strengths.map((strength, index) => (
              <View key={index} className="flex-row gap-3">
                <View className="w-6 h-6 rounded-full bg-success items-center justify-center">
                  <Text className="text-background text-xs font-bold">{index + 1}</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground leading-relaxed">{strength}</Text>
              </View>
            ))}
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">面臨的挑戰</Text>
            {analysis.challenges.map((challenge, index) => (
              <View key={index} className="flex-row gap-3">
                <View className="w-6 h-6 rounded-full bg-warning items-center justify-center">
                  <Text className="text-background text-xs font-bold">{index + 1}</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground leading-relaxed">{challenge}</Text>
              </View>
            ))}
          </View>

          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">個人發展建議</Text>
            <Text className="text-sm text-foreground leading-relaxed">{analysis.personalDevelopment}</Text>
          </View>

          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">人際關係建議</Text>
            <Text className="text-sm text-foreground leading-relaxed">{analysis.relationships}</Text>
          </View>

          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">工作風格建議</Text>
            <Text className="text-sm text-foreground leading-relaxed">{analysis.workStyle}</Text>
          </View>

          <View className="gap-3 mt-4">
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/mbti-career",
                  params: { resultId: careerResultId },
                })
              }
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
            >
              <View className="p-4 bg-primary rounded-lg items-center">
                <Text className="text-background font-semibold">查看職業指引</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(tabs)")}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="p-4 bg-surface rounded-lg items-center">
                <Text className="text-foreground font-semibold">返回首頁</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
