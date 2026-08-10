import type { ReactNode } from "react";
import { View } from "react-native";
import { CookieNotice } from "@/components/web/cookie-notice";
import { WebFooter } from "@/components/web/web-footer";
import { WebHeader } from "@/components/web/web-header";

type WebChromeProps = {
  children: ReactNode;
};

/**
 * Web shell using document scroll (body overflow:auto).
 * Header stays sticky; main + footer grow with page content.
 */
export function WebChrome({ children }: WebChromeProps) {
  return (
    <View className="w-full bg-background" style={{ minHeight: "100%" as const, width: "100%" }}>
      <View
        style={{
          position: "sticky" as const,
          top: 0,
          zIndex: 50,
          backgroundColor: "transparent",
        }}
      >
        <WebHeader />
      </View>
      <View className="w-full" style={{ width: "100%", flexGrow: 1 }}>
        {children}
      </View>
      <WebFooter />
      <CookieNotice />
    </View>
  );
}
