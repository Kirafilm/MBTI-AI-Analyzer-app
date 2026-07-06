import { useCallback, useState } from "react";
import { Platform, View } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

/**
 * Standard BANNER (320×50) height — used as container height so the layout
 * never collapses while the ad is loading or when there's no fill.
 */
const BANNER_HEIGHT = 50;

export function AdMobBanner() {
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  if (Platform.OS === "web") return null;

  const unitId =
    Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_UNIT_ID
      : process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_UNIT_ID;

  const adUnitId = unitId || TestIds.BANNER;
  const isTestAd = adUnitId === TestIds.BANNER;

  const handleAdLoaded = useCallback(
    (dimensions: { width: number; height: number }) => {
      console.log(
        `[AdMob Banner] ✅ Loaded ${isTestAd ? "(TEST)" : ""} – ${dimensions.width}×${dimensions.height}`,
      );
      setLoaded(true);
      setLoadError(null);
    },
    [isTestAd],
  );

  const handleAdFailedToLoad = useCallback((error: Error) => {
    console.warn("[AdMob Banner] ❌ Failed:", error.message);
    setLoadError(error.message);
  }, []);

  const handleAdImpression = useCallback(() => {
    console.log("[AdMob Banner] 👁️ Impression recorded");
  }, []);

  // BannerAd auto-sizes, but the container needs a fixed height to
  // prevent layout collapse before the ad loads.
  return (
    <View
      style={{ height: BANNER_HEIGHT }}
      className="bg-background border-t border-border items-center justify-center overflow-hidden"
    >
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={handleAdLoaded}
        onAdFailedToLoad={handleAdFailedToLoad}
        onAdImpression={handleAdImpression}
      />
    </View>
  );
}
