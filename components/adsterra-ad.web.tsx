import { createElement } from "react";
import { View } from "react-native";
import { adsterraPagePath, type AdsterraUnit } from "@/lib/adsterra";

type AdsterraAdProps = {
  unit: AdsterraUnit;
};

/**
 * Load Adsterra from a same-origin HTML page inside an iframe.
 * srcDoc / SPA script injection often yields blank boxes because Adsterra
 * validates a real page origin/referrer; static public pages fix that.
 */
export function AdsterraAd({ unit }: AdsterraAdProps) {
  const src = adsterraPagePath(unit);

  return (
    <View
      style={{
        width: "100%",
        minHeight: unit.height,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {createElement("iframe", {
        title: `adsterra-${unit.width}x${unit.height}`,
        src,
        width: unit.width,
        height: unit.height,
        scrolling: "no",
        frameBorder: "0",
        referrerPolicy: "unsafe-url",
        style: {
          width: unit.width,
          height: unit.height,
          maxWidth: "100%",
          border: 0,
          overflow: "hidden",
          display: "block",
          backgroundColor: "transparent",
        },
      })}
    </View>
  );
}
