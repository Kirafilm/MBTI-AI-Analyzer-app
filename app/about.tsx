import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";
import * as Haptics from "expo-haptics";

export default function AboutScreen() {
  const router = useRouter();
  const colors = useColors();
  const { language } = useI18n();

  const copy =
    language === "en"
      ? {
          title: "About MBTI AI Analyzer",
          sections: [
            {
              h: "What this product is",
              p: "MBTI AI Analyzer is a personality exploration tool. We offer a structured MBTI-style questionnaire, optional AI-assisted interpretation, and a library of psychology-inspired quizzes. Our goal is to help people reflect on preferences in communication, decision-making, and daily energy—not to replace professional psychological assessment.",
            },
            {
              h: "How the quiz works",
              p: "The core quiz contains carefully written statements across four preference dimensions commonly used in MBTI discussions: Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, and Judging/Perceiving. Your answers are scored locally first, then you can optionally request an AI-written explanation of strengths, challenges, relationships, and work style.",
            },
            {
              h: "Advertising & sustainability",
              p: "The free experience is supported by advertising. On the website we may show Adsterra units. Ads help keep the core quiz free. You can review details in our Privacy Policy.",
            },
            {
              h: "Privacy stance",
              p: "Quiz results are stored on your device by default. Account features use Supabase authentication when you sign in. We do not sell your answers as a mailing list. See the Privacy Policy for processors such as Supabase and Adsterra.",
            },
            {
              h: "Contact",
              p: "Questions, feedback, or data requests: use Contact Us in the app/site footer, or email hyphe.office@gmail.com.",
            },
          ],
        }
      : language === "zh-CN"
        ? {
            title: "关于 MBTI AI Analyzer",
            sections: [
              {
                h: "产品是什么",
                p: "MBTI AI Analyzer 是性格探索工具。我们提供结构化的 MBTI 风格问卷、可选的 AI 解读，以及心理测验题库。目标是帮助你思考沟通、决策与精力偏好，不能替代专业心理评估。",
              },
              {
                h: "测验如何运作",
                p: "核心测验包含四个常见偏好维度：外向/内向、实感/直觉、思考/情感、判断/感知。答案会先在本地计分；你也可选择生成 AI 文字解读，涵盖优势、挑战、人际关系与工作风格。",
              },
              {
                h: "广告与运营",
                p: "免费体验由广告支持。网页版可能展示 Adsterra。详情见隐私政策。",
              },
              {
                h: "隐私立场",
                p: "测验结果默认保存在你的装置。登录功能使用 Supabase。我们不会把你的答案当作名单出售。隐私政策说明了 Supabase、Adsterra 等处理方。",
              },
              {
                h: "联系我们",
                p: "意见或资料请求：使用页脚「联系我们」，或电邮 hyphe.office@gmail.com。",
              },
            ],
          }
        : {
            title: "關於 MBTI AI Analyzer",
            sections: [
              {
                h: "產品是什麼",
                p: "MBTI AI Analyzer 是性格探索工具。我們提供結構化的 MBTI 風格問卷、可選的 AI 解讀，以及心理測驗題庫。目標是幫助你思考溝通、決策與精力偏好，不能替代專業心理評估。",
              },
              {
                h: "測驗如何運作",
                p: "核心測驗包含四個常見偏好維度：外向/內向、實感/直覺、思考/情感、判斷/感知。答案會先在本地計分；你亦可選擇生成 AI 文字解讀，涵蓋優勢、挑戰、人際關係與工作風格。",
              },
              {
                h: "廣告與營運",
                p: "免費體驗由廣告支持。網頁版可能展示 Adsterra。詳情見私隱政策。",
              },
              {
                h: "私隱立場",
                p: "測驗結果預設保存在你的裝置。登入功能使用 Supabase。我們不會把你的答案當作名單出售。私隱政策說明了 Supabase、Adsterra 等處理方。",
              },
              {
                h: "聯絡我們",
                p: "意見或資料請求：使用頁腳「聯絡我們」，或電郵 hyphe.office@gmail.com。",
              },
            ],
          };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer className="p-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <View className="gap-6">
            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.back();
                }}
                accessibilityRole="button"
              >
                <View className="p-2 rounded-lg bg-surface border border-border">
                  <MaterialIcons name="arrow-back" size={20} color={colors.text} />
                </View>
              </Pressable>
              <Text className="text-2xl font-bold text-foreground flex-1">{copy.title}</Text>
            </View>

            {copy.sections.map((section) => (
              <View key={section.h} className="gap-2">
                <Text className="text-lg font-semibold text-foreground">{section.h}</Text>
                <Text className="text-sm text-foreground leading-relaxed">{section.p}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScreenContainer>
    </>
  );
}
