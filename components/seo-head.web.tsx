import Head from "expo-router/head";
import {
  absoluteUrl,
  buildTitle,
  DEFAULT_OG_IMAGE,
  DEFAULT_SEO,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import type { SeoHeadProps } from "@/components/seo-head";

function toJsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Per-route SEO tags for Expo static export / web.
 * Avoid window/document so tags bake into HTML at export time.
 */
export function SeoHead({
  title,
  description = DEFAULT_SEO.description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd,
  includeSiteGraph = false,
  noIndex = false,
}: SeoHeadProps) {
  const fullTitle = buildTitle(title);
  const url = absoluteUrl(path);
  const graph = [
    ...(includeSiteGraph ? [organizationJsonLd(), websiteJsonLd()] : []),
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
  ];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="MBTI AI Analyzer" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="zh_TW" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="alternate" hrefLang="zh-Hant" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {graph.map((item, index) => (
        <script
          key={`ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLdScript(item) }}
        />
      ))}
    </Head>
  );
}
