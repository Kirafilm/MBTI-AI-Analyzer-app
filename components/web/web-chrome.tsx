import type { ReactNode } from "react";
import { View } from "react-native";
import { CookieNotice } from "@/components/web/cookie-notice";
import { WebFooter } from "@/components/web/web-footer";
import { WebHeader } from "@/components/web/web-header";

type WebChromeProps = {
  children: ReactNode;
};

/**
 * Web shell: sticky header, main app column, then footer.
 * Main uses nativeID so CSS can un-absolutize React Navigation screens
 * (otherwise the main column collapses and the footer jumps under the header).
 */
export function WebChrome({ children }: WebChromeProps) {
  return (
    <View className="w-full bg-background" style={{ minHeight: "100%" as const, width: "100%" }}>
      <View
        style={{
          position: "sticky" as const,
          top: 0,
          zIndex: 50,
          width: "100%",
        }}
      >
        <WebHeader />
      </View>
      <View nativeID="web-app-main" style={{ width: "100%" }}>
        {children}
      </View>
      <WebFooter />
      <CookieNotice />
    </View>
  );
}
