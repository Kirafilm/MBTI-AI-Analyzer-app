import type { ReactNode } from "react";
import { View } from "react-native";
import { CookieNotice } from "@/components/web/cookie-notice";
import { WebFooter } from "@/components/web/web-footer";
import { WebHeader } from "@/components/web/web-header";

type WebChromeProps = {
  children: ReactNode;
};

/**
 * Site chrome for web: header + content + footer in normal document flow
 * so the page scrolls with the window (not a nested flex-clipped pane).
 */
export function WebChrome({ children }: WebChromeProps) {
  return (
    <View className="w-full min-h-screen bg-background">
      <WebHeader />
      <View className="w-full">{children}</View>
      <WebFooter />
      <CookieNotice />
    </View>
  );
}
