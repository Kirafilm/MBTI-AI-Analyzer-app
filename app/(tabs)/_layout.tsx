import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { TabBarWithAd } from "@/components/tab-bar-with-ad";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { useI18n } from "@/lib/i18n-context";

export default function TabLayout() {
  const colors = useColors();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <Tabs
      tabBar={(props) => <TabBarWithAd {...props} />}
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
          title: t("tabHome"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mbti-quiz"
        options={{
          title: t("quiz"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="mbti-result"
        options={{
          title: t("result"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="mbti-analysis"
        options={{
          title: t("personalityAnalysis"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="mbti-career"
        options={{
          title: t("careerGuidance"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="purchase"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t("tabHistory"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.left.forwardslash.chevron.right" color={color} />,
        }}
      />
      <Tabs.Screen
        name="psychology-list"
        options={{
          title: t("tabPsychology"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
        }}
      />
      <Tabs.Screen
        name="psychology-quiz"
        options={{
          title: t("psychologyTests"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="psychology-result"
        options={{
          title: t("result"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="comparison"
        options={{
          title: t("comparison"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          href: null,
        }}
      />
    </Tabs>
  );
}
