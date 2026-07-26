import { useCallback, useState } from "react";
import { Platform, View } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

const AD_HEIGHT = 250;

/**
 * In-content ad shown below quiz progress — Medium Rectangle (300×250).
 */
export function QuizInlineAd() {
  const [loadError, setLoadError] = useState<string | null>(null);

  if (Platform.OS === "web") return null;

  const unitId =
    Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_UNIT_ID
      : process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_UNIT_ID;

  const adUnitId = unitId || TestIds.BANNER;

  const handleAdFailedToLoad = useCallback((error: Error) => {
    console.warn("[QuizInlineAd] Failed:", error.message);
    setLoadError(error.message);
  }, []);

  if (loadError) return null;

  return (
    <View
      style={{ minHeight: AD_HEIGHT }}
      className="w-full items-center justify-center py-2"
    >
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdFailedToLoad={handleAdFailedToLoad}
      />
    </View>
  );
}
