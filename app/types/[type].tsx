import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { Link, useLocalSearchParams, useRouter, type Href } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { SeoHead } from "@/components/seo-head";
import {
  allMbtiTypePages,
  getMbtiTypePage,
  MBTI_TYPE_SLUGS,
} from "@/shared/mbti-type-pages";
import { articleJsonLd, faqJsonLd } from "@/lib/seo";
import { paramToString } from "@/lib/route-params";

export function generateStaticParams() {
  return MBTI_TYPE_SLUGS.map((type) => ({ type }));
}

export default function MbtiTypeDetailPage() {
  const router = useRouter();
  const raw = useLocalSearchParams<{ type?: string | string[] }>();
  const slug = (paramToString(raw.type) || "").toLowerCase();
  const page = getMbtiTypePage(slug);

  if (!page) {
    return (
      <ScreenContainer className="items-center justify-center gap-3">
        <SeoHead title="找不到此人格類型" path={`/types/${slug || "unknown"}`} noIndex />
        <Text className="text-foreground text-lg font-semibold">找不到此人格類型</Text>
        <Link href={"/types" as Href} asChild>
          <Pressable>
            <Text className="text-primary font-semibold">查看 16 型總覽</Text>
          </Pressable>
        </Link>
      </ScreenContainer>
    );
  }

  const title = `${page.code} ${page.nickname}是什麼？特質、職業與自由職建議`;
  const description = `${page.summary} 了解 ${page.code} 優勢弱點、適合工作，以及自由職／接案方向。`;
  const path = `/types/${page.slug}`;
  const others = allMbtiTypePages().filter((item) => item.slug !== page.slug).slice(0, 8);

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        path={path}
        type="article"
        jsonLd={[
          articleJsonLd({ title, description, path }),
          faqJsonLd(page.faqs),
        ]}
      />
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48, gap: 24 }}>
          <Pressable onPress={() => router.push("/types" as Href)}>
            <Text className="text-primary text-sm font-semibold">← 16 型總覽</Text>
          </Pressable>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-primary">
              {page.code} · {page.englishName}
            </Text>
            <Text accessibilityRole="header" className="text-3xl font-bold text-foreground leading-tight">
              {page.code}（{page.nickname}）是什麼？
            </Text>
            <Text className="text-base text-muted leading-relaxed">{page.summary}</Text>
            <View className="flex-row flex-wrap gap-3 pt-1">
              <Link href="/(tabs)/mbti-quiz" asChild>
                <Pressable className="bg-primary rounded-xl px-5 py-3">
                  <Text className="text-white font-semibold">免費測測看是不是 {page.code}</Text>
                </Pressable>
              </Link>
              <Pressable
                className="border border-primary rounded-xl px-5 py-3"
                onPress={() => void Linking.openURL("https://hyphenjob.com")}
              >
                <Text className="text-primary font-semibold">探索自由職機會</Text>
              </Pressable>
            </View>
          </View>

          <Section title={`${page.code} 四個字母怎麼讀`}>
            <View className="gap-3">
              {page.letters.map((item) => (
                <View key={item.letter} className="rounded-2xl border border-border bg-surface p-4 gap-1">
                  <Text className="text-base font-bold text-foreground">
                    {item.letter} — {item.title}
                  </Text>
                  <Text className="text-sm text-muted leading-relaxed">{item.text}</Text>
                </View>
              ))}
            </View>
          </Section>

          <Section title="核心優勢">
            <BulletList items={page.strengths} />
          </Section>

          <Section title="需要留意的弱點">
            <BulletList items={page.weaknesses} />
          </Section>

          <Section title={`${page.code} 適合什麼工作？`}>
            <BulletList items={page.careers} />
          </Section>

          <Section title="自由職／接案方向">
            <Text className="text-sm text-foreground leading-relaxed">{page.freelance}</Text>
            <Text className="text-sm text-muted leading-relaxed mt-2">
              想把性格優勢變成案件？可到{" "}
              <Text
                className="text-primary font-semibold"
                onPress={() => void Linking.openURL("https://hyphenjob.com")}
              >
                hyphenjob.com
              </Text>{" "}
              瀏覽自由職與接案機會。
            </Text>
          </Section>

          <Section title="相處與配對參考">
            <Text className="text-sm text-foreground leading-relaxed">{page.pairs}</Text>
          </Section>

          <Section title="知名形象（趣味參考）">
            <Text className="text-sm text-foreground leading-relaxed">{page.famous}</Text>
          </Section>

          <Section title="常見問題">
            <View className="gap-4">
              {page.faqs.map((faq) => (
                <View key={faq.question} className="gap-1">
                  <Text className="text-base font-semibold text-foreground">{faq.question}</Text>
                  <Text className="text-sm text-muted leading-relaxed">{faq.answer}</Text>
                </View>
              ))}
            </View>
          </Section>

          <Section title="其他人格類型">
            <View className="flex-row flex-wrap gap-2">
              {others.map((item) => (
                <Link key={item.slug} href={`/types/${item.slug}` as Href} asChild>
                  <Pressable className="px-3 py-2 rounded-lg border border-border bg-background">
                    <Text className="text-sm font-semibold text-primary">{item.code}</Text>
                  </Pressable>
                </Link>
              ))}
              <Link href={"/types" as Href} asChild>
                <Pressable className="px-3 py-2 rounded-lg bg-primary/10">
                  <Text className="text-sm font-semibold text-primary">全部 16 型 →</Text>
                </Pressable>
              </Link>
            </View>
          </Section>

          <Text className="text-xs text-muted leading-relaxed">
            聲明：MBTI 是性格偏好探索工具，並非醫學或心理疾病診斷。結果請作為自我認識與職涯討論的起點。
          </Text>
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text accessibilityRole="header" className="text-xl font-bold text-foreground">
        {title}
      </Text>
      {children}
    </View>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View className="gap-2">
      {items.map((item) => (
        <Text key={item} className="text-sm text-foreground leading-relaxed">
          • {item}
        </Text>
      ))}
    </View>
  );
}
