import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import type { MBTIResult, CareerGuide } from "@/shared/types";
import { getMBTIResults, getCareerGuideByResultId, saveCareerGuide } from "@/lib/storage";
import { trpc } from "@/lib/trpc";

export default function MBTICareerScreen() {
  const router = useRouter();
  const { t, language } = useI18n();
  const colors = useColors();
  const { resultId } = useLocalSearchParams();

  const [result, setResult] = useState<MBTIResult | null>(null);
  const [guide, setGuide] = useState<CareerGuide | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mbtiType, setMbtiType] = useState<string | null>(null);

  // Use tRPC mutation hook correctly
  const generateCareerGuideMutation = trpc.analysis.generateCareerGuide.useMutation();

  useEffect(() => {
    loadCareerGuide();
  }, [resultId, language]);

  const loadCareerGuide = async () => {
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

      // 注意：不使用緩存的指引，因為語言改變時需要重新生成
      // 每次語言改變都會觸發新的 AI 生成

      // 設置 MBTI 類型以觸發 mutation
      setMbtiType(found.type);
    } catch (err) {
      const message = err instanceof Error ? err.message : t("failed");
      setError(message);
      console.error("Error loading career guide:", err);
      setIsLoading(false);
    }
  };

  // 當 mbtiType 改變時，觸發 mutation
  useEffect(() => {
    if (!mbtiType) return;

    const generateGuide = async () => {
      try {
        // 將 zh-TW 轉換為 zh-HK（後端支持的格式）
        const apiLanguage = language === "zh-TW" ? "zh-HK" : (language as "zh-CN" | "en" | "zh-HK");
        const response = await generateCareerGuideMutation.mutateAsync({
          mbtiType: mbtiType,
          language: apiLanguage,
        });

        const newGuide: CareerGuide = {
          resultId: resultId as string,
          mbtiType: mbtiType as any,
          recommendedCareers: response.recommendedCareers,
          workEnvironment: response.workEnvironment,
          communicationStyle: response.communicationStyle,
          leadershipStyle: response.leadershipStyle,
          careerPath: response.careerPath,
          createdAt: new Date(),
        };

        await saveCareerGuide(newGuide);
        setGuide(newGuide);
        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : t("failedToGenerateCareerGuide");
        setError(message);
        console.error("Error generating career guide:", err);
        setIsLoading(false);
      }
    };

    generateGuide();
  }, [mbtiType, language]);

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <View className="gap-3 items-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="text-foreground text-sm">{t("generatingCareerGuide")}</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !guide) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground font-semibold">{error || t("failedToGenerateCareerGuide")}</Text>
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
            <Text className="text-2xl font-bold text-foreground">{t("careerGuidance")}</Text>
            <Text className="text-sm text-muted">{t("basedOn")} {result?.type}</Text>
          </View>

          {/* Recommended Careers */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">{t("recommendedCareers")}</Text>
            {guide.recommendedCareers.map((career, index) => (
              <View key={index} className="flex-row gap-3 p-3 bg-surface rounded-lg">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                  <Text className="text-background text-xs font-bold">{index + 1}</Text>
                </View>
                <Text className="flex-1 text-sm text-foreground leading-relaxed">{career}</Text>
              </View>
            ))}
          </View>

          {/* Work Environment */}
          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("idealWorkEnvironment")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">{guide.workEnvironment}</Text>
          </View>

          {/* Communication Style */}
          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("communicationStyle")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">
              {guide.communicationStyle}
            </Text>
          </View>

          {/* Leadership Style */}
          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("leadershipStyle")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">{guide.leadershipStyle}</Text>
          </View>

          {/* Career Path */}
          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("careerPath")}</Text>
            <Text className="text-sm text-foreground leading-relaxed">{guide.careerPath}</Text>
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mt-4">
            <Pressable
              onPress={() => router.push(`/(tabs)/mbti-analysis?resultId=${resultId}`)}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="p-4 bg-primary rounded-lg items-center">
                <Text className="text-background font-semibold">{t("backToAnalysis")}</Text>
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
