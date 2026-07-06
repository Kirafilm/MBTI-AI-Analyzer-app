import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ALL_ENHANCED_TESTS } from "@/shared/new-psychology-tests-enhanced";

export default function NewPsychologyResultScreen() {
  const router = useRouter();
  const { testId, resultData } = useLocalSearchParams<{ testId: string; resultData: string }>();
  const { language } = useI18n();
  const colors = useColors();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    characteristics: true,
    strengths: true,
    growth: false,
    lifeAdvice: false,
    relationship: false,
    career: false,
    compatible: false,
  });

  // 解析結果數據
  let result: any = null;
  try {
    result = resultData ? JSON.parse(resultData) : null;
  } catch (e) {
    result = null;
  }

  if (!result || !testId) {
    return (
      <ScreenContainer className="p-4 items-center justify-center">
        <Text className="text-foreground text-lg">
          {language === "en" ? "Result not found" : language === "zh-CN" ? "结果未找到" : "結果未找到"}
        </Text>
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, marginTop: 16 }]}
        >
          <View className="bg-primary rounded-lg px-6 py-3">
            <Text className="text-white font-semibold">
              {language === "en" ? "Back to Home" : language === "zh-CN" ? "返回首页" : "返回首頁"}
            </Text>
          </View>
        </Pressable>
      </ScreenContainer>
    );
  }

  // 根據測驗類型和結果獲取增強版數據
  const getEnhancedData = () => {
    const resultKey = result.type || result.style || result.role || "";
    switch (testId) {
      case "color-personality":
        return ALL_ENHANCED_TESTS.colorPersonality?.[resultKey as keyof typeof ALL_ENHANCED_TESTS.colorPersonality];
      case "love-style":
        return ALL_ENHANCED_TESTS.loveStyle?.[resultKey as keyof typeof ALL_ENHANCED_TESTS.loveStyle];
      case "work-style":
        return ALL_ENHANCED_TESTS.workStyle?.[resultKey as keyof typeof ALL_ENHANCED_TESTS.workStyle];
      case "creativity-index":
        return ALL_ENHANCED_TESTS.creativityIndex?.[resultKey as keyof typeof ALL_ENHANCED_TESTS.creativityIndex];
      default:
        return null;
    }
  };

  const enhancedData = getEnhancedData();
  const analysis = enhancedData?.detailedAnalysis;

  // 多語言文本獲取函數
  const getText = (zhKey: string, zhCNKey: string, enKey: string, source: any) => {
    if (!source) return "";
    if (language === "zh-CN") return source[zhCNKey] || source[zhKey] || "";
    if (language === "en") return source[enKey] || "";
    return source[zhKey] || "";
  };

  const getArray = (zhKey: string, zhCNKey: string, enKey: string, source: any): string[] => {
    if (!source) return [];
    if (language === "zh-CN") return source[zhCNKey] || source[zhKey] || [];
    if (language === "en") return source[enKey] || [];
    return source[zhKey] || [];
  };

  const getTestName = () => {
    const names: Record<string, Record<string, string>> = {
      "color-personality": { "zh-TW": "性格色彩測驗", "zh-CN": "性格色彩测验", en: "Color Personality Test" },
      "love-style": { "zh-TW": "愛情風格測驗", "zh-CN": "爱情风格测验", en: "Love Style Test" },
      "work-style": { "zh-TW": "工作風格測驗", "zh-CN": "工作风格测验", en: "Work Style Test" },
      "creativity-index": { "zh-TW": "創意指數測驗", "zh-CN": "创意指数测验", en: "Creativity Index Test" },
    };
    return names[testId]?.[language] || testId;
  };

  const getResultName = () => {
    if (!enhancedData) return result.type || result.style || result.role || "";
    if (language === "zh-CN") return enhancedData.nameZhCN || enhancedData.nameZh || "";
    if (language === "en") return enhancedData.nameEn || "";
    return enhancedData.nameZh || "";
  };

  const getResultColor = () => {
    if (testId === "color-personality") {
      const colorMap: Record<string, string> = {
        red: "#EF4444",
        blue: "#3B82F6",
        green: "#22C55E",
        yellow: "#F59E0B",
      };
      return colorMap[result.type] || colors.primary;
    }
    return colors.primary;
  };

  const toggleSection = (section: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBackToHome = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.replace("/(tabs)");
  };

  // 可展開的分析卡片組件
  const AnalysisSection = ({
    sectionId,
    icon,
    title,
    items,
  }: {
    sectionId: string;
    icon: string;
    title: string;
    items: string[];
  }) => {
    if (!items || items.length === 0) return null;
    const isExpanded = expandedSections[sectionId];

    return (
      <View className="bg-surface rounded-2xl overflow-hidden border border-border">
        <Pressable
          onPress={() => toggleSection(sectionId)}
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        >
          <View className="p-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3 flex-1">
              <MaterialIcons name={icon as any} size={22} color={getResultColor()} />
              <Text className="text-base font-semibold text-foreground flex-1">{title}</Text>
            </View>
            <MaterialIcons
              name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color={colors.muted}
            />
          </View>
        </Pressable>

        {isExpanded && (
          <View className="px-4 pb-4 gap-3">
            <View className="h-px bg-border" />
            {items.map((item, index) => (
              <View key={index} className="flex-row gap-3 items-start">
                <View
                  className="w-6 h-6 rounded-full items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: getResultColor() + "20" }}
                >
                  <Text className="text-xs font-bold" style={{ color: getResultColor() }}>
                    {index + 1}
                  </Text>
                </View>
                <Text className="text-foreground leading-relaxed flex-1">{item}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-8">
          {/* 頂部結果卡片 */}
          <View
            className="rounded-2xl p-6 items-center gap-3"
            style={{ backgroundColor: getResultColor() }}
          >
            <Text className="text-white text-sm font-semibold opacity-90">
              {getTestName()}
            </Text>
            <Text className="text-white text-3xl font-bold text-center">
              {getResultName()}
            </Text>
            {testId === "creativity-index" && result.index != null && (
              <Text className="text-white text-lg">
                {language === "en" ? "Creativity Index" : language === "zh-CN" ? "创意指数" : "創意指數"}: {result.index}%
              </Text>
            )}
          </View>

          {/* 概述 */}
          {analysis && (
            <View className="bg-surface rounded-2xl p-4 gap-2 border border-border">
              <Text className="text-lg font-semibold text-foreground">
                {language === "en" ? "Overview" : language === "zh-CN" ? "概述" : "概述"}
              </Text>
              <Text className="text-foreground leading-relaxed">
                {getText("overviewZh", "overviewZhCN", "overviewEn", analysis)}
              </Text>
            </View>
          )}

          {/* 維度分析 */}
          {result.scores && (
            <View className="bg-surface rounded-2xl p-4 gap-3 border border-border">
              <Text className="text-lg font-semibold text-foreground">
                {language === "en" ? "Dimension Scores" : language === "zh-CN" ? "维度分数" : "維度分數"}
              </Text>
              {Object.entries(result.scores).map(([key, value]) => {
                const dimensionNames: Record<string, Record<string, string>> = {
                  red: { "zh-TW": "紅色（熱情）", "zh-CN": "红色（热情）", en: "Red (Passion)" },
                  blue: { "zh-TW": "藍色（思考）", "zh-CN": "蓝色（思考）", en: "Blue (Thinking)" },
                  green: { "zh-TW": "綠色（平衡）", "zh-CN": "绿色（平衡）", en: "Green (Balance)" },
                  yellow: { "zh-TW": "黃色（樂觀）", "zh-CN": "黄色（乐观）", en: "Yellow (Optimism)" },
                  words: { "zh-TW": "肯定言語", "zh-CN": "肯定言语", en: "Words of Affirmation" },
                  time: { "zh-TW": "精心時刻", "zh-CN": "精心时刻", en: "Quality Time" },
                  gifts: { "zh-TW": "接受禮物", "zh-CN": "接受礼物", en: "Receiving Gifts" },
                  service: { "zh-TW": "服務行動", "zh-CN": "服务行动", en: "Acts of Service" },
                  touch: { "zh-TW": "身體接觸", "zh-CN": "身体接触", en: "Physical Touch" },
                  leader: { "zh-TW": "領導者", "zh-CN": "领导者", en: "Leader" },
                  supporter: { "zh-TW": "支持者", "zh-CN": "支持者", en: "Supporter" },
                  innovator: { "zh-TW": "創新者", "zh-CN": "创新者", en: "Innovator" },
                  analyst: { "zh-TW": "分析師", "zh-CN": "分析师", en: "Analyst" },
                  coordinator: { "zh-TW": "協調者", "zh-CN": "协调者", en: "Coordinator" },
                  artistic: { "zh-TW": "藝術型", "zh-CN": "艺术型", en: "Artistic" },
                  technical: { "zh-TW": "技術型", "zh-CN": "技术型", en: "Technical" },
                  conceptual: { "zh-TW": "概念型", "zh-CN": "概念型", en: "Conceptual" },
                  practical: { "zh-TW": "實用型", "zh-CN": "实用型", en: "Practical" },
                  experimental: { "zh-TW": "實驗型", "zh-CN": "实验型", en: "Experimental" },
                };
                const label = dimensionNames[key]?.[language] || key;
                const maxPossible = 20;
                const percentage = Math.min(((value as number) / maxPossible) * 100, 100);

                return (
                  <View key={key} className="gap-1.5">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-sm font-medium text-foreground">{label}</Text>
                      <Text className="text-sm font-semibold" style={{ color: getResultColor() }}>
                        {value as number}
                      </Text>
                    </View>
                    <View className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: colors.border }}>
                      <View
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: getResultColor(),
                          width: `${percentage}%`,
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* 詳細分析區塊 */}
          {analysis && (
            <View className="gap-3">
              <Text className="text-xl font-bold text-foreground">
                {language === "en" ? "Detailed Analysis" : language === "zh-CN" ? "详细分析" : "詳細分析"}
              </Text>

              <AnalysisSection
                sectionId="characteristics"
                icon="psychology"
                title={language === "en" ? "Key Characteristics" : language === "zh-CN" ? "核心特征" : "核心特徵"}
                items={getArray("characteristicsZh", "characteristicsZhCN", "characteristicsEn", analysis)}
              />

              <AnalysisSection
                sectionId="strengths"
                icon="star"
                title={language === "en" ? "Strengths" : language === "zh-CN" ? "优势" : "優勢"}
                items={getArray("strengthsZh", "strengthsZhCN", "strengthsEn", analysis)}
              />

              <AnalysisSection
                sectionId="growth"
                icon="trending-up"
                title={language === "en" ? "Areas for Growth" : language === "zh-CN" ? "成长空间" : "成長空間"}
                items={getArray("areasForGrowthZh", "areasForGrowthZhCN", "areasForGrowthEn", analysis)}
              />

              <AnalysisSection
                sectionId="lifeAdvice"
                icon="lightbulb"
                title={language === "en" ? "Life Advice" : language === "zh-CN" ? "生活建议" : "生活建議"}
                items={getArray("lifeAdviceZh", "lifeAdviceZhCN", "lifeAdviceEn", analysis)}
              />

              <AnalysisSection
                sectionId="relationship"
                icon="favorite"
                title={language === "en" ? "Relationship Advice" : language === "zh-CN" ? "人际关系建议" : "人際關係建議"}
                items={getArray("relationshipAdviceZh", "relationshipAdviceZhCN", "relationshipAdviceEn", analysis)}
              />

              <AnalysisSection
                sectionId="career"
                icon="work"
                title={language === "en" ? "Career Advice" : language === "zh-CN" ? "职业建议" : "職業建議"}
                items={getArray("careerAdviceZh", "careerAdviceZhCN", "careerAdviceEn", analysis)}
              />

              <AnalysisSection
                sectionId="compatible"
                icon="people"
                title={language === "en" ? "Compatible Types" : language === "zh-CN" ? "相容类型" : "相容類型"}
                items={getArray("compatibleTypesZh", "compatibleTypesZhCN", "compatibleTypesEn", analysis)}
              />
            </View>
          )}

          {/* 如果沒有增強版數據，顯示基本建議 */}
          {!analysis && (
            <View className="bg-surface rounded-2xl p-4 gap-2 border border-border">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="lightbulb" size={20} color={getResultColor()} />
                <Text className="text-lg font-semibold text-foreground">
                  {language === "en" ? "Suggestions" : language === "zh-CN" ? "建议" : "建議"}
                </Text>
              </View>
              <Text className="text-foreground leading-relaxed">
                {language === "en"
                  ? "Based on your results, focus on developing your strengths while being aware of areas for growth. Consider how your personality type influences your daily decisions and relationships."
                  : language === "zh-CN"
                  ? "根据你的结果，专注于发展你的优势，同时注意成长的领域。思考你的性格类型如何影响你的日常决策和人际关系。"
                  : "根據你的結果，專注於發展你的優勢，同時注意成長的領域。思考你的性格類型如何影響你的日常決策和人際關係。"}
              </Text>
            </View>
          )}

          {/* 返回按鈕 */}
          <View className="gap-3 pt-4">
            <Pressable
              onPress={handleBackToHome}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View
                className="rounded-lg p-4 items-center"
                style={{ backgroundColor: getResultColor() }}
              >
                <Text className="text-white font-semibold text-lg">
                  {language === "en" ? "Back to Home" : language === "zh-CN" ? "返回首页" : "返回首頁"}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
