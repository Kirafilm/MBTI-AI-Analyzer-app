export type AdsterraUnit = {
  key: string;
  width: number;
  height: number;
};

/**
 * Smartlink — preferred while iframe banner units stay blank.
 * Opens in a new tab from explicit sponsored placements (no forced redirect).
 */
const SMARTLINK_URL =
  process.env.EXPO_PUBLIC_ADSTERRA_SMARTLINK_URL?.trim() ||
  "https://accuracyinstalled.com/uz92t45si?key=2e796aa2215bca4d870f6fe4dc0a63cc";

/** 728×90 — page footer / leaderboard (desktop) */
const BANNER_728_KEY =
  process.env.EXPO_PUBLIC_ADSTERRA_BANNER_728_KEY?.trim() ||
  "38293ea339dba5bc588c2356bbff619a";

/** 320×50 — page footer (mobile) */
const BANNER_320_KEY =
  process.env.EXPO_PUBLIC_ADSTERRA_BANNER_320_KEY?.trim() ||
  "b3d0ea80c672306a3bef624296f3d0cd";

/** 300×250 — quiz inline + psychology modal */
const DISPLAY_300_KEY =
  process.env.EXPO_PUBLIC_ADSTERRA_DISPLAY_300_KEY?.trim() ||
  "8d72c5b0abf0b964506f69bac341acaf";

export function getAdsterraSmartlinkUrl() {
  return SMARTLINK_URL;
}

export function isAdsterraSmartlinkEnabled() {
  return Boolean(SMARTLINK_URL);
}

export function getAdsterraBanner728(): AdsterraUnit | null {
  if (!BANNER_728_KEY) return null;
  return { key: BANNER_728_KEY, width: 728, height: 90 };
}

export function getAdsterraBanner320(): AdsterraUnit | null {
  if (!BANNER_320_KEY) return null;
  return { key: BANNER_320_KEY, width: 320, height: 50 };
}

export function getAdsterraDisplay300(): AdsterraUnit | null {
  if (!DISPLAY_300_KEY) return null;
  return { key: DISPLAY_300_KEY, width: 300, height: 250 };
}

export function isAdsterraBannerEnabled() {
  return isAdsterraSmartlinkEnabled() || Boolean(getAdsterraBanner728() || getAdsterraBanner320());
}

export function isAdsterraDisplayEnabled() {
  return isAdsterraSmartlinkEnabled() || Boolean(getAdsterraDisplay300());
}

export function adsterraInvokeUrl(key: string) {
  return `https://www.highperformanceformat.com/${key}/invoke.js`;
}

/** Same-origin static pages that contain the official Adsterra snippet. */
export function adsterraPagePath(unit: AdsterraUnit) {
  return `/ads/adsterra-${unit.width}x${unit.height}.html`;
}

export function openAdsterraSmartlink() {
  if (typeof window === "undefined") return;
  const url = getAdsterraSmartlinkUrl();
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}
