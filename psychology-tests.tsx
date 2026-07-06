import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import { ALL_PSYCHOLOGY_TESTS } from "@/shared/psychology-tests";
import * as Haptics from "expo-haptics";

export default function PsychologyTestsScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const colors = useColors();

  const handleStartTest = (testId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/(tabs)/psychology-quiz",
      params: { testId },
    });
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              {t("psychologyTests")}
            </Text>
            <Text className="text-sm text-muted">
              {t("exploreYourMentalHealth")}
            </Text>
          </View>

          {/* Tests Grid */}
          <View className="gap-3">
            {ALL_PSYCHOLOGY_TESTS.map((test) => (
              <Pressable
                key={test.id}
                onPress={() => handleStartTest(test.id)}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
              >
                <View className="p-4 bg-surface rounded-lg gap-3 border border-border">
                  {/* Test Name and Icon */}
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 gap-1">
                      <Text className="text-lg font-bold text-foreground">
                        {test.nameZh}
                      </Text>
                      <Text className="text-xs text-primary">{test.nameEn}</Text>
                    </View>
                    <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center">
                      <Text className="text-xl">
                        {test.id === "anxiety"
                          ? "😰"
                          : test.id === "happiness"
                            ? "😊"
                            : test.id === "stress"
                              ? "😓"
                              : test.id === "emotion"
                                ? "🎭"
                                : "💪"}
                      </Text>
                    </View>
                  </View>

                  {/* Description */}
                  <Text className="text-sm text-muted leading-relaxed">
                    {test.descriptionZh}
                  </Text>

                  {/* Questions Count */}
                  <View className="flex-row items-center gap-2">
                    <View className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <Text className="text-xs text-muted">
                      {test.questions.length} {t("questions")}
                    </Text>
                  </View>

                  {/* Start Button */}
                  <View className="mt-2 bg-primary/10 rounded-lg p-3 items-center">
                    <Text className="text-sm font-semibold text-primary">
                      {t("startTest")}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Info Section */}
          <View className="p-4 bg-primary/5 rounded-lg gap-2 mt-2">
            <Text className="text-sm font-semibold text-foreground">
              {t("about")}
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              {t("psychologyTestsInfo")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
