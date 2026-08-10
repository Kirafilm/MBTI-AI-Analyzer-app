import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { SeoHead } from "@/components/seo-head";
import { useI18n } from "@/lib/i18n-context";
import { ALL_PSYCHOLOGY_TESTS } from "@/psychology-tests-data";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { showPsychologyTestAd } from "@/lib/psychology-ad-gate";
import { WEB_MAX_CONTENT_WIDTH } from "@/lib/web-layout";

/**
 * Web psychology list — document scroll (no nested RN ScrollView).
 */
export default function PsychologyListScreen() {
  const router = useRouter();
  const { language } = useI18n();
  const colors = useColors();
  const isStartingRef = useRef(false);

  const getTestName = (test: (typeof ALL_PSYCHOLOGY_TESTS)[0]) => {
    if (language === "zh-CN") return test.nameZhSimplified;
    if (language === "en") return test.name;
    return test.nameZh;
  };

  const getTestDescription = (test: (typeof ALL_PSYCHOLOGY_TESTS)[0]) => {
    if (language === "zh-CN") return test.descriptionZhSimplified;
    if (language === "en") return test.description;
    return test.descriptionZh;
  };

  const getQuestionCountLabel = (count: number) => {
    if (language === "zh-CN") return `${count} 道题目`;
    if (language === "en") return `${count} questions`;
    return `${count} 道題目`;
  };

  const getSubtitle = () => {
    return language === "en"
      ? "Explore your emotional state and know yourself better"
      : language === "zh-CN"
        ? "探索你的心理状态，了解自己"
        : "探索你的心理狀態，了解自己";
  };

  const handleStartTest = async (testId: string) => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await showPsychologyTestAd();
      router.push({
        pathname: "/(tabs)/psychology-quiz",
        params: { testId },
      });
    } finally {
      isStartingRef.current = false;
    }
  };

  return (
    <ScreenContainer className="p-4">
      <SeoHead
        title="心理測驗總覽｜情緒、焦慮與自我探索"
        description="免費心理測驗列表：壓力、情緒、焦慮、自我認識等短測，搭配 MBTI 性格測驗一起探索自己。"
        path="/psychology-list"
      />
      <View
        className="w-full mx-auto gap-4 pb-10"
        style={{ maxWidth: WEB_MAX_CONTENT_WIDTH, width: "100%" }}
      >
        <View className="gap-2 pt-2">
          <Text accessibilityRole="header" className="text-2xl font-bold text-foreground">
            {language === "en" ? "Psychology Tests" : language === "zh-CN" ? "心理测验" : "心理測驗"}
          </Text>
          <Text className="text-sm text-muted">{getSubtitle()}</Text>
        </View>

        {ALL_PSYCHOLOGY_TESTS.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              void handleStartTest(item.id);
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
          >
            <View className="rounded-2xl p-4 border bg-surface border-border">
              <View className="flex-row items-start justify-between mb-2 gap-3">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-foreground">{getTestName(item)}</Text>
                  <Text className="text-xs text-muted mt-1">
                    {getQuestionCountLabel(item.questions.length)}
                  </Text>
                </View>
                <MaterialIcons name="arrow-forward" size={20} color={colors.primary} />
              </View>
              <Text className="text-sm text-muted leading-relaxed">{getTestDescription(item)}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}
