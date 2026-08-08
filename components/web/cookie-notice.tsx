import { useEffect, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";

const STORAGE_KEY = "cookie_notice_accepted_v1";

/**
 * Lightweight notice for Adsterra cookie disclosure on web.
 * Does not block browsing; records acceptance locally.
 */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    let cancelled = false;
    (async () => {
      try {
        const accepted = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && !accepted) setVisible(true);
      } catch {
        if (!cancelled) setVisible(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (Platform.OS !== "web" || !visible) return null;

  return (
    <View
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
    >
      <View className="bg-surface border border-border rounded-xl p-4 gap-3 shadow-lg max-w-3xl mx-auto w-full">
        <Text className="text-sm text-foreground leading-relaxed">
          本網站可能使用 Cookie 及類似技術（包括廣告合作夥伴 Adsterra）以提供服務與廣告。詳見{" "}
          <Link href="/privacy-policy" asChild>
            <Pressable>
              <Text className="text-primary font-semibold">私隱政策</Text>
            </Pressable>
          </Link>
          。
        </Text>
        <Pressable
          onPress={async () => {
            await AsyncStorage.setItem(STORAGE_KEY, "1");
            setVisible(false);
          }}
          className="self-end"
        >
          <View className="px-4 py-2 bg-primary rounded-lg">
            <Text className="text-background font-semibold text-sm">知道了</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
