import type { ReactNode } from "react";
import { View } from "react-native";
import { CookieNotice } from "@/components/web/cookie-notice";
import { WebFooter } from "@/components/web/web-footer";
import { WebHeader } from "@/components/web/web-header";

type WebChromeProps = {
  children: ReactNode;
};

/**
 * Document-flow web chrome: header → page → footer.
 * Relies on Slot-based root layout (not Native Stack absolute screens).
 */
export function WebChrome({ children }: WebChromeProps) {
  return (
    <View
      className="w-full bg-background"
      style={{ width: "100%", minHeight: "100%" as const }}
    >
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
      <View style={{ width: "100%" }}>{children}</View>
      <WebFooter />
      <CookieNotice />
    </View>
  );
}
