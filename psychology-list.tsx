import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useI18n } from "@/lib/i18n-context";
import { ALL_PSYCHOLOGY_TESTS } from "@/shared/psychology-tests-data";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";

export default function PsychologyListScreen() {
  const router = useRouter();
  const { language } = useI18n();
  const colors = useColors();

  const getTestName = (test: typeof ALL_PSYCHOLOGY_TESTS[0]) => {
    switch (language) {
      case "zh-TW":
        return test.nameZh;
      case "zh-CN":
        return test.nameZhSimplified;
      case "en":
        return test.name;
      default:
        return test.nameZh;
    }
  };

  const getTestDescription = (test: typeof ALL_PSYCHOLOGY_TESTS[0]) => {
    switch (language) {
      case "zh-TW":
        return test.descriptionZh;
      case "zh-CN":
        return test.descriptionZhSimplified;
      case "en":
        return test.description;
      default:
        return test.descriptionZh;
    }
  };

  const handleStartTest = async (testId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/(tabs)/psychology-quiz",
      params: { testId },
    });
  };

  const renderTestCard = ({ item }: { item: typeof ALL_PSYCHOLOGY_TESTS[0] }) => (
    <Pressable
      onPress={() => handleStartTest(item.id)}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
    >
      <View className="bg-surface rounded-2xl p-4 mb-3 border border-border">
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground">
              {getTestName(item)}
            </Text>
            <Text className="text-xs text-muted mt-1">
              {item.questions.length} 道題目
            </Text>
          </View>
          <MaterialIcons name="arrow-forward" size={20} color={colors.primary} />
        </View>
        <Text className="text-sm text-muted leading-relaxed">
          {getTestDescription(item)}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-8">
          {/* Header */}
          <View className="gap-2 pt-2">
            <Text className="text-2xl font-bold text-foreground">
              心理測驗
            </Text>
            <Text className="text-sm text-muted">
              探索你的心理狀態，了解自己
            </Text>
          </View>

          {/* Tests List */}
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
