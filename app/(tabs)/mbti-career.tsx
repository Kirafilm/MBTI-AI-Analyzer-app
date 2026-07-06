import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import type { AnalysisLocale } from "@/shared/i18n";
import { toAnalysisLocale } from "@/shared/i18n";
import type { MBTIResult, CareerGuide } from "@/shared/types";
import { getMBTIResults, getCareerGuideByResultId, saveCareerGuide } from "@/lib/storage";
import { paramToString } from "@/lib/route-params";
import { useI18n } from "@/lib/i18n-context";
import { trpc } from "@/lib/trpc";

type GenerateCareerTask = {
  resultId: string;
  mbtiType: string;
  locale: AnalysisLocale;
};

export default function MBTICareerScreen() {
  const router = useRouter();
  const colors = useColors();
  const { language } = useI18n();
  const params = useLocalSearchParams<{ resultId?: string | string[] }>();
  const resultId = paramToString(params.resultId);

  const [result, setResult] = useState<MBTIResult | null>(null);
  const [guide, setGuide] = useState<CareerGuide | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generateTask, setGenerateTask] = useState<GenerateCareerTask | null>(null);

  const generateCareerGuideMutation = trpc.analysis.generateCareerGuide.useMutation();

  const loadCareerGuide = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setGuide(null);
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

      const existingGuide = await getCareerGuideByResultId(resultId, locale);
      if (existingGuide) {
        setGuide(existingGuide);
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
      console.error("Error loading career guide:", err);
      setIsLoading(false);
    }
  }, [resultId, language]);

  useEffect(() => {
    void loadCareerGuide();
  }, [loadCareerGuide]);

  useEffect(() => {
    if (!generateTask) return;

    let cancelled = false;

    const run = async () => {
      try {
        const response = await generateCareerGuideMutation.mutateAsync({
          mbtiType: generateTask.mbtiType,
          language: generateTask.locale,
        });

        if (cancelled) return;

        const newGuide: CareerGuide = {
          resultId: generateTask.resultId,
          mbtiType: generateTask.mbtiType as CareerGuide["mbtiType"],
          locale: generateTask.locale,
          recommendedCareers: response.recommendedCareers,
          workEnvironment: response.workEnvironment,
          communicationStyle: response.communicationStyle,
          leadershipStyle: response.leadershipStyle,
          careerPath: response.careerPath,
          createdAt: new Date(),
        };

        await saveCareerGuide(newGuide);
        setGuide(newGuide);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "生成職業指引失敗";
        setError(message);
        console.error("Error generating career guide:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [generateTask, generateCareerGuideMutation]);

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <View className="gap-3 items-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="text-foreground text-sm">正在生成職業指引...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !guide) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground font-semibold">{error || "生成職業指引失敗"}</Text>
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

  const analysisResultId = result?.id ?? guide.resultId;

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">職業指引</Text>
            <Text className="text-sm text-muted">基於 {result?.type} 類型的職業建議</Text>
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">推薦職業</Text>
            {guide.recommendedCareers.map((career, index) => (
              <View key={index} className="flex-row gap-3 p-3 bg-surface rounded-lg">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                  <Text className="text-background text-xs font-bold">{index + 1}</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground leading-relaxed">{career}</Text>
              </View>
            ))}
          </View>

          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">理想工作環境</Text>
            <Text className="text-sm text-foreground leading-relaxed">{guide.workEnvironment}</Text>
          </View>

          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">溝通風格</Text>
            <Text className="text-sm text-foreground leading-relaxed">{guide.communicationStyle}</Text>
          </View>

          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">領導風格</Text>
            <Text className="text-sm text-foreground leading-relaxed">{guide.leadershipStyle}</Text>
          </View>

          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">職業發展路徑</Text>
            <Text className="text-sm text-foreground leading-relaxed">{guide.careerPath}</Text>
          </View>

          <View className="gap-3 mt-4">
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/mbti-analysis",
                  params: { resultId: analysisResultId },
                })
              }
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="p-4 bg-primary rounded-lg items-center">
                <Text className="text-background font-semibold">返回性格分析</Text>
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
