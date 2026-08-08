import { Pressable, Text, View } from "react-native";
import { useI18n } from "@/lib/i18n-context";
import { getAdsterraSmartlinkUrl, openAdsterraSmartlink } from "@/lib/adsterra";
import { WEB_MAX_CONTENT_WIDTH } from "@/lib/web-layout";

type AdsterraSmartlinkProps = {
  /** Visual height of the sponsored slot (card variant) */
  height?: number;
  /** Compact footer strip vs larger in-content card */
  variant?: "banner" | "card";
};

/**
 * Clickable Adsterra Smartlink placement.
 * Does not auto-redirect the page — user must tap the sponsored area.
 */
export function AdsterraSmartlink({ height = 180, variant = "banner" }: AdsterraSmartlinkProps) {
  const { language } = useI18n();
  const url = getAdsterraSmartlinkUrl();
  if (!url) return null;

  const sponsored =
    language === "en" ? "Sponsored" : language === "zh-CN" ? "赞助" : "贊助";
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

  if (variant === "banner") {
    return (
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={cta}
        onPress={openAdsterraSmartlink}
        style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1, width: "100%" }]}
      >
        <View
          style={{
            width: "100%",
            maxWidth: WEB_MAX_CONTENT_WIDTH,
            alignSelf: "center",
            minHeight: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#d7e3ea",
            backgroundColor: "#f3f8fb",
            paddingHorizontal: 14,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flexShrink: 1 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", color: "#94a3b8" }}>
              {sponsored}
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "700", color: "#0a7ea4", flexShrink: 1 }}
              numberOfLines={1}
            >
              {cta}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#0a7ea4" }}>→</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={cta}
      onPress={openAdsterraSmartlink}
      style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1, width: "100%" }]}
    >
      <View
        style={{
          minHeight: height,
          width: "100%",
          maxWidth: 420,
          alignSelf: "center",
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "#d7e3ea",
          backgroundColor: "#f3f8fb",
          paddingHorizontal: 16,
          paddingVertical: 16,
          justifyContent: "center",
          gap: 6,
        }}
      >
        <Text style={{ fontSize: 11, fontWeight: "700", color: "#64748b", letterSpacing: 0.6 }}>
          {sponsored.toUpperCase()}
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#0a7ea4" }}>{cta}</Text>
        <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 18 }}>{hint}</Text>
      </View>
    </Pressable>
  );
}
