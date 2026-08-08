import { useEffect, useState } from "react";
import { View } from "react-native";
import { AdsterraAd } from "@/components/adsterra-ad.web";
import {
  getAdsterraBanner320,
  getAdsterraBanner728,
  isAdsterraBannerEnabled,
} from "@/lib/adsterra";

function useIsNarrow(breakpoint = 760) {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [breakpoint]);

  return narrow;
}

/** Web page banner — Adsterra 728×90 / 320×50. */
export function WebBannerAd() {
  const narrow = useIsNarrow();
  const unit728 = getAdsterraBanner728();
  const unit320 = getAdsterraBanner320();

  if (!isAdsterraBannerEnabled()) return null;

  const unit = narrow ? unit320 ?? unit728 : unit728 ?? unit320;
  if (!unit) return null;

  return (
    <View
      style={{ minHeight: unit.height }}
      className="bg-background border-t border-border items-center justify-center overflow-hidden"
    >
      <AdsterraAd unit={unit} />
    </View>
  );
}
