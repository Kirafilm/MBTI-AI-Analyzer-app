import { createElement, useEffect, useRef } from "react";
import { type ViewStyle } from "react-native";
import {
  getAdSenseClientId,
  isAdSenseConfigured,
  loadAdSenseScript,
  pushAdSenseSlot,
} from "@/lib/adsense";

type AdSenseAdProps = {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  fullWidthResponsive?: boolean;
  minHeight?: number;
  style?: ViewStyle;
};

export function AdSenseAd({
  slot,
  format = "auto",
  fullWidthResponsive = true,
  minHeight = 90,
  style,
}: AdSenseAdProps) {
  const pushedRef = useRef(false);
  const clientId = getAdSenseClientId();

  useEffect(() => {
    if (!isAdSenseConfigured() || !slot || pushedRef.current) return;

    let cancelled = false;

    loadAdSenseScript()
      .then(() => {
        if (cancelled || pushedRef.current) return;
        pushedRef.current = true;
        pushAdSenseSlot();
      })
      .catch((error) => {
        console.warn("[AdSense] Failed to load:", error instanceof Error ? error.message : error);
      });

    return () => {
      cancelled = true;
    };
  }, [slot]);

  if (!isAdSenseConfigured() || !slot) {
    return null;
  }

  return createElement(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        minHeight,
        overflow: "hidden",
      },
    },
    createElement("ins", {
      className: "adsbygoogle",
      style: { display: "block", width: "100%", minHeight },
      "data-ad-client": clientId,
      "data-ad-slot": slot,
      "data-ad-format": format,
      "data-full-width-responsive": fullWidthResponsive ? "true" : "false",
    }),
  );
}
