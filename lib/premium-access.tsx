import { createContext, useCallback, useContext, useMemo } from "react";

/** All psychology tests are free; ads may show before starting a test. */
export const FREE_PSYCHOLOGY_TEST_COUNT = Number.POSITIVE_INFINITY;

export type PremiumContextValue = {
  isPremium: boolean;
  loading: boolean;
  purchasing: boolean;
  restoring: boolean;
  isConfigured: boolean;
  error: string | null;
  displayPrice: string | null;
  refresh: () => Promise<void>;
  purchasePremium: () => Promise<boolean>;
  restorePurchases: () => Promise<boolean>;
};

export function isPsychologyTestUnlocked(_index: number, _isPremium?: boolean) {
  return true;
}

/** @deprecated Billing removed — kept for call-site compatibility */
export async function getCachedPremiumAccess(): Promise<boolean> {
  return false;
}

/** @deprecated Billing removed */
export async function setTestPremiumOverride(_enabled: boolean) {}

/** @deprecated Billing removed */
export async function getTestPremiumOverride(): Promise<boolean> {
  return false;
}

const PremiumAccessContext = createContext<PremiumContextValue | null>(null);

const DISABLED_PREMIUM_VALUE: PremiumContextValue = {
  isPremium: false,
  loading: false,
  purchasing: false,
  restoring: false,
  isConfigured: false,
  error: null,
  displayPrice: null,
  refresh: async () => {},
  purchasePremium: async () => false,
  restorePurchases: async () => false,
};

export function PremiumAccessProvider({ children }: { children: React.ReactNode }) {
  const refresh = useCallback(async () => {}, []);
  const purchasePremium = useCallback(async () => false, []);
  const restorePurchases = useCallback(async () => false, []);

  const value = useMemo<PremiumContextValue>(
    () => ({
      ...DISABLED_PREMIUM_VALUE,
      refresh,
      purchasePremium,
      restorePurchases,
    }),
    [purchasePremium, refresh, restorePurchases],
  );

  return <PremiumAccessContext.Provider value={value}>{children}</PremiumAccessContext.Provider>;
}

export function usePremiumAccess() {
  const context = useContext(PremiumAccessContext);
  if (!context) {
    throw new Error("usePremiumAccess must be used within PremiumAccessProvider");
  }
  return context;
}
