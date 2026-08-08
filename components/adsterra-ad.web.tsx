import { createElement, useMemo } from "react";
import { View } from "react-native";
import { adsterraInvokeUrl, type AdsterraUnit } from "@/lib/adsterra";

type AdsterraAdProps = {
  unit: AdsterraUnit;
};

function buildAdsterraSrcDoc(unit: AdsterraUnit) {
  // Escape closing script tags so the browser doesn't truncate srcDoc early.
  const invoke = adsterraInvokeUrl(unit.key);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
html,body{margin:0;padding:0;background:transparent;overflow:hidden}
</style></head><body>
<script type="text/javascript">
atOptions = {
  key: ${JSON.stringify(unit.key)},
  format: "iframe",
  height: ${unit.height},
  width: ${unit.width},
  params: {}
};
<\/script>
<script type="text/javascript" src=${JSON.stringify(invoke)}><\/script>
</body></html>`;
}

/**
 * Adsterra's invoke.js expects a normal document context (often uses document.write).
 * Loading it via React appendChild into the main SPA leaves a blank reserved box.
 * Isolate each unit in an iframe srcDoc so scripts run like a classic HTML page.
 */
export function AdsterraAd({ unit }: AdsterraAdProps) {
  const srcDoc = useMemo(() => buildAdsterraSrcDoc(unit), [unit.key, unit.width, unit.height]);

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
        srcDoc,
        width: unit.width,
        height: unit.height,
        scrolling: "no",
        frameBorder: "0",
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
