import { Pressable, Text, View } from "react-native";
import { Link, type Href } from "expo-router";
import { useI18n } from "@/lib/i18n-context";
import { WEB_MAX_CONTENT_WIDTH } from "@/lib/web-layout";
import { WebBannerAd } from "@/components/web-banner-ad";

const APP_LINKS = [
  { href: "/about" as Href, label: "About" },
  { href: "/mbti-guide" as Href, label: "MBTI Guide" },
  { href: "/types" as Href, label: "16 型人格" },
  { href: "/psychology-list" as const, labelKey: "psychologyTests" as const },
  { href: "/history" as const, labelKey: "history" as const },
  { href: "/contact-us" as const, labelKey: "contactUs" as const },
] as const;

export function WebFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <View className="w-full border-t border-border bg-surface mt-auto">
      <View
        className="w-full mx-auto px-4 md:px-6 py-1"
        style={{ maxWidth: WEB_MAX_CONTENT_WIDTH }}
      >
        <WebBannerAd />
      </View>
      <View
        className="w-full mx-auto px-4 md:px-6 py-4 gap-3"
        style={{ maxWidth: WEB_MAX_CONTENT_WIDTH }}
      >
        <View className="flex-row flex-wrap gap-4 justify-between items-start">
          <View className="gap-1 max-w-xs">
            <Text className="text-sm font-bold text-foreground">MBTI AI Analyzer</Text>
            <Text className="text-xs text-muted leading-5">{t("appSubtitle")}</Text>
          </View>

          <View className="flex-row flex-wrap gap-6">
            <View className="gap-1.5" style={{ maxWidth: 320 }}>
              <Text className="text-[11px] font-semibold text-muted uppercase tracking-wide">
                App
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: 300,
                  rowGap: 6,
                }}
              >
                {APP_LINKS.map((item) => {
                  const label = "label" in item ? item.label : t(item.labelKey);
                  return (
                    <View key={String(item.href)} style={{ width: "33.33%", paddingRight: 8 }}>
                      <Link href={item.href as Href} asChild>
                        <Pressable>
                          <Text className="text-sm text-foreground" numberOfLines={1}>
                            {label}
                          </Text>
                        </Pressable>
                      </Link>
                    </View>
                  );
                })}
              </View>
            </View>

            <View className="gap-1.5">
              <Text className="text-[11px] font-semibold text-muted uppercase tracking-wide">
                Legal
              </Text>
              <View className="gap-1">
                <Link href="/privacy-policy" asChild>
                  <Pressable>
                    <Text className="text-sm text-foreground">{t("privacyPolicy")}</Text>
                  </Pressable>
                </Link>
                <Link href="/terms-of-service" asChild>
                  <Pressable>
                    <Text className="text-sm text-foreground">{t("termsOfService")}</Text>
                  </Pressable>
                </Link>
                <Link href="/contact-us" asChild>
                  <Pressable>
                    <Text className="text-sm text-foreground">{t("contactUs")}</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </View>

        <Text className="text-[11px] text-muted text-center pt-2 border-t border-border">
          © {year} MBTI AI Analyzer
        </Text>
      </View>
    </View>
  );
}
