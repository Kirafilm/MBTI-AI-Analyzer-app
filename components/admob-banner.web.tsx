import { View } from "react-native";
import { AdSenseAd } from "@/components/adsense-ad.web";
import { getAdSenseBannerSlot, isAdSenseBannerEnabled } from "@/lib/adsense";

const BANNER_HEIGHT = 50;

export function AdMobBanner() {
  if (!isAdSenseBannerEnabled()) return null;

  return (
    <View
      style={{ height: BANNER_HEIGHT }}
      className="bg-background border-t border-border items-center justify-center overflow-hidden"
    >
      <AdSenseAd
        slot={getAdSenseBannerSlot()}
        format="horizontal"
        fullWidthResponsive
        minHeight={BANNER_HEIGHT}
      />
    </View>
  );
}
