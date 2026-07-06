import { ScrollView, Text, View, Pressable, Platform } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { ALL_ENHANCED_TESTS } from "@/shared/new-psychology-tests-enhanced";

export default function NewPsychologyResultEnhancedScreen() {
  const router = useRouter();
  const { testType, resultType } = useLocalSearchParams();
  const { language } = useI18n();
  const colors = useColors();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!testType || !resultType) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-lg text-foreground">Error</Text>
      </ScreenContainer>
    );
  }

  const testTypeStr = Array.isArray(testType) ? testType[0] : testType;
  const resultTypeStr = Array.isArray(resultType) ? resultType[0] : resultType;

  // 根據測驗類型獲取結果數據
  const getResultData = () => {
    if (testTypeStr === "color") {
      return ALL_ENHANCED_TESTS.colorPersonality[resultTypeStr];
    } else if (testTypeStr === "love") {
      return ALL_ENHANCED_TESTS.loveStyle[resultTypeStr];
    } else if (testTypeStr === "work") {
      return ALL_ENHANCED_TESTS.workStyle[resultTypeStr];
    } else if (testTypeStr === "creativity") {
      return ALL_ENHANCED_TESTS.creativityIndex[resultTypeStr];
    }
    return null;
  };

  const result = getResultData();

  if (!result) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-lg text-foreground">Error</Text>
      </ScreenContainer>
    );
  }

  const analysis = result.detailedAnalysis;

  // 根據語言獲取文本
  const getTitle = () => {
    if (language === "zh-CN") return analysis.titleZhCN;
    if (language === "en") return analysis.titleEn;
    return analysis.titleZh;
  };

  const getOverview = () => {
    if (language === "zh-CN") return analysis.overviewZhCN;
    if (language === "en") return analysis.overviewEn;
    return analysis.overviewZh;
  };

  const getCharacteristics = () => {
    if (language === "zh-CN") return analysis.characteristicsZhCN;
    if (language === "en") return analysis.characteristicsEn;
    return analysis.characteristicsZh;
  };

  const getStrengths = () => {
    if (language === "zh-CN") return analysis.strengthsZhCN;
    if (language === "en") return analysis.strengthsEn;
    return analysis.strengthsZh;
  };

  const getAreasForGrowth = () => {
    if (language === "zh-CN") return analysis.areasForGrowthZhCN;
    if (language === "en") return analysis.areasForGrowthEn;
    return analysis.areasForGrowthZh;
  };

  const getLifeAdvice = () => {
    if (language === "zh-CN") return analysis.lifeAdviceZhCN;
    if (language === "en") return analysis.lifeAdviceEn;
    return analysis.lifeAdviceZh;
  };

  const getRelationshipAdvice = () => {
    if (language === "zh-CN") return analysis.relationshipAdviceZhCN;
    if (language === "en") return analysis.relationshipAdviceEn;
    return analysis.relationshipAdviceZh;
  };

  const getCareerAdvice = () => {
    if (language === "zh-CN") return analysis.careerAdviceZhCN;
    if (language === "en") return analysis.careerAdviceEn;
    return analysis.careerAdviceZh;
  };

  const getCompatibleTypes = () => {
    if (language === "zh-CN") return analysis.compatibleTypesZhCN;
    if (language === "en") return analysis.compatibleTypesEn;
    return analysis.compatibleTypesZh;
  };

  const handleSaveResult = async () => {
    try {
      const results = await AsyncStorage.getItem("psychologyResults");
      const parsed = results ? JSON.parse(results) : [];
      parsed.push({
        testType: testTypeStr,
        resultType: resultTypeStr,
        timestamp: new Date().toISOString(),
      });
      await AsyncStorage.setItem("psychologyResults", JSON.stringify(parsed));
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const SectionCard = ({
    title,
    content,
    sectionId,
  }: {
    title: string;
    content: string[];
    sectionId: string;
  }) => {
    const isExpanded = expandedSection === sectionId;

    return (
      <View className="mb-4 rounded-lg overflow-hidden border border-border">
        <Pressable
          onPress={() => toggleSection(sectionId)}
          style={({ pressed }) => [
            {
              backgroundColor: colors.surface,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="p-4"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-foreground flex-1">
              {title}
            </Text>
            <Text className="text-xl text-primary">
              {isExpanded ? "−" : "+"}
            </Text>
          </View>
        </Pressable>

        {isExpanded && (
          <View className="bg-background p-4 border-t border-border">
            {content.map((item, index) => (
              <View key={index} className="mb-3 flex-row">
                <Text className="text-primary font-bold mr-3">
                  {index + 1}.
                </Text>
                <Text className="text-foreground flex-1 leading-relaxed">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        {/* 標題卡片 */}
        <View className="mb-6 rounded-2xl overflow-hidden border-2 border-primary">
          <View className="bg-primary p-6">
            <Text className="text-3xl font-bold text-background mb-2">
              {getTitle()}
            </Text>
            <Text className="text-background text-sm opacity-90">
              {language === "zh-CN"
                ? "詳細性格分析與建議"
                : language === "en"
                  ? "Detailed Analysis & Recommendations"
                  : "詳細性格分析與建議"}
            </Text>
          </View>
        </View>

        {/* 概述 */}
        <View className="mb-6 bg-surface rounded-lg p-4 border border-border">
          <Text className="text-lg font-bold text-foreground mb-3">
            {language === "zh-CN"
              ? "性格概述"
              : language === "en"
                ? "Overview"
                : "性格概述"}
          </Text>
          <Text className="text-foreground leading-relaxed text-base">
            {getOverview()}
          </Text>
        </View>

        {/* 性格特徵 */}
        <SectionCard
          title={
            language === "zh-CN"
              ? "性格特徵"
              : language === "en"
                ? "Characteristics"
                : "性格特徵"
          }
          content={getCharacteristics()}
          sectionId="characteristics"
        />

        {/* 優勢 */}
        <SectionCard
          title={
            language === "zh-CN"
              ? "核心優勢"
              : language === "en"
                ? "Key Strengths"
                : "核心優勢"
          }
          content={getStrengths()}
          sectionId="strengths"
        />

        {/* 成長空間 */}
        <SectionCard
          title={
            language === "zh-CN"
              ? "成長空間"
              : language === "en"
                ? "Areas for Growth"
                : "成長空間"
          }
          content={getAreasForGrowth()}
          sectionId="growth"
        />

        {/* 生活建議 */}
        <SectionCard
          title={
            language === "zh-CN"
              ? "生活建議"
              : language === "en"
                ? "Life Advice"
                : "生活建議"
          }
          content={getLifeAdvice()}
          sectionId="life"
        />

        {/* 人際關係建議 */}
        <SectionCard
          title={
            language === "zh-CN"
              ? "人際關係建議"
              : language === "en"
                ? "Relationship Advice"
                : "人際關係建議"
          }
          content={getRelationshipAdvice()}
          sectionId="relationship"
        />

        {/* 職業建議 */}
        <SectionCard
          title={
            language === "zh-CN"
              ? "職業建議"
              : language === "en"
                ? "Career Advice"
                : "職業建議"
          }
          content={getCareerAdvice()}
          sectionId="career"
        />

        {/* 相容類型 */}
        <View className="mb-6 bg-surface rounded-lg p-4 border border-border">
          <Text className="text-lg font-bold text-foreground mb-3">
            {language === "zh-CN"
              ? "相容性格類型"
              : language === "en"
                ? "Compatible Types"
                : "相容性格類型"}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {getCompatibleTypes().map((type, index) => (
              <View
                key={index}
                className="bg-primary rounded-full px-4 py-2"
              >
                <Text className="text-background text-sm font-semibold">
                  {type}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 操作按鈕 */}
        <View className="gap-3 mb-6">
          <Pressable
            onPress={handleSaveResult}
            style={({ pressed }) => [
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            className="rounded-lg p-4 items-center"
          >
            <Text className="text-background font-semibold text-lg">
              {language === "zh-CN"
                ? "保存結果"
                : language === "en"
                  ? "Save Result"
                  : "保存結果"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            className="rounded-lg p-4 items-center"
          >
            <Text className="text-foreground font-semibold text-lg">
              {language === "zh-CN"
                ? "返回"
                : language === "en"
                  ? "Back"
                  : "返回"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
