import { AdEventType, InterstitialAd, TestIds } from "react-native-google-mobile-ads";
import { Platform } from "react-native";

let interstitial: InterstitialAd | null = null;
let inFlight: Promise<void> | null = null;

function getUnitId() {
  return Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_ADMOB_IOS_INTERSTITIAL_UNIT_ID
    : process.env.EXPO_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_UNIT_ID;
}

function getInterstitial() {
  if (interstitial) return interstitial;
  interstitial = InterstitialAd.createForAdRequest(getUnitId() || TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });
  return interstitial;
}

async function ensureLoaded(ad: InterstitialAd) {
  if (ad.loaded) return;

  await new Promise<void>((resolve) => {
    const unsubLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      unsubLoaded();
      unsubError();
      resolve();
    });
    const unsubError = ad.addAdEventListener(AdEventType.ERROR, () => {
      unsubLoaded();
      unsubError();
      resolve();
    });

    ad.load();
  });
}

export async function showPsychologyTestAd(): Promise<void> {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    const ad = getInterstitial();

    await ensureLoaded(ad);

    await new Promise<void>((resolve) => {
      const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
        unsubClosed();
        unsubError();
        resolve();
      });
      const unsubError = ad.addAdEventListener(AdEventType.ERROR, () => {
        unsubClosed();
        unsubError();
        resolve();
      });

    try {
      ad.show();
    } catch (err) {
      console.warn("[AdGate] ad.show() failed:", err instanceof Error ? err.message : err);
      unsubClosed();
      unsubError();
      resolve();
    }
    });

    try {
      ad.load();
    } catch (err) {
      console.warn("[AdGate] ad.load() failed:", err instanceof Error ? err.message : err);
    }
  })().finally(() => {
    inFlight = null;
  });

  return inFlight;
}
