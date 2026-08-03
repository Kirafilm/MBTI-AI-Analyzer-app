declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

let scriptPromise: Promise<void> | null = null;

export function getAdSenseClientId() {
  // Publisher ID is public; keep a fallback so site verification works even if
  // Cloudflare env vars are missing. Slot IDs still come from env.
  return process.env.EXPO_PUBLIC_ADSENSE_CLIENT_ID?.trim() || "ca-pub-2239617378202687";
}

export function getAdSenseBannerSlot() {
  return process.env.EXPO_PUBLIC_ADSENSE_BANNER_SLOT ?? "";
}

export function getAdSenseDisplaySlot() {
  return process.env.EXPO_PUBLIC_ADSENSE_DISPLAY_SLOT ?? "";
}

export function isAdSenseConfigured() {
  return Boolean(getAdSenseClientId());
}

export function isAdSenseBannerEnabled() {
  return Boolean(getAdSenseClientId() && getAdSenseBannerSlot());
}

export function isAdSenseDisplayEnabled() {
  return Boolean(getAdSenseClientId() && getAdSenseDisplaySlot());
}

export function loadAdSenseScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.adsbygoogle) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  const clientId = getAdSenseClientId();
  if (!clientId) {
    console.warn("[AdSense] EXPO_PUBLIC_ADSENSE_CLIENT_ID is not set");
    return Promise.resolve();
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("AdSense script failed to load")), {
        once: true,
      });
      if (window.adsbygoogle) {
        resolve();
      }
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("AdSense script failed to load"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export function pushAdSenseSlot() {
  if (typeof window === "undefined") return;
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (error) {
    console.warn("[AdSense] push failed:", error instanceof Error ? error.message : error);
  }
}
