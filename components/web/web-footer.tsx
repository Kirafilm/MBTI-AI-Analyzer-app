import { Pressable, Text, View } from "react-native";
import { Link, type Href } from "expo-router";
import { useI18n } from "@/lib/i18n-context";
import { WEB_MAX_CONTENT_WIDTH } from "@/lib/web-layout";
import { WebBannerAd } from "@/components/web-banner-ad";

export function WebFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <View className="w-full border-t border-border bg-surface mt-auto">
      <View
        className="w-full mx-auto px-4 md:px-6 py-2"
        style={{ maxWidth: WEB_MAX_CONTENT_WIDTH }}
      >
        <WebBannerAd />
      </View>
      <View
        className="w-full mx-auto px-4 md:px-6 py-8 gap-6"
        style={{ maxWidth: WEB_MAX_CONTENT_WIDTH }}
      >
        <View className="flex-row flex-wrap gap-6 justify-between">
          <View className="gap-2 max-w-sm">
            <Text className="text-base font-bold text-foreground">MBTI AI Analyzer</Text>
            <Text className="text-sm text-muted leading-relaxed">{t("appSubtitle")}</Text>
          </View>
          <View className="flex-row flex-wrap gap-8">
            <View className="gap-2">
              <Text className="text-xs font-semibold text-muted uppercase tracking-wide">App</Text>
              <Link href={"/about" as Href} asChild>
                <Pressable>
                  <Text className="text-sm text-foreground">About</Text>
                </Pressable>
              </Link>
              <Link href={"/mbti-guide" as Href} asChild>
                <Pressable>
                  <Text className="text-sm text-foreground">MBTI Guide</Text>
                </Pressable>
              </Link>
              <Link href={"/types" as Href} asChild>
                <Pressable>
                  <Text className="text-sm text-foreground">16 型人格</Text>
                </Pressable>
              </Link>
              <Link href="/psychology-list" asChild>
                <Pressable>
                  <Text className="text-sm text-foreground">{t("psychologyTests")}</Text>
                </Pressable>
              </Link>
              <Link href="/history" asChild>
                <Pressable>
                  <Text className="text-sm text-foreground">{t("history")}</Text>
                </Pressable>
              </Link>
              <Link href="/contact-us" asChild>
                <Pressable>
                  <Text className="text-sm text-foreground">{t("contactUs")}</Text>
                </Pressable>
              </Link>
            </View>
            <View className="gap-2">
              <Text className="text-xs font-semibold text-muted uppercase tracking-wide">Legal</Text>
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
        <Text className="text-xs text-muted text-center pt-2 border-t border-border">
          © {year} MBTI AI Analyzer
        </Text>
      </View>
    </View>
  );
}
