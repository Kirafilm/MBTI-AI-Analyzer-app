import { Pressable, Text, View } from "react-native";
import { useI18n } from "@/lib/i18n-context";
import { getAdsterraSmartlinkUrl, openAdsterraSmartlink } from "@/lib/adsterra";
import { WEB_MAX_CONTENT_WIDTH } from "@/lib/web-layout";

type AdsterraSmartlinkProps = {
  /** Visual height of the sponsored slot */
  height?: number;
  /** Wider card for in-content / modal placements */
  variant?: "banner" | "card";
};

/**
 * Clickable Adsterra Smartlink placement.
 * Does not auto-redirect the page — user must tap the sponsored area.
 */
export function AdsterraSmartlink({ height = 90, variant = "banner" }: AdsterraSmartlinkProps) {
  const { language } = useI18n();
  const url = getAdsterraSmartlinkUrl();
  if (!url) return null;

  const sponsored =
    language === "en" ? "Sponsored" : language === "zh-CN" ? "赞助内容" : "贊助內容";
  const cta =
    language === "en"
      ? "Open offer"
      : language === "zh-CN"
        ? "查看优惠"
        : "查看優惠";
  const hint =
    language === "en"
      ? "Opens in a new tab · supports free quizzes"
      : language === "zh-CN"
        ? "将在新标签打开 · 支持免费测验"
        : "將在新分頁開啟 · 支持免費測驗";

  const minHeight = variant === "card" ? Math.max(height, 180) : height;

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={cta}
      onPress={openAdsterraSmartlink}
      style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1, width: "100%" }]}
    >
      <View
        style={{
          minHeight,
          width: "100%",
          maxWidth: variant === "card" ? 420 : WEB_MAX_CONTENT_WIDTH,
          alignSelf: "center",
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "#d7e3ea",
          backgroundColor: "#f3f8fb",
          paddingHorizontal: 16,
          paddingVertical: variant === "card" ? 20 : 10,
          justifyContent: "center",
          gap: 6,
        }}
      >
        <Text style={{ fontSize: 11, fontWeight: "700", color: "#64748b", letterSpacing: 0.6 }}>
          {sponsored.toUpperCase()}
        </Text>
        <Text style={{ fontSize: variant === "card" ? 17 : 15, fontWeight: "700", color: "#0a7ea4" }}>
          {cta}
        </Text>
        {variant === "card" ? (
          <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 18 }}>{hint}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}
