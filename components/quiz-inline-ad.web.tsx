import { View } from "react-native";
import { AdsterraAd } from "@/components/adsterra-ad.web";
import { getAdsterraDisplay300, isAdsterraDisplayEnabled } from "@/lib/adsterra";

const AD_MIN_HEIGHT = 250;

/** In-content Adsterra 300×250 below quiz progress on web. */
export function QuizInlineAd() {
  const unit = getAdsterraDisplay300();
  if (!isAdsterraDisplayEnabled() || !unit) return null;

  return (
    <View
      style={{ minHeight: AD_MIN_HEIGHT }}
      className="w-full items-center justify-center py-3"
    >
      <AdsterraAd unit={unit} />
    </View>
  );
}
