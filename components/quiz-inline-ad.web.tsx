import { View } from "react-native";
import { AdsterraAd } from "@/components/adsterra-ad.web";
import { AdsterraSmartlink } from "@/components/adsterra-smartlink";
import {
  getAdsterraDisplay300,
  isAdsterraDisplayEnabled,
  isAdsterraSmartlinkEnabled,
} from "@/lib/adsterra";

const AD_MIN_HEIGHT = 180;

/** In-content ad below quiz progress on web — Smartlink preferred. */
export function QuizInlineAd() {
  if (!isAdsterraDisplayEnabled()) return null;

  if (isAdsterraSmartlinkEnabled()) {
    return (
      <View
        style={{ minHeight: AD_MIN_HEIGHT }}
        className="w-full items-center justify-center py-3"
      >
        <AdsterraSmartlink height={AD_MIN_HEIGHT} variant="card" />
      </View>
    );
  }

  const unit = getAdsterraDisplay300();
  if (!unit) return null;

  return (
    <View
      style={{ minHeight: 250 }}
      className="w-full items-center justify-center py-3"
    >
      <AdsterraAd unit={unit} />
    </View>
  );
}
