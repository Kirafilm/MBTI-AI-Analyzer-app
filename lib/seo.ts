export const SITE_URL = "https://mbti.hyphenjob.com";
export const SITE_NAME = "MBTI AI Analyzer";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/icon.png`;

export const DEFAULT_SEO = {
  title: "MBTI 免費測驗｜AI 人格分析與職涯建議",
  description:
    "免費 MBTI 性格測驗與 AI 深度分析，探索 16 型人格特質、優勢弱點與適合的職業／自由職方向。",
  path: "/",
} as const;

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildTitle(pageTitle?: string) {
  if (!pageTitle) return DEFAULT_SEO.title;
  if (pageTitle.includes(SITE_NAME) || pageTitle.includes("MBTI")) return pageTitle;
  return `${pageTitle}｜${SITE_NAME}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    description: DEFAULT_SEO.description,
    parentOrganization: {
      "@type": "Organization",
      name: "HyphenJob",
      url: "https://hyphenjob.com",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_SEO.description,
    inLanguage: ["zh-Hant", "zh-Hans", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/types?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    dateModified: input.dateModified ?? "2026-08-10",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE,
      },
    },
  };
}
