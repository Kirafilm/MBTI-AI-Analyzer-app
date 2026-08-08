import { useEffect, useState } from "react";
import { View } from "react-native";
import { AdsterraAd } from "@/components/adsterra-ad.web";
import { AdsterraSmartlink } from "@/components/adsterra-smartlink";
import {
  getAdsterraBanner320,
  getAdsterraBanner728,
  isAdsterraBannerEnabled,
  isAdsterraSmartlinkEnabled,
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

/** Web page banner — Smartlink preferred; iframe unit as fallback. */
export function WebBannerAd() {
  const narrow = useIsNarrow();

  if (!isAdsterraBannerEnabled()) return null;

  if (isAdsterraSmartlinkEnabled()) {
    const height = narrow ? 56 : 72;
    return (
      <View
        style={{ minHeight: height }}
        className="bg-background border-t border-border items-center justify-center overflow-hidden py-2"
      >
        <AdsterraSmartlink height={height} variant="banner" />
      </View>
    );
  }

  const unit728 = getAdsterraBanner728();
  const unit320 = getAdsterraBanner320();
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
