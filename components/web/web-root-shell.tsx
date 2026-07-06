import type { ReactNode } from "react";
import { useSegments } from "expo-router";
import { WebChrome } from "@/components/web/web-chrome";

export function WebRootShell({ children }: { children: ReactNode }) {
  const segments = useSegments();
  const root = segments[0];
  const isAuth = root === "auth";
  const isOAuthCallback = root === "oauth";

  if (isAuth || isOAuthCallback) {
    return <>{children}</>;
  }

  return <WebChrome>{children}</WebChrome>;
}
