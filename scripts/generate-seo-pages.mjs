// Post-build step: writes per-route static HTML (title, description, canonical,
// Open Graph/Twitter tags, JSON-LD, text summary), sitemap.xml and 404.html
// into dist/. No dependencies beyond TypeScript (already a devDependency).
// Vercel serves real files before rewrites, so dist/<id>/index.html is used
// for /<id> automatically.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";

const SITE = "https://ashulman.vercel.app";
const OG_IMAGE = `${SITE}/images/Home/og-image.jpg`;
const SITE_NAME = "Andy Shulman - Design Portfolio";
const HOME_TITLE =
  "Andy Shulman - Senior UX/Product Designer | Enterprise Design Specialist";
const HOME_DESC =
  "Andy Shulman: Senior UX Designer specializing in enterprise SaaS, AI-driven experiences, and mission-driven design. Previously at LogicMonitor. Stanford University graduate. Based in Montrose, Colorado.";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Load case study data (TypeScript) by transpiling to a temp ESM file.
const src = readFileSync("src/pages/casedata.tsx", "utf8");
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const tmp = join(tmpdir(), `casedata-${process.pid}.mjs`);
writeFileSync(tmp, js);
const { allCaseStudies } = await import(pathToFileURL(tmp).href);
rmSync(tmp);

const person = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: "Andy Shulman",
  jobTitle: "Senior UX/Product Designer",
  url: `${SITE}/`,
  image: `${SITE}/images/Home/headshot.webp`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Stanford University" },
  homeLocation: { "@type": "Place", name: "Montrose, Colorado" },
  sameAs: ["https://www.linkedin.com/in/andrea-shulman/"],
};

const firstSentence = (t) => (t.match(/^.*?[.!?](\s|$)/)?.[0] ?? t).trim();
const clip = (t, n = 200) => (t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : t);

const pages = [
  {
    path: "/",
    file: "index.html",
    title: HOME_TITLE,
    desc: HOME_DESC,
    ogType: "website",
    summary: `<h1>Final destination: Impact</h1><h2>Designing clarity for high-stakes systems</h2><h2>Andy Shulman · Senior UX Designer</h2><p>${esc(HOME_DESC)}</p><ul>${allCaseStudies
      .map((c) => `<li><a href="/${c.id}">${esc(c.title)}</a> (${esc(c.company)}): ${esc(c.destination)}</li>`)
      .join("")}</ul>`,
    jsonld: [
      { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: `${SITE}/`, author: { "@id": person["@id"] } },
      { "@context": "https://schema.org", ...person },
    ],
  },
  ...allCaseStudies.map((c) => {
    const desc = clip(`${c.title} (${c.company}): ${c.destination}. ${firstSentence(c.overview)}`, 200);
    const url = `${SITE}/${c.id}`;
    return {
      path: `/${c.id}`,
      file: `${c.id}/index.html`,
      title: `${c.title} - Andy Shulman`,
      desc,
      ogType: "article",
      summary: `<h1>${esc(c.title)}</h1><p>${esc(c.company)}: ${esc(c.destination)}</p><p>${esc(c.overview)}</p><p><a href="/">Back to Andy Shulman's portfolio</a></p>`,
      jsonld: [
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: c.title,
          description: desc,
          url,
          image: OG_IMAGE,
          creator: { "@id": person["@id"] },
          author: { "@id": person["@id"] },
          about: `${c.company} product design case study`,
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE}/` },
        },
        { "@context": "https://schema.org", ...person },
      ],
    };
  }),
];

const template = readFileSync("dist/index.html", "utf8");

// Remove the generic SEO tags from the template, then inject per-page ones.
const stripped = template
  .replace(/<title>[\s\S]*?<\/title>/, "")
  .replace(/<link\s+rel="canonical"[^>]*>/g, "")
  .replace(/<meta\s+(?:name="(?:title|description)"|property="(?:og|twitter):[^"]*")[^>]*>/g, "");

const render = (p) => {
  const url = `${SITE}${p.path === "/" ? "/" : p.path}`;
  const head = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="title" content="${esc(p.title)}" />`,
    `<meta name="description" content="${esc(p.desc)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${p.ogType}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.desc)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${url}" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.desc)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(p.jsonld).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
  return stripped
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${p.summary}</div>`);
};

for (const p of pages) {
  const out = `dist/${p.file}`;
  mkdirSync(out.replace(/\/[^/]+$/, ""), { recursive: true });
  writeFileSync(out, render(p));
}

// sitemap.xml (lastmod = build date)
const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .map((p) => `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n");
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

// Static 404 (self-contained, no scripts, inline style only)
writeFileSync(
  "dist/404.html",
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page not found - Andy Shulman</title>
    <meta name="robots" content="noindex" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <style>
      body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;background:#111;color:#f5f5f4;text-align:center;padding:1rem}
      a{color:#fb923c}
      ul{list-style:none;padding:0}
      li{margin:.4rem 0}
    </style>
  </head>
  <body>
    <main>
      <h1>404: this stop isn't on the line</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p><a href="/">Back to the station</a></p>
      <ul>
${allCaseStudies.map((c) => `        <li><a href="/${c.id}">${esc(c.title)}</a></li>`).join("\n")}
      </ul>
    </main>
  </body>
</html>
`,
);
console.log(`SEO pages: ${pages.map((p) => p.path).join(", ")} + sitemap.xml + 404.html`);
