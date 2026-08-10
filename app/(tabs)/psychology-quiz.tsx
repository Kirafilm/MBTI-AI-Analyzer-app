import { useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { ALL_PSYCHOLOGY_TESTS, calculatePsychologyTestResult } from "@/psychology-tests-data";
import * as Haptics from "expo-haptics";
import { savePsychologyTestResult } from "@/lib/storage";
import { paramToString } from "@/lib/route-params";
import type { PsychologyAnswer, PsychologyTestResult, PsychologyTestType } from "@/shared/types";

const TEST_TYPE_MAP: Record<string, PsychologyTestType> = {
  anxiety: "social-anxiety",
  happiness: "emotional-stability",
  stress: "stress-index",
  depression: "depression",
  sleep: "sleep",
  focus: "focus",
  "self-esteem": "self-esteem",
  "emotional-iq": "emotional-iq",
  "social-anxiety": "social-anxiety",
  burnout: "burnout",
  procrastination: "procrastination",
  perfectionism: "perfectionism",
  "attachment-style": "attachment-style",
  "love-language": "love-language",
  "communication-style": "communication-style",
  "conflict-style": "conflict-style",
  loneliness: "loneliness",
  optimism: "optimism",
  gratitude: "gratitude",
  resilience: "resilience",
  "decision-style": "decision-style",
  "learning-style": "learning-style",
  "time-management": "time-management",
  "digital-wellbeing": "digital-wellbeing",
  "money-mindset": "money-mindset",
  boundaries: "boundaries",
  anger: "anger",
  imposter: "imposter",
  "morning-evening": "morning-evening",
  "team-role": "team-role",
};

const LEVEL_MAP: Record<
  "very-low" | "low" | "medium" | "high" | "very-high",
  "low" | "moderate" | "high" | "very-high"
> = {
  "very-low": "low",
  low: "low",
  medium: "moderate",
  high: "high",
  "very-high": "very-high",
};

export default function PsychologyQuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ testId?: string | string[] }>();
  const testId = paramToString(params.testId);
  const { language } = useI18n();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const test = ALL_PSYCHOLOGY_TESTS.find((t) => t.id === testId);

  if (!test) {
    return (
      <ScreenContainer className="p-4 items-center justify-center">
        <Text className="text-foreground">
          {language === "en" ? "Test not found" : language === "zh-CN" ? "测验未找到" : "測驗未找到"}
        </Text>
      </ScreenContainer>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  const getQuestionText = () => {
    if (language === "zh-CN") return currentQuestion.textZhSimplified;
    if (language === "en") return currentQuestion.text;
    return currentQuestion.textZh;
  };

  const getScaleLabels = () => {
    if (language === "en") {
      return ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
    }
    if (language === "zh-CN") {
      return ["完全不同意", "不同意", "中立", "同意", "完全同意"];
    }
    return ["完全不同意", "不同意", "中立", "同意", "完全同意"];
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      await handleQuizComplete(newAnswers);
    }
  };

  const handleQuizComplete = async (finalAnswers: number[]) => {
    setIsLoading(true);
    try {
      const calculated = calculatePsychologyTestResult(test.id, finalAnswers);
      const interpretation =
        language === "en"
          ? calculated.interpretation
          : language === "zh-CN"
            ? calculated.interpretationZhSimplified
            : calculated.interpretationZh;
      const recommendations =
        language === "en"
          ? calculated.recommendations
          : language === "zh-CN"
            ? calculated.recommendationsZhSimplified
            : calculated.recommendationsZh;
      const testName =
        language === "en" ? test.name : language === "zh-CN" ? test.nameZhSimplified : test.nameZh;

      const typedAnswers: PsychologyAnswer[] = finalAnswers.map((selectedOptionIndex, index) => ({
        questionId: index + 1,
        selectedOptionIndex,
      }));

      const appResult: PsychologyTestResult = {
        id: calculated.id,
        testType: TEST_TYPE_MAP[test.id] ?? "stress-index",
        testName,
        totalScore: calculated.score,
        maxScore: test.questions.length * 4,
        percentage: calculated.percentile,
        level: LEVEL_MAP[calculated.level],
        interpretation,
        recommendations,
        createdAt: new Date(calculated.createdAt),
        answers: typedAnswers,
      };

      await savePsychologyTestResult(appResult);

      router.push({
        pathname: "/(tabs)/psychology-result",
        params: { resultId: appResult.id },
      });
    } catch (error) {
      console.error("Error completing quiz:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnswers((prev) => prev.slice(0, -1));
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView
        className="flex-1"
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6">
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-foreground">
                {currentQuestionIndex + 1} / {test.questions.length}
              </Text>
              <Text className="text-sm text-muted">{Math.round(progress)}%</Text>
            </View>
            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </View>
          </View>

          <View className="gap-4">
            <Text className="text-lg font-semibold text-foreground leading-relaxed">{getQuestionText()}</Text>
          </View>

          <View className="gap-2">
            {getScaleLabels().map((label, index) => (
              <Pressable
                key={index}
                onPress={() => handleAnswerSelect(index)}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
              >
                <View className="border border-border rounded-lg p-4 items-center">
                  <Text className="text-foreground font-medium">{label}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <View className="gap-3 pt-4">
            {currentQuestionIndex > 0 && (
              <Pressable
                onPress={handlePrevious}
                disabled={isLoading}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
              >
                <View className="border border-primary rounded-lg p-3 items-center">
                  <Text className="text-primary font-semibold">
                    {language === "en" ? "Previous" : language === "zh-CN" ? "上一题" : "上一題"}
                  </Text>
                </View>
              </Pressable>
            )}
            {isLoading ? <ActivityIndicator /> : null}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
