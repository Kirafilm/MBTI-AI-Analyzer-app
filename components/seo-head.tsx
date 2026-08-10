export type SeoHeadProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  includeSiteGraph?: boolean;
  noIndex?: boolean;
};

/** Native stub — SEO head tags are web-only. */
export function SeoHead(_props: SeoHeadProps) {
  return null;
}
