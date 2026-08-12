import { ScrollViewStyleReset } from "expo-router/html";
import { DEFAULT_SEO, organizationJsonLd, SITE_URL, websiteJsonLd } from "@/lib/seo";
import {
  PROPELLER_PUSH_ENABLED,
  PROPELLER_PUSH_SCRIPT_SRC,
  PROPELLER_PUSH_ZONE,
} from "@/lib/propellerads";

const siteGraph = JSON.stringify([organizationJsonLd(), websiteJsonLd()]).replace(/</g, "\\u003c");

/**
 * Root HTML shell for static web export.
 * Keep this Node-safe (no window) so meta tags bake into every HTML file.
 */
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>{DEFAULT_SEO.title}</title>
        <meta name="description" content={DEFAULT_SEO.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MBTI AI Analyzer" />
        <meta property="og:title" content={DEFAULT_SEO.title} />
        <meta property="og:description" content={DEFAULT_SEO.description} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={`${SITE_URL}/assets/images/icon.png`} />
        <meta property="og:locale" content="zh_TW" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_SEO.title} />
        <meta name="twitter:description" content={DEFAULT_SEO.description} />
        <meta name="twitter:image" content={`${SITE_URL}/assets/images/icon.png`} />

        <link rel="alternate" hrefLang="zh-Hant" href={`${SITE_URL}/`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: siteGraph }} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/fonts/MaterialIcons.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "material";
                src: url("/fonts/MaterialIcons.ttf") format("truetype");
                font-display: swap;
              }
              body { font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
            `,
          }}
        />
        <ScrollViewStyleReset />
        {/* Override Expo's body{overflow:hidden} so long content pages can use document scroll. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                height: auto !important;
                min-height: 100% !important;
                overflow-x: hidden !important;
                overflow-y: auto !important;
              }
              #root {
                display: block !important;
                height: auto !important;
                min-height: 100vh !important;
                overflow: visible !important;
              }
              #root > div {
                min-height: 100vh;
                height: auto !important;
                overflow: visible !important;
              }
            `,
          }}
        />
      </head>
      <body>
        {PROPELLER_PUSH_ENABLED ? (
          <script
            src={PROPELLER_PUSH_SCRIPT_SRC}
            data-zone={PROPELLER_PUSH_ZONE}
            async
            data-cfasync="false"
          />
        ) : null}
        <noscript>
          <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, lineHeight: 1.7 }}>
            <h1>MBTI 性格測驗 — 用 AI 讀懂你的天賦</h1>
            <p>{DEFAULT_SEO.description}</p>
            <p>
              請啟用 JavaScript 以進行完整測驗，或先瀏覽{" "}
              <a href="/types">16 型人格解析</a>、<a href="/mbti-guide">MBTI 指南</a>。
            </p>
          </main>
        </noscript>
        {children}
      </body>
    </html>
  );
}
