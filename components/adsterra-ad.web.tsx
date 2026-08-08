import { createElement, useEffect, useId, useRef } from "react";
import { View } from "react-native";
import { adsterraInvokeUrl, type AdsterraUnit } from "@/lib/adsterra";

type AdsterraAdProps = {
  unit: AdsterraUnit;
};

/**
 * Loads one Adsterra iframe unit into a dedicated container.
 * Each mount sets window.atOptions then appends invoke.js (Adsterra's required pattern).
 */
export function AdsterraAd({ unit }: AdsterraAdProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const reactId = useId().replace(/:/g, "");
  const containerId = `at-${unit.key.slice(0, 8)}-${reactId}`;

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof window === "undefined") return;

    host.innerHTML = "";

    const config = document.createElement("script");
    config.type = "text/javascript";
    config.text = `atOptions = {
  'key': '${unit.key}',
  'format': 'iframe',
  'height': ${unit.height},
  'width': ${unit.width},
  'params': {}
};`;
    host.appendChild(config);

    const invoke = document.createElement("script");
    invoke.type = "text/javascript";
    invoke.src = adsterraInvokeUrl(unit.key);
    invoke.async = true;
    host.appendChild(invoke);

    return () => {
      host.innerHTML = "";
    };
  }, [unit.key, unit.width, unit.height]);

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
      {createElement("div", {
        id: containerId,
        ref: hostRef,
        style: {
          width: unit.width,
          height: unit.height,
          maxWidth: "100%",
          overflow: "hidden",
        },
      })}
    </View>
  );
}
