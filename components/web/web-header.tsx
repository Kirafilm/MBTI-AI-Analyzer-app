import { useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { Link, usePathname, useRouter, type Href } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/lib/i18n-context";
import type { Language } from "@/shared/i18n";
import { isNavActive, WEB_MAX_CONTENT_WIDTH, WEB_NAV_LINKS } from "@/lib/web-layout";

const DESKTOP_NAV_MIN_WIDTH = 900;

const LANGUAGE_OPTIONS: { code: Language; label: string; sub: string }[] = [
  { code: "zh-TW", label: "繁體中文", sub: "Traditional Chinese" },
  { code: "zh-CN", label: "简体中文", sub: "Simplified Chinese" },
  { code: "en", label: "English", sub: "English" },
];

function LanguageMenu({
  language,
  menuTitle,
  onSelect,
  onClose,
}: {
  language: Language;
  menuTitle: string;
  onSelect: (lang: Language) => void;
  onClose: () => void;
}) {
  const colors = useColors();

  return (
    <>
      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        style={{ position: "fixed" as const, top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 }}
      />
      <View
        style={{
          position: "absolute",
          top: "100%",
          right: 0,
          marginTop: 12,
          zIndex: 50,
          minWidth: 220,
          padding: 12,
          gap: 10,
          backgroundColor: colors.background,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: colors.border,
          boxShadow: "0 16px 48px rgba(15, 23, 42, 0.14)",
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: "700",
            color: colors.muted,
            letterSpacing: 0.8,
            textTransform: "uppercase",
            paddingHorizontal: 4,
            paddingBottom: 2,
          }}
        >
          {menuTitle}
        </Text>

        {LANGUAGE_OPTIONS.map((option) => {
          const selected = language === option.code;
          return (
            <Pressable
              key={option.code}
              onPress={() => onSelect(option.code)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 14,
                paddingHorizontal: 14,
                borderRadius: 12,
                backgroundColor: selected ? `${colors.tint}14` : colors.surface,
                borderWidth: 1.5,
                borderColor: selected ? colors.tint : colors.border,
              }}
            >
              <View style={{ gap: 4, flex: 1, paddingRight: 12 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: selected ? colors.tint : colors.foreground,
                  }}
                >
                  {option.label}
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>{option.sub}</Text>
              </View>
              {selected ? (
                <MaterialIcons name="check-circle" size={22} color={colors.tint} />
              ) : (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor: colors.border,
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

function getLanguageShort(code: Language) {
  if (code === "zh-TW") return "繁";
  if (code === "zh-CN") return "简";
  return "EN";
}

export function WebHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const colors = useColors();
  const { width } = useWindowDimensions();
  const { t, language, setLanguage } = useI18n();
  const { isAuthenticated, user } = useAuth();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const showDesktopNav = width >= DESKTOP_NAV_MIN_WIDTH;

  const handleLanguage = async (lang: Language) => {
    await setLanguage(lang);
    setLangOpen(false);
  };

  const profileAction = () => {
    setMobileOpen(false);
    if (isAuthenticated) {
      router.push("/profile");
      return;
    }
    router.push("/auth/login");
  };

  return (
    <View className="w-full border-b border-border bg-background sticky top-0 z-30">
      <View
        className="w-full mx-auto px-4 md:px-6"
        style={{ maxWidth: WEB_MAX_CONTENT_WIDTH, paddingVertical: 16 }}
      >
        <View className="flex-row items-center w-full">
          {/* 左：Logo */}
          <View style={{ width: showDesktopNav ? 180 : 140, flexShrink: 0 }}>
            <Link href="/" asChild>
              <Pressable className="flex-row items-center gap-2">
                <View className="w-9 h-9 rounded-xl bg-primary items-center justify-center">
                  <MaterialIcons name="psychology" size={20} color="#fff" />
                </View>
                {showDesktopNav ? (
                  <Text className="text-lg font-bold text-foreground">MBTI AI</Text>
                ) : null}
              </Pressable>
            </Link>
          </View>

          {/* 中：導覽（置中、分開） */}
          {showDesktopNav ? (
            <View
              className="flex-1 flex-row items-center justify-center"
              style={{ gap: 28, flexShrink: 1 }}
            >
              {WEB_NAV_LINKS.map((item) => {
                const active = isNavActive(pathname, item.match);
                return (
                  <Link key={item.href} href={item.href as Href} asChild>
                    <Pressable className={`px-3 py-2 rounded-lg ${active ? "bg-primary/10" : ""}`}>
                      <Text
                        className={`text-sm font-semibold whitespace-nowrap ${active ? "text-primary" : "text-muted"}`}
                      >
                        {t(item.labelKey)}
                      </Text>
                    </Pressable>
                  </Link>
                );
              })}
            </View>
          ) : (
            <View className="flex-1" />
          )}

          {/* 右：語言 / 登入 / 手機選單 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <View style={{ position: "relative", zIndex: 60 }}>
              <Pressable
                onPress={() => setLangOpen((open) => !open)}
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: langOpen ? colors.tint : colors.border,
                  backgroundColor: langOpen ? `${colors.tint}14` : colors.surface,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  }}
                >
                  <MaterialIcons name="language" size={20} color={colors.tint} />
                  <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                    {getLanguageShort(language)}
                  </Text>
                  <MaterialIcons
                    name={langOpen ? "expand-less" : "expand-more"}
                    size={18}
                    color={colors.muted}
                  />
                </View>
              </Pressable>
              {langOpen ? (
                <LanguageMenu
                  language={language}
                  menuTitle={t("language")}
                  onSelect={handleLanguage}
                  onClose={() => setLangOpen(false)}
                />
              ) : null}
            </View>

            {showDesktopNav ? (
              <Pressable
                onPress={profileAction}
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  maxWidth: 140,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                  }}
                >
                  <MaterialIcons name="person" size={18} color={colors.tint} />
                  <Text
                    style={{ fontSize: 14, fontWeight: "500", color: colors.foreground, flexShrink: 1 }}
                    numberOfLines={1}
                  >
                    {isAuthenticated ? user?.name || t("profile") : t("loginTitle")}
                  </Text>
                </View>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setMobileOpen((open) => !open)}
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                }}
              >
                <View style={{ padding: 8 }}>
                  <MaterialIcons
                    name={mobileOpen ? "close" : "menu"}
                    size={22}
                    color={colors.foreground}
                  />
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </View>

      {mobileOpen && !showDesktopNav ? (
        <View className="border-t border-border bg-background px-4 py-3 gap-1">
          {WEB_NAV_LINKS.map((item) => {
            const active = isNavActive(pathname, item.match);
            return (
              <Link key={item.href} href={item.href as Href} asChild>
                <Pressable
                  onPress={() => setMobileOpen(false)}
                  className={`px-3 py-3 rounded-lg ${active ? "bg-primary/10" : ""}`}
                >
                  <Text className={`text-base font-semibold ${active ? "text-primary" : "text-foreground"}`}>
                    {t(item.labelKey)}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
          <Pressable onPress={profileAction} className="px-3 py-3 rounded-lg flex-row items-center gap-2">
            <MaterialIcons name="person" size={20} color={colors.tint} />
            <Text className="text-base font-semibold text-foreground">
              {isAuthenticated ? t("profile") : t("loginTitle")}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
