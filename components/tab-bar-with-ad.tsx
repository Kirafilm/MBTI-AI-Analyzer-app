import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { WebBannerAd } from "@/components/web-banner-ad";

export function TabBarWithAd(props: BottomTabBarProps) {
  return (
    <View>
      <WebBannerAd />
      <BottomTabBar {...props} />
    </View>
  );
}
