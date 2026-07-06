import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useMBTI } from "@/lib/mbti-context";
import { useI18n } from "@/lib/i18n-context";
import { MBTI_QUESTIONS } from "@/shared/mbti-questions";
import { getMBTIQuestion } from "@/shared/mbti-questions-multilang";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

// SCORE_LABELS will be generated dynamically from i18n

export default function MBTIQuizScreen() {
  const router = useRouter();
  const { t, language } = useI18n();
  const colors = useColors();
  const {
    currentQuestionIndex,
    answers,
    isLoading,
    error,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitQuiz,
  } = useMBTI();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = MBTI_QUESTIONS[currentQuestionIndex];
  const questionText = getMBTIQuestion(currentQuestion.id, language);
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);
  const currentScore = currentAnswer?.score || 0;

  const handleAnswerSelect = async (score: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    answerQuestion(currentQuestion.id, score);
  };

  const handleNext = async () => {
    if (currentQuestionIndex === MBTI_QUESTIONS.length - 1) {
      // 提交測驗
      setIsSubmitting(true);
      try {
        const result = await submitQuiz();
        router.push({
          pathname: "/mbti-result",
          params: { resultId: result.id },
        });
      } catch (err) {
        console.error("Error submitting quiz:", err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const isAnswered = currentScore > 0;
  const isLastQuestion = currentQuestionIndex === MBTI_QUESTIONS.length - 1;
  const progress = ((currentQuestionIndex + 1) / MBTI_QUESTIONS.length) * 100;

  // 根據語言生成選項標籤，確保語言改變時能正確更新
  // 使用 useMemo 避免不必要的重新計算
  const scoreOptions = React.useMemo(
    () => [
      t("stronglyDisagree"),
      t("disagree"),
      t("neutral"),
      t("agree"),
      t("stronglyAgree"),
    ],
    [language, t]
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">
              {t("quiz")}
            </Text>
            <Text className="text-sm text-muted">
              {t("question")} {currentQuestionIndex + 1} {t("of")} {MBTI_QUESTIONS.length}
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="h-2 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </View>

          {/* Question */}
          <View className="gap-4">
            <Text className="text-base font-medium text-foreground leading-relaxed">
              {questionText}
            </Text>

            {/* Score Options */}
            <View className="gap-3">
              {scoreOptions.map((label, index) => {
                const score = index + 1;
                const isSelected = currentScore === score;

                return (
                  <Pressable
                    key={score}
                    onPress={() => handleAnswerSelect(score)}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.7 : 1,
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                      },
                    ]}
                  >
                    <View
                      className={`p-4 rounded-lg border-2 ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      }`}
                    >
                      <Text
                        className={`text-center font-medium ${
                          isSelected ? "text-background" : "text-foreground"
                        }`}
                      >
                        {label}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Error Message */}
          {error && (
            <View className="p-3 bg-error rounded-lg">
              <Text className="text-background text-sm">{error}</Text>
            </View>
          )}

          {/* Navigation Buttons */}
          <View className="gap-3 mt-4">
            <View className="flex-row gap-3">
              <Pressable
                onPress={handlePrevious}
                disabled={currentQuestionIndex === 0 || isSubmitting}
                style={({ pressed }) => [
                  {
                    opacity: currentQuestionIndex === 0 || isSubmitting ? 0.5 : pressed ? 0.8 : 1,
                  },
                ]}
                className="flex-1"
              >
                <View className="p-3 bg-surface rounded-lg border border-border items-center">
                  <Text className="text-foreground font-medium">{t("previous")}</Text>
                </View>
              </Pressable>

              <Pressable
                onPress={handleNext}
                disabled={!isAnswered || isSubmitting}
                style={({ pressed }) => [
                  {
                    opacity: !isAnswered || isSubmitting ? 0.5 : pressed ? 0.9 : 1,
                    transform: [{ scale: !isAnswered || isSubmitting ? 1 : pressed ? 0.97 : 1 }],
                  },
                ]}
                className="flex-1"
              >
                <View className="p-3 bg-primary rounded-lg items-center">
                  {isSubmitting ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-background font-semibold">
                      {isLastQuestion ? t("submit") : t("next")}
                    </Text>
                  )}
                </View>
              </Pressable>
            </View>

            {/* Progress Indicator */}
            <Text className="text-center text-xs text-muted">
              {t("progress")}: {answers.length} / {MBTI_QUESTIONS.length}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
