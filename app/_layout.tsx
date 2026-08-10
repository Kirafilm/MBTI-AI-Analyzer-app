import "@/lib/load-web-fonts";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "@/lib/_core/nativewind-pressable";
import { ThemeProvider } from "@/lib/theme-provider";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";

import { trpc, createTRPCClient } from "@/lib/trpc";
import { initManusRuntime } from "@/lib/_core/manus-runtime";
import { MBTIProvider } from "@/lib/mbti-context";
import { I18nProvider } from "@/lib/i18n-context";
import { PremiumAccessProvider } from "@/lib/premium-access";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  useEffect(() => {
    initManusRuntime();
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );
  const [trpcClient] = useState(() => createTRPCClient());

  const providerInitialMetrics = useMemo(() => {
    const metrics = initialWindowMetrics ?? {
      insets: { top: 0, right: 0, bottom: 0, left: 0 },
      frame: { x: 0, y: 0, width: 0, height: 0 },
    };
    return {
      ...metrics,
      insets: {
        ...metrics.insets,
        top: Math.max(metrics.insets.top, 16),
        bottom: Math.max(metrics.insets.bottom, 12),
      },
    };
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaProvider initialMetrics={providerInitialMetrics}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
              <I18nProvider>
                <PremiumAccessProvider>
                  <MBTIProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="(tabs)" />
                      <Stack.Screen name="auth/login" options={{ presentation: "fullScreenModal" }} />
                      <Stack.Screen name="auth/register" options={{ presentation: "fullScreenModal" }} />
                      <Stack.Screen name="oauth/callback" />
                      <Stack.Screen name="profile" options={{ headerShown: false }} />
                      <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
                      <Stack.Screen name="terms-of-service" options={{ headerShown: false }} />
                      <Stack.Screen name="contact-us" options={{ headerShown: false }} />
                      <Stack.Screen name="about" options={{ headerShown: false }} />
                      <Stack.Screen name="mbti-guide" options={{ headerShown: false }} />
                      <Stack.Screen name="types/index" options={{ headerShown: false }} />
                      <Stack.Screen name="types/[type]" options={{ headerShown: false }} />
                    </Stack>
                    <StatusBar style="auto" />
                  </MBTIProvider>
                </PremiumAccessProvider>
              </I18nProvider>
            </QueryClientProvider>
          </trpc.Provider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
