/**
 * Normalize expo-router search params (string | string[]) for lookups.
 */
export function paramToString(value: string | string[] | undefined): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value[0] : value;
}
