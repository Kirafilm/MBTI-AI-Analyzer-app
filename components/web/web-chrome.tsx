import type { ReactNode } from "react";
import { View } from "react-native";
import { WebFooter } from "@/components/web/web-footer";
import { WebHeader } from "@/components/web/web-header";

type WebChromeProps = {
  children: ReactNode;
};

export function WebChrome({ children }: WebChromeProps) {
  return (
    <View className="flex-1 min-h-screen bg-background">
      <WebHeader />
      <View className="flex-1 w-full">{children}</View>
      <WebFooter />
    </View>
  );
}
