/**
 * Post-process Expo web export: write crawlable HTML for /types pages.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { allMbtiTypePages, type MbtiTypePage } from "../shared/mbti-type-pages";
import { absoluteUrl, articleJsonLd, faqJsonLd } from "../lib/seo";
import { PROPELLER_PUSH_ENABLED, PROPELLER_PUSH_SCRIPT_SRC } from "../lib/propellerads";

const pushScriptTag = PROPELLER_PUSH_ENABLED
  ? `<script src="${PROPELLER_PUSH_SCRIPT_SRC}" data-cfasync="false" async></script>`
  : "";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distTypes = path.resolve(__dirname, "../dist/types");

function esc(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderTypeHtml(page: MbtiTypePage) {
  const title = `${page.code} ${page.nickname}是什麼？特質、職業與自由職建議`;
  const description = `${page.summary} 了解 ${page.code} 優勢弱點、適合工作，以及自由職／接案方向。`;
  const pathUrl = `/types/${page.slug}`;
  const url = absoluteUrl(pathUrl);
  const jsonLd = [articleJsonLd({ title, description, path: pathUrl }), faqJsonLd(page.faqs)];

  const letters = page.letters
    .map((l) => `<section><h3>${esc(l.letter)} — ${esc(l.title)}</h3><p>${esc(l.text)}</p></section>`)
    .join("\n");
  const list = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
  const faqs = page.faqs
    .map((f) => `<section><h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p></section>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${pushScriptTag}
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index,follow" />
  <link rel="canonical" href="${esc(url)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="MBTI AI Analyzer" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(url)}" />
  <meta property="og:locale" content="zh_TW" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <link rel="alternate" hrefLang="zh-Hant" href="${esc(url)}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
  <style>
    body{font-family:Inter,system-ui,-apple-system,sans-serif;margin:0;background:#fff;color:#11181C;line-height:1.7}
    main{max-width:760px;margin:0 auto;padding:32px 20px 64px}
    a{color:#0a7ea4;text-decoration:none;font-weight:600}
    h1{font-size:2rem;line-height:1.25;margin:12px 0}
    h2{font-size:1.35rem;margin:28px 0 10px}
    h3{font-size:1.05rem;margin:16px 0 6px}
    .muted{color:#687076}
    .cta{display:inline-block;background:#0a7ea4;color:#fff;padding:10px 16px;border-radius:12px;margin:8px 8px 8px 0}
    .cta.secondary{background:#fff;color:#0a7ea4;border:1px solid #0a7ea4}
    .chip{display:inline-block;padding:6px 10px;border:1px solid #E5E7EB;border-radius:8px;margin:0 8px 8px 0}
  </style>
</head>
<body>
<main>
  <p><a href="/types">← 16 型總覽</a></p>
  <p class="muted">${esc(page.code)} · ${esc(page.englishName)}</p>
  <h1>${esc(page.code)}（${esc(page.nickname)}）是什麼？</h1>
  <p>${esc(page.summary)}</p>
  <p>
    <a class="cta" href="/mbti-quiz">免費測測看是不是 ${esc(page.code)}</a>
    <a class="cta secondary" href="https://hyphenjob.com">探索自由職機會</a>
  </p>
  <h2>${esc(page.code)} 四個字母怎麼讀</h2>
  ${letters}
  <h2>核心優勢</h2>
  ${list(page.strengths)}
  <h2>需要留意的弱點</h2>
  ${list(page.weaknesses)}
  <h2>${esc(page.code)} 適合什麼工作？</h2>
  ${list(page.careers)}
  <h2>自由職／接案方向</h2>
  <p>${esc(page.freelance)}</p>
  <p class="muted">想把性格優勢變成案件？可到 <a href="https://hyphenjob.com">hyphenjob.com</a> 瀏覽自由職與接案機會。</p>
  <h2>相處與配對參考</h2>
  <p>${esc(page.pairs)}</p>
  <h2>知名形象（趣味參考）</h2>
  <p>${esc(page.famous)}</p>
  <h2>常見問題</h2>
  ${faqs}
  <h2>其他人格類型</h2>
  <p>
    ${["intj","intp","entj","entp","infj","infp","enfj","enfp","istj","isfj","estj","esfj","istp","isfp","estp","esfp"]
      .filter((s) => s !== page.slug)
      .map((s) => `<a class="chip" href="/types/${s}">${s.toUpperCase()}</a>`)
      .join("")}
    <a class="chip" href="/types">全部 16 型 →</a>
  </p>
  <p class="muted" style="font-size:12px;margin-top:32px">聲明：MBTI 是性格偏好探索工具，並非醫學或心理疾病診斷。</p>
</main>
</body>
</html>
`;
}

function renderIndexHtml(pages: MbtiTypePage[]) {
  const title = "MBTI 16型人格總覽｜特質、職業與自由職方向";
  const description =
    "一次掌握 MBTI 16 型人格：INTJ、ENFP、INFP 等類型的核心特質、優勢弱點、適合職業與自由職建議。";
  const url = absoluteUrl("/types");
  const cards = pages
    .map(
      (p) => `<a class="card" href="/types/${p.slug}">
  <strong>${esc(p.code)}</strong>
  <span>${esc(p.nickname)} · ${esc(p.englishName)}</span>
  <em>${esc(p.summary)}</em>
</a>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${pushScriptTag}
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(url)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(url)}" />
  <script type="application/ld+json">${JSON.stringify(
    articleJsonLd({ title, description, path: "/types" }),
  ).replace(/</g, "\\u003c")}</script>
  <style>
    body{font-family:Inter,system-ui,sans-serif;margin:0;color:#11181C;line-height:1.6}
    main{max-width:960px;margin:0 auto;padding:32px 20px 64px}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
    .card{display:flex;flex-direction:column;gap:6px;border:1px solid #E5E7EB;border-radius:16px;padding:16px;text-decoration:none;color:inherit;background:#f8fafc}
    .card strong{color:#0a7ea4;font-size:1.25rem}
    .card em{font-style:normal;color:#687076;font-size:.9rem}
    .cta{display:inline-block;background:#0a7ea4;color:#fff;padding:10px 16px;border-radius:12px;text-decoration:none;font-weight:600}
  </style>
</head>
<body>
<main>
  <p><a href="/">← 回首頁</a></p>
  <h1>MBTI 16 型人格總覽</h1>
  <p>想找「INTJ 是什麼」「ENFP 適合什麼工作」？從下方進入各類型詳解。</p>
  <p><a class="cta" href="/mbti-quiz">開始免費 MBTI 測驗</a></p>
  <div class="grid">${cards}</div>
</main>
</body>
</html>`;
}

/** Remove empty react-helmet placeholder titles that win over real <title>. */
function stripEmptyTitles(html: string) {
  return html.replace(/<title[^>]*>\s*<\/title>/gi, "");
}

function walkHtmlFiles(dir: string, out: string[] = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkHtmlFiles(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

const distRoot = path.resolve(__dirname, "../dist");
if (!fs.existsSync(distTypes)) {
  console.error("dist/types not found. Run expo export first.");
  process.exit(1);
}

const pages = allMbtiTypePages();
fs.writeFileSync(path.join(distTypes, "index.html"), renderIndexHtml(pages), "utf8");
for (const page of pages) {
  const file = path.join(distTypes, `${page.slug}.html`);
  fs.writeFileSync(file, renderTypeHtml(page), "utf8");
  console.log("wrote", path.relative(process.cwd(), file));
}

for (const file of walkHtmlFiles(distRoot)) {
  if (file.includes(`${path.sep}types${path.sep}`)) continue;
  const cleaned = stripEmptyTitles(fs.readFileSync(file, "utf8"));
  fs.writeFileSync(file, cleaned, "utf8");
}
console.log(`SEO HTML ready for ${pages.length} types + index`);
