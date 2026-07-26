import { View } from "react-native";
import { AdSenseAd } from "@/components/adsense-ad.web";
import { getAdSenseDisplaySlot, isAdSenseDisplayEnabled } from "@/lib/adsense";

const AD_MIN_HEIGHT = 250;

/**
 * In-content AdSense unit shown below quiz progress on web.
 * Uses the display slot (rectangle) when configured; otherwise renders nothing.
 */
export function QuizInlineAd() {
  if (!isAdSenseDisplayEnabled()) return null;

  return (
    <View
      style={{ minHeight: AD_MIN_HEIGHT }}
      className="w-full items-center justify-center py-3"
    >
      <AdSenseAd
        slot={getAdSenseDisplaySlot()}
        format="rectangle"
        fullWidthResponsive
        minHeight={AD_MIN_HEIGHT}
      />
    </View>
  );
}
