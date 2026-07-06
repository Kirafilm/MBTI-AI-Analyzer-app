import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { ALL_PSYCHOLOGY_TESTS, calculatePsychologyTestResult } from "@/shared/psychology-tests-data";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";
import { savePsychologyTestResult } from "@/lib/storage";

export default function PsychologyQuizScreen() {
  const router = useRouter();
  const { testId } = useLocalSearchParams<{ testId: string }>();
  const { language } = useI18n();
  const colors = useColors();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const test = ALL_PSYCHOLOGY_TESTS.find((t) => t.id === testId);

  if (!test) {
    return (
      <ScreenContainer className="p-4 items-center justify-center">
        <Text className="text-foreground">測驗未找到</Text>
      </ScreenContainer>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  const getQuestionText = () => {
    switch (language) {
      case "zh-TW":
        return currentQuestion.textZh;
      case "zh-CN":
        return currentQuestion.textZhSimplified;
      case "en":
        return currentQuestion.text;
      default:
        return currentQuestion.textZh;
    }
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizComplete(newAnswers);
    }
  };

  const handleQuizComplete = async (finalAnswers: number[]) => {
    setIsLoading(true);
    try {
      const result = calculatePsychologyTestResult(testId as any, finalAnswers);
      await savePsychologyTestResult(result);
      
      router.push({
        pathname: "/(tabs)/psychology-result",
        params: { resultId: result.id },
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
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Progress Bar */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-foreground">
                {currentQuestionIndex + 1} / {test.questions.length}
              </Text>
              <Text className="text-sm text-muted">
                {Math.round(progress)}%
              </Text>
            </View>
            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>

          {/* Question */}
          <View className="gap-4">
            <Text className="text-lg font-semibold text-foreground leading-relaxed">
              {getQuestionText()}
            </Text>
          </View>

          {/* Answer Options */}
          <View className="gap-2">
            {[
              { label: "完全不同意", value: 0 },
              { label: "不同意", value: 1 },
              { label: "中立", value: 2 },
              { label: "同意", value: 3 },
              { label: "完全同意", value: 4 },
            ].map((option, index) => (
              <Pressable
                key={index}
                onPress={() => handleAnswerSelect(option.value)}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <View className="border border-border rounded-lg p-4 items-center">
                  <Text className="text-foreground font-medium">
                    {option.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Navigation Buttons */}
          <View className="gap-3 pt-4">
            {currentQuestionIndex > 0 && (
              <Pressable
                onPress={handlePrevious}
                disabled={isLoading}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <View className="border border-primary rounded-lg p-3 items-center">
                  <Text className="text-primary font-semibold">
                    上一題
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
