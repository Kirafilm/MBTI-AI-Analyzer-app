import { Pressable, ScrollView, Text, View } from "react-native";
import { Link, useRouter, type Href } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { SeoHead } from "@/components/seo-head";
import { allMbtiTypePages } from "@/shared/mbti-type-pages";
import { articleJsonLd } from "@/lib/seo";

export default function MbtiTypesIndexPage() {
  const router = useRouter();
  const pages = allMbtiTypePages();
  const title = "MBTI 16型人格總覽｜特質、職業與自由職方向";
  const description =
    "一次掌握 MBTI 16 型人格：INTJ、ENFP、INFP 等類型的核心特質、優勢弱點、適合職業與自由職建議。";

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        path="/types"
        type="article"
        jsonLd={articleJsonLd({ title, description, path: "/types" })}
      />
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, gap: 20 }}>
          <Pressable onPress={() => router.back()}>
            <Text className="text-primary text-sm font-semibold">← 返回</Text>
          </Pressable>

          <View className="gap-3">
            <Text accessibilityRole="header" className="text-3xl font-bold text-foreground">
              MBTI 16 型人格總覽
            </Text>
            <Text className="text-base text-muted leading-relaxed">
              想找「INTJ 是什麼」「ENFP 適合什麼工作」這類長尾資訊？從下方進入各類型詳解，並可免費開始 MBTI 測驗。
            </Text>
            <Link href="/(tabs)/mbti-quiz" asChild>
              <Pressable className="self-start bg-primary rounded-xl px-5 py-3">
                <Text className="text-white font-semibold">開始免費 MBTI 測驗</Text>
              </Pressable>
            </Link>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {pages.map((page) => (
              <Link key={page.slug} href={`/types/${page.slug}` as Href} asChild>
                <Pressable
                  className="rounded-2xl border border-border bg-surface p-4 gap-1"
                  style={{ width: "47%", minWidth: 150, flexGrow: 1 }}
                >
                  <Text className="text-xl font-bold text-primary">{page.code}</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {page.nickname} · {page.englishName}
                  </Text>
                  <Text className="text-xs text-muted leading-relaxed" numberOfLines={3}>
                    {page.summary}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </ScrollView>
      </ScreenContainer>
    </>
  );
}
