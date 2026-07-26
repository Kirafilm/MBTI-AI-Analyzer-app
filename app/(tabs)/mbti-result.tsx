import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { paramToString } from "@/lib/route-params";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import { translations } from "@/shared/i18n";
import { MBTI_TYPE_INFO } from "@/shared/mbti-questions";
import type { MBTIResult } from "@/shared/types";
import { getMBTIResults } from "@/lib/storage";
import * as Haptics from "expo-haptics";

export default function MBTIResultScreen() {
  const router = useRouter();
  const colors = useColors();
  const { t, language } = useI18n();
  const params = useLocalSearchParams<{ resultId?: string | string[] }>();
  const resultId = paramToString(params.resultId);

  const [result, setResult] = useState<MBTIResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dimensions = useMemo(() => {
    const tr = translations[language];
    return [
      { label: tr.dimensionEI, key: "EI" as const, left: "E", right: "I" },
      { label: tr.dimensionSN, key: "SN" as const, left: "S", right: "N" },
      { label: tr.dimensionTF, key: "TF" as const, left: "T", right: "F" },
      { label: tr.dimensionJP, key: "JP" as const, left: "J", right: "P" },
    ];
  }, [language]);

  const loadResult = useCallback(async () => {
    try {
      setIsLoading(true);
      const results = await getMBTIResults();
      const found = resultId ? results.find((r) => r.id === resultId) : undefined;
      setResult(found || null);
    } catch (error) {
      console.error("Error loading result:", error);
    } finally {
      setIsLoading(false);
    }
  }, [resultId]);

  useEffect(() => {
    void loadResult();
  }, [loadResult]);

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

  if (!result) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground font-semibold">{t("quizResultNotFound")}</Text>
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

  const typeInfo = MBTI_TYPE_INFO[result.type];

  const handleViewAnalysis = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/(tabs)/mbti-analysis",
      params: { resultId: result.id },
    });
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          <View className="items-center gap-3">
            <View className="w-32 h-32 bg-primary rounded-2xl items-center justify-center">
              <Text className="text-5xl font-bold text-background">{result.type}</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground">{typeInfo.chineseName}</Text>
            <Text className="text-sm text-muted">{typeInfo.englishName}</Text>
          </View>

          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm text-foreground leading-relaxed">{typeInfo.description}</Text>
          </View>

          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("personalityTraits")}</Text>
            <View className="flex-row flex-wrap gap-2">
              {typeInfo.traits.map((trait, index) => (
                <View key={index} className="px-3 py-1 bg-primary rounded-full">
                  <Text className="text-xs text-background font-medium">{trait}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="gap-4">
            <Text className="text-sm font-semibold text-foreground">{t("dimensionAnalysis")}</Text>
            {dimensions.map((dim) => {
              const score = result.scores[dim.key];
              const percentage = score;

              return (
                <View key={dim.key} className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-muted flex-1">{dim.label}</Text>
                    <Text className="text-xs font-semibold text-foreground">{percentage}%</Text>
                  </View>
                  <View className="flex-row gap-2 items-center">
                    <Text className="text-xs font-bold text-primary w-6">{dim.left}</Text>
                    <View className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <View
                        className="h-full bg-primary"
                        style={{ width: `${percentage}%` }}
                      />
                    </View>
                    <Text className="text-xs font-bold text-primary w-6 text-right">
                      {dim.right}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View className="gap-3 mt-4">
            <Pressable
              onPress={handleViewAnalysis}
              style={({ pressed }) => [
                { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
              ]}
            >
              <View className="p-4 bg-primary rounded-lg items-center">
                <Text className="text-background font-semibold">{t("viewAnalysis")}</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(tabs)")}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="p-4 bg-surface rounded-lg items-center">
                <Text className="text-foreground font-medium">{t("backToHome")}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
