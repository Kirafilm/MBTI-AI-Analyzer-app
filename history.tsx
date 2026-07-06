import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import type { MBTIResult } from "@/shared/types";
import { getMBTIResults, deleteMBTIResult } from "@/lib/storage";
import * as Haptics from "expo-haptics";

export default function HistoryScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const colors = useColors();
  const [results, setResults] = useState<MBTIResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setIsLoading(true);
      const data = await getMBTIResults();
      // 按日期倒序排列（最新的在前）
      setResults(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error("Error loading results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectResult = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleViewResult = async (resultId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/(tabs)/mbti-result",
      params: { resultId },
    });
  };

  const handleCompare = async () => {
    if (selectedIds.size !== 2) {
      alert(t("selectToCompare"));
      return;
    }
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const ids = Array.from(selectedIds);
    const id1 = ids[0] ?? "";
    const id2 = ids[1] ?? "";
    router.push({
      pathname: "/(tabs)/comparison",
      params: { resultId1: id1, resultId2: id2 },
    });
  };

  const handleDeleteResult = async (resultId: string) => {
    try {
      await deleteMBTIResult(resultId);
      setResults(results.filter((r) => r.id !== resultId));
      const newSelected = new Set(selectedIds);
      newSelected.delete(resultId);
      setSelectedIds(newSelected);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (err) {
      console.error("Error deleting result:", err);
      alert(t("failed"));
    }
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <View className="gap-3 items-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="text-foreground text-sm">{t("loading")}</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (results.length === 0) {
    return (
      <ScreenContainer className="items-center justify-center p-6">
        <View className="gap-4 items-center">
          <Text className="text-2xl font-bold text-foreground">{t("noHistory")}</Text>
          <Text className="text-sm text-muted text-center">
            {t("startFirstQuiz")}
          </Text>
          <Pressable
            onPress={() => router.push("/(tabs)/mbti-quiz")}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View className="px-6 py-3 bg-primary rounded-lg">
              <Text className="text-background font-semibold">{t("startQuiz")}</Text>
            </View>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">{t("history")}</Text>
            <Text className="text-sm text-muted">{results.length} {t("of")}</Text>
          </View>

          {/* Results List */}
          <View className="gap-3">
            {results.map((result) => {
              const resultId = result.id ?? "";
              const isSelected = selectedIds.has(resultId);
              return (
                <Pressable
                  key={resultId}
                  onPress={() => handleSelectResult(resultId)}
                  onLongPress={() => handleViewResult(resultId)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                >
                  <View
                    className={`p-4 rounded-lg border-2 gap-3 ${
                      isSelected ? "border-primary bg-primary/10" : "border-border bg-surface"
                    }`}
                  >
                    {/* Top Row */}
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className="text-2xl font-bold text-primary">{result.type}</Text>
                        <Text className="text-xs text-muted mt-1">
                          {new Date(result.createdAt).toLocaleDateString("zh-HK", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </View>
                      {/* Checkbox */}
                      <View
                        className={`w-6 h-6 rounded border-2 items-center justify-center ${
                          isSelected ? "bg-primary border-primary" : "border-border"
                        }`}
                      >
                        {isSelected && <Text className="text-background font-bold">✓</Text>}
                      </View>
                    </View>

                    {/* Dimensions */}
                    <View className="gap-2">
                      {[
                        { label: "E-I", value: result.scores.EI },
                        { label: "S-N", value: result.scores.SN },
                        { label: "T-F", value: result.scores.TF },
                        { label: "J-P", value: result.scores.JP },
                      ].map((dim, idx) => (
                        <View key={idx} className="flex-row items-center gap-2">
                          <Text className="text-xs text-muted w-8">{dim.label}</Text>
                          <View className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                            <View
                              className="h-full bg-primary"
                              style={{ width: `${dim.value}%` }}
                            />
                          </View>
                          <Text className="text-xs text-muted w-8 text-right">{dim.value}%</Text>
                        </View>
                      ))}
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row gap-2 pt-2">
                      <Pressable
                        onPress={() => handleViewResult(resultId)}
                        style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.8 : 1 }]}
                      >
                        <View className="p-2 bg-primary/20 rounded items-center">
                          <Text className="text-xs font-semibold text-primary">{t("viewAnalysis")}</Text>
                        </View>
                      </Pressable>
                      <Pressable
                        onPress={() => handleDeleteResult(resultId)}
                        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                      >
                        <View className="p-2 bg-error/20 rounded px-3">
                          <Text className="text-xs font-semibold text-error">{t("delete")}</Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Compare Button */}
          {selectedIds.size === 2 && (
            <Pressable
              onPress={handleCompare}
              style={({ pressed }) => [
                { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
              ]}
            >
              <View className="w-full bg-primary rounded-lg p-4 items-center">
                <Text className="text-background font-semibold text-base">
                  {t("compare")} 2 {t("of")}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
