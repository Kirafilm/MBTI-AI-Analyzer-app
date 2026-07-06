import { useRef } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { ALL_PSYCHOLOGY_TESTS } from "@/psychology-tests-data";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { showPsychologyTestAd } from "@/lib/psychology-ad-gate";

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

  const renderTestCard = ({ item }: { item: (typeof ALL_PSYCHOLOGY_TESTS)[0] }) => (
    <Pressable
      onPress={() => {
        void handleStartTest(item.id);
      }}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      <View className="rounded-2xl p-4 mb-3 border bg-surface border-border">
        <View className="flex-row items-start justify-between mb-2 gap-3">
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold text-foreground">{getTestName(item)}</Text>
            </View>
            <Text className="text-xs text-muted mt-1">{getQuestionCountLabel(item.questions.length)}</Text>
          </View>
          <MaterialIcons name="arrow-forward" size={20} color={colors.primary} />
        </View>
        <Text className="text-sm text-muted leading-relaxed">{getTestDescription(item)}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-8">
          <View className="gap-2 pt-2">
            <Text className="text-2xl font-bold text-foreground">
              {language === "en" ? "Psychology Tests" : language === "zh-CN" ? "心理测验" : "心理測驗"}
            </Text>
            <Text className="text-sm text-muted">{getSubtitle()}</Text>
          </View>

          <FlatList
            data={ALL_PSYCHOLOGY_TESTS}
            renderItem={renderTestCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
