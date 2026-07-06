import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import { MBTI_TYPE_INFO } from "@/shared/mbti-questions";
import { MBTI_MULTILANG_DATA } from "@/shared/mbti-multilang";
import type { MBTIResult } from "@/shared/types";
import { getMBTIResults } from "@/lib/storage";
import * as Haptics from "expo-haptics";

export default function MBTIResultScreen() {
  const router = useRouter();
  const { t, language } = useI18n();
  const colors = useColors();
  const { resultId } = useLocalSearchParams();

  const [result, setResult] = useState<MBTIResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResult();
  }, [resultId]);

  const loadResult = async () => {
    try {
      setIsLoading(true);
      const results = await getMBTIResults();
      const found = results.find((r) => r.id === resultId);
      setResult(found || null);
    } catch (error) {
      console.error("Error loading result:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!result) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground font-semibold">{t("notFound")}</Text>
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

  const typeInfo = MBTI_TYPE_INFO[result.type];

  const getDimensionLabel = (key: string) => {
    const labels: Record<string, Record<string, string>> = {
      EI: {
        "zh-TW": "外向 ↔ 內向",
        "zh-CN": "外向 ↔ 内向",
        en: "Extroversion ↔ Introversion",
      },
      SN: {
        "zh-TW": "感知 ↔ 直覺",
        "zh-CN": "感知 ↔ 直觉",
        en: "Sensing ↔ Intuition",
      },
      TF: {
        "zh-TW": "思考 ↔ 感受",
        "zh-CN": "思考 ↔ 感受",
        en: "Thinking ↔ Feeling",
      },
      JP: {
        "zh-TW": "判斷 ↔ 感知",
        "zh-CN": "判断 ↔ 感知",
        en: "Judging ↔ Perceiving",
      },
    };
    return labels[key]?.[language] || labels[key]?.["zh-TW"];
  };

  const getTypeDisplayName = () => {
    if (language === "en") {
      return typeInfo.englishName;
    } else if (language === "zh-CN") {
      const multiLangData = MBTI_MULTILANG_DATA[result.type];
      return multiLangData?.chineseNameZhCN || typeInfo.chineseName;
    }
    return typeInfo.chineseName;
  };

  const getTypeDescription = () => {
    const multiLangData = MBTI_MULTILANG_DATA[result.type];
    if (language === "en") {
      return multiLangData?.descriptionEn || typeInfo.description;
    } else if (language === "zh-CN") {
      return multiLangData?.descriptionZhCN || typeInfo.description;
    }
    return typeInfo.description;
  };

  const getTraits = () => {
    const multiLangData = MBTI_MULTILANG_DATA[result.type];
    if (language === "en") {
      return multiLangData?.traitsEn || typeInfo.traits;
    } else if (language === "zh-CN") {
      return multiLangData?.traitsZhCN || typeInfo.traits;
    }
    return typeInfo.traits;
  };

  const dimensions = [
    { label: getDimensionLabel("EI"), key: "EI", left: "E", right: "I" },
    { label: getDimensionLabel("SN"), key: "SN", left: "S", right: "N" },
    { label: getDimensionLabel("TF"), key: "TF", left: "T", right: "F" },
    { label: getDimensionLabel("JP"), key: "JP", left: "J", right: "P" },
  ];

  const handleViewAnalysis = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/(tabs)/mbti-analysis",
      params: { resultId: result.id },
    });
  };

  const handleViewCareerGuide = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/(tabs)/mbti-career",
      params: { resultId: result.id },
    });
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* MBTI Type Display */}
          <View className="items-center gap-3">
            <View className="w-32 h-32 bg-primary rounded-2xl items-center justify-center">
              <Text className="text-5xl font-bold text-background">{result.type}</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground">{getTypeDisplayName()}</Text>
            <Text className="text-sm text-muted">
              {language === "en" ? typeInfo.chineseName : language === "zh-CN" ? typeInfo.englishName : typeInfo.englishName}
            </Text>
          </View>

          {/* Description */}
          <View className="p-4 bg-surface rounded-lg gap-2">
            <Text className="text-sm text-foreground leading-relaxed">
              {getTypeDescription()}
            </Text>
          </View>

          {/* Traits */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">{t("personalityTraits")}</Text>
            <View className="flex-row flex-wrap gap-2">
              {getTraits().map((trait: string, index: number) => (
                <View key={index} className="px-3 py-1 bg-primary rounded-full">
                  <Text className="text-xs text-background font-medium">{trait}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Dimension Analysis */}
          <View className="gap-4">
            <Text className="text-sm font-semibold text-foreground">{t("dimensionAnalysis")}</Text>
            {dimensions.map((dim) => {
              const score = result.scores[dim.key as keyof typeof result.scores];
              const percentage = score;

              return (
                <View key={dim.key} className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-muted flex-1">{dim.label}</Text>
                    <Text className="text-xs font-semibold text-foreground">
                      {percentage}%
                    </Text>
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

          {/* Action Buttons */}
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
              onPress={handleViewCareerGuide}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="p-4 bg-surface border border-primary rounded-lg items-center">
                <Text className="text-foreground font-semibold">{t("careerGuide")}</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.back()}
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
