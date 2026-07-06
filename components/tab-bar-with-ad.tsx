import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { AdMobBanner } from "@/components/admob-banner";

export function TabBarWithAd(props: BottomTabBarProps) {
  return (
    <View>
      <AdMobBanner />
      <BottomTabBar {...props} />
    </View>
  );
}

