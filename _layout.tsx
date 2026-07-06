import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mbti-quiz"
        options={{
          title: "MBTI 測驗",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="mbti-result"
        options={{
          title: "結果",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="mbti-analysis"
        options={{
          title: "分析",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="mbti-career"
        options={{
          title: "職業",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "歷史",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.left.forwardslash.chevron.right" color={color} />,
        }}
      />
      <Tabs.Screen
        name="comparison"
        options={{
          title: "對比",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
    </Tabs>
  );
}
