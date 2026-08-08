import type { ViewProps } from "react-native";
import { View } from "react-native";
import { cn } from "@/lib/utils";
import { WEB_MAX_CONTENT_WIDTH } from "@/lib/web-layout";

export interface ScreenContainerProps extends ViewProps {
  className?: string;
  containerClassName?: string;
  /** When true, content spans full width (e.g. hero sections). */
  fullWidth?: boolean;
}

export function ScreenContainer({
  children,
  className,
  containerClassName,
  fullWidth = false,
  style,
  ...props
}: ScreenContainerProps) {
  return (
    <View className={cn("w-full bg-background", containerClassName)} {...props}>
      <View
        className={cn(
          "w-full mx-auto",
          fullWidth ? "px-0" : "px-4 md:px-6 py-6 md:py-8",
          className,
        )}
        style={[{ maxWidth: fullWidth ? undefined : WEB_MAX_CONTENT_WIDTH }, style]}
      >
        {children}
      </View>
    </View>
  );
}
