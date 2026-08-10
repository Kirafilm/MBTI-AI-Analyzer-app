import { Slot } from "expo-router";
import { View } from "react-native";

/**
 * Web does not use a bottom tab bar. Prefer Slot over Tabs so scenes are not
 * absolutely positioned / height-locked (which blocks document scroll).
 */
export default function TabLayout() {
  return (
    <View style={{ width: "100%", flexGrow: 1 }}>
      <Slot />
    </View>
  );
}
