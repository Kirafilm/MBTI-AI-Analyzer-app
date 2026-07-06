export const WEB_MAX_CONTENT_WIDTH = 1120;
export const WEB_NAV_LINKS = [
  { href: "/", labelKey: "tabHome" as const, match: ["/", "/index"] },
  { href: "/psychology-list", labelKey: "tabPsychology" as const, match: ["/psychology-list"] },
  { href: "/history", labelKey: "tabHistory" as const, match: ["/history"] },
] as const;

export function isNavActive(pathname: string, match: readonly string[]) {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return match.some((segment) => normalized === segment || normalized.endsWith(segment));
}
