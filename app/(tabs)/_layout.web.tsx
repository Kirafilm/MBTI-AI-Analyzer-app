import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => null}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="mbti-quiz" options={{ href: null }} />
      <Tabs.Screen name="mbti-result" options={{ href: null }} />
      <Tabs.Screen name="mbti-analysis" options={{ href: null }} />
      <Tabs.Screen name="mbti-career" options={{ href: null }} />
      <Tabs.Screen name="purchase" options={{ href: null }} />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="psychology-list" />
      <Tabs.Screen name="psychology-quiz" options={{ href: null }} />
      <Tabs.Screen name="psychology-result" options={{ href: null }} />
      <Tabs.Screen name="comparison" options={{ href: null }} />
    </Tabs>
  );
}
