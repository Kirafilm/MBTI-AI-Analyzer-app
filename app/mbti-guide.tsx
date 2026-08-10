import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter, Stack, Link, type Href } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { SeoHead } from "@/components/seo-head";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import * as Haptics from "expo-haptics";

const TYPES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

export default function MbtiGuideScreen() {
  const router = useRouter();
  const colors = useColors();
  const { language } = useI18n();

  const isEn = language === "en";
  const isCn = language === "zh-CN";

  const title = isEn ? "MBTI Guide" : isCn ? "MBTI 指南" : "MBTI 指南";
  const intro = isEn
    ? "The Myers-Briggs Type Indicator (MBTI) framework describes preferred ways of focusing attention, taking in information, making decisions, and organizing life. It is a self-reflection model popular in career and team workshops. It is not a clinical diagnosis."
    : isCn
      ? "迈尔斯-布里格斯类型指标（MBTI）框架描述人们在注意力、信息接收、决策与生活安排上的偏好。它常见于职场与团队工作坊，用于自我反思，不是临床诊断工具。"
      : "Myers-Briggs 類型指標（MBTI）框架描述人們在注意力、資訊接收、決策與生活安排上的偏好。它常見於職場與團隊工作坊，用於自我反思，不是臨床診斷工具。";

  const dimsTitle = isEn ? "Four preference pairs" : isCn ? "四个偏好维度" : "四個偏好維度";
  const dims = isEn
    ? [
        "E / I — Extraversion vs Introversion: where you recharge energy.",
        "S / N — Sensing vs Intuition: how you prefer to gather information.",
        "T / F — Thinking vs Feeling: how you prefer to decide.",
        "J / P — Judging vs Perceiving: how you prefer structure vs flexibility.",
      ]
    : isCn
      ? [
          "E / I — 外向与内向：你从何处补充精力。",
          "S / N — 实感与直觉：你偏好如何收集信息。",
          "T / F — 思考与情感：你偏好如何做决定。",
          "J / P — 判断与感知：你偏好结构还是弹性。",
        ]
      : [
          "E / I — 外向與內向：你從何處補充精力。",
          "S / N — 實感與直覺：你偏好如何收集資訊。",
          "T / F — 思考與情感：你偏好如何做決定。",
          "J / P — 判斷與感知：你偏好結構還是彈性。",
        ];

  const howTitle = isEn ? "How to use this site" : isCn ? "如何使用本站" : "如何使用本站";
  const howBody = isEn
    ? "Start the 70-item quiz, review your four-letter result, then optionally open AI personality analysis for a longer written explanation. You can also explore psychology-inspired quizzes. Results stay on your device unless you sign in for account features."
    : isCn
      ? "完成 70 题测验后查看四字类型结果，也可开启 AI 性格分析获得更长文字解读。你还可以探索心理测验。结果默认保存在本机；登录后才有账号相关功能。"
      : "完成 70 題測驗後查看四字類型結果，亦可開啟 AI 性格分析獲得更長文字解讀。你還可以探索心理測驗。結果預設保存在本機；登入後才有帳號相關功能。";

  const faqTitle = isEn ? "FAQ" : isCn ? "常见问题" : "常見問題";
  const faqs = isEn
    ? [
        {
          q: "Is my type permanent?",
          a: "Preferences can shift with life stage and context. Treat results as a snapshot for reflection, not a fixed label.",
        },
        {
          q: "Is AI analysis scientific proof?",
          a: "No. AI text summarizes common themes associated with a type code. Use it as inspiration, then compare with your real experience.",
        },
        {
          q: "Why are there ads?",
          a: "Ads fund free access to the quiz and tools. See Privacy Policy for Adsterra (web).",
        },
        {
          q: "Can I delete my data?",
          a: "Clear local app/site storage to remove on-device results. For account deletion requests, contact us.",
        },
      ]
    : isCn
      ? [
          {
            q: "类型会永久不变吗？",
            a: "偏好会随人生阶段与情境变化。请把结果当作反思快照，而不是固定标签。",
          },
          {
            q: "AI 分析是科学证明吗？",
            a: "不是。AI 文字整理该类型常见主题，供启发参考，请对照你的真实经验。",
          },
          {
            q: "为什么有广告？",
            a: "广告支持免费测验与工具。详见隐私政策中的 Adsterra（网页）。",
          },
          {
            q: "如何删除数据？",
            a: "清除本机网站/App 存储可删除本地结果。账号删除请求请联系我们。",
          },
        ]
      : [
          {
            q: "類型會永久不變嗎？",
            a: "偏好會隨人生階段與情境變化。請把結果當作反思快照，而不是固定標籤。",
          },
          {
            q: "AI 分析是科學證明嗎？",
            a: "不是。AI 文字整理該類型常見主題，供啟發參考，請對照你的真實經驗。",
          },
          {
            q: "為什麼有廣告？",
            a: "廣告支持免費測驗與工具。詳見私隱政策中的 Adsterra（網頁）。",
          },
          {
            q: "如何刪除資料？",
            a: "清除本機網站/App 儲存可刪除本地結果。帳號刪除請求請聯絡我們。",
          },
        ];

  const typesTitle = isEn ? "Sixteen type codes" : isCn ? "十六种类型代码" : "十六種類型代碼";

  return (
    <>
      <SeoHead
        title="MBTI 指南｜16型人格、維度解讀與測驗說明"
        description="用繁中說明 MBTI 四個維度、16 型人格代碼，以及如何開始免費測驗。含常見問題與職涯探索提示。"
        path="/mbti-guide"
      />
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer className="p-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 48 }} showsVerticalScrollIndicator={false}>
          <View className="gap-6">
            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.back();
                }}
              >
                <View className="p-2 rounded-lg bg-surface border border-border">
                  <MaterialIcons name="arrow-back" size={20} color={colors.text} />
                </View>
              </Pressable>
              <Text accessibilityRole="header" className="text-2xl font-bold text-foreground flex-1">
                {title}
              </Text>
            </View>

            <Text className="text-sm text-foreground leading-relaxed">{intro}</Text>

            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">{dimsTitle}</Text>
              {dims.map((line) => (
                <Text key={line} className="text-sm text-foreground leading-relaxed">
                  • {line}
                </Text>
              ))}
            </View>

            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">{howTitle}</Text>
              <Text className="text-sm text-foreground leading-relaxed">{howBody}</Text>
              <Link href="/(tabs)/mbti-quiz" asChild>
                <Pressable>
                  <Text className="text-sm font-semibold text-primary">
                    {isEn ? "Start the quiz →" : isCn ? "开始测验 →" : "開始測驗 →"}
                  </Text>
                </Pressable>
              </Link>
            </View>

            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">{typesTitle}</Text>
              <View className="flex-row flex-wrap gap-2">
                {TYPES.map((code) => (
                  <Link key={code} href={`/types/${code.toLowerCase()}` as Href} asChild>
                    <Pressable className="px-3 py-2 rounded-lg border border-border bg-surface">
                      <Text className="text-sm font-semibold text-primary">{code}</Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
              <Link href={"/types" as Href} asChild>
                <Pressable>
                  <Text className="text-sm font-semibold text-primary">
                    {isEn ? "Browse all type pages →" : isCn ? "查看全部类型详解 →" : "查看全部類型詳解 →"}
                  </Text>
                </Pressable>
              </Link>
            </View>

            <View className="gap-4">
              <Text className="text-lg font-semibold text-foreground">{faqTitle}</Text>
              {faqs.map((item) => (
                <View key={item.q} className="gap-1">
                  <Text className="text-sm font-semibold text-foreground">{item.q}</Text>
                  <Text className="text-sm text-foreground leading-relaxed">{item.a}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    </>
  );
}
