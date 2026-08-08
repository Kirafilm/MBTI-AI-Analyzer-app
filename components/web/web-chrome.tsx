import type { ReactNode } from "react";
import { View } from "react-native";
import { CookieNotice } from "@/components/web/cookie-notice";
import { WebFooter } from "@/components/web/web-footer";
import { WebHeader } from "@/components/web/web-header";

type WebChromeProps = {
  children: ReactNode;
};

/**
 * Web chrome under Expo's body{overflow:hidden} root.
 * Keeps a flex-1 content slot so tab scenes get a real height; pages scroll inside.
 */
export function WebChrome({ children }: WebChromeProps) {
  return (
    <View className="flex-1 w-full bg-background" style={{ minHeight: 0 }}>
      <WebHeader />
      <View className="flex-1 w-full" style={{ flex: 1, minHeight: 0 }}>
        {children}
      </View>
      <WebFooter />
      <CookieNotice />
    </View>
  );
}
