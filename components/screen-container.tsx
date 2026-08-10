import { Platform, View, type ViewProps } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";

export interface ScreenContainerProps extends ViewProps {
  /**
   * SafeArea edges to apply. Defaults to ["top", "left", "right"].
   * Bottom is typically handled by Tab Bar.
   */
  edges?: Edge[];
  /**
   * Tailwind className for the content area.
   */
  className?: string;
  /**
   * Additional className for the outer container (background layer).
   */
  containerClassName?: string;
  /**
   * Additional className for the SafeAreaView (content layer).
   */
  safeAreaClassName?: string;
}

/**
 * A container component that properly handles SafeArea and background colors.
 *
 * On web we avoid locking height to the viewport so document scroll can grow
 * with page content (Expo defaults to body{overflow:hidden} + flex shells).
 */
export function ScreenContainer({
  children,
  edges = ["top", "left", "right"],
  className,
  containerClassName,
  safeAreaClassName,
  style,
  ...props
}: ScreenContainerProps) {
  const isWeb = Platform.OS === "web";

  return (
    <View
      className={cn(isWeb ? "w-full" : "flex-1", "bg-background", containerClassName)}
      style={isWeb ? { width: "100%", flexGrow: 1 } : undefined}
      {...props}
    >
      <SafeAreaView
        edges={isWeb ? [] : edges}
        className={cn(isWeb ? "w-full" : "flex-1", safeAreaClassName)}
        style={[isWeb ? { width: "100%", flexGrow: 1 } : undefined, style]}
      >
        <View
          className={cn(isWeb ? "w-full" : "flex-1", className)}
          style={isWeb ? { width: "100%" } : undefined}
        >
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
}
