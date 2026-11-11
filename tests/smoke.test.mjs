// Smoke tests. Run after `npm run build`: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(p);

// Collect every "/images/..." string literal from the data sources.
const dataFiles = ["src/data/caseStudies.ts", "src/pages/casedata.tsx", "src/data/testimonials.ts"];
const imageRefs = (file) =>
  [...read(file).matchAll(/["'`](\/images\/[^"'`]+)["'`]/g)].map((m) => m[1]);
const ids = (file, key) => [...read(file).matchAll(new RegExp(`^\\s*${key}:\\s*"([^"]+)"`, "gm"))].map((m) => m[1]);

test("build output has index.html and referenced assets exist", () => {
  assert.ok(exists(path.join(dist, "index.html")), "dist/index.html missing (run npm run build)");
  const html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  const refs = [...html.matchAll(/(?:src|href)="(\/[^"#?]+\.(?:js|css|png|svg|ico|webp|jpg))"/g)].map((m) => m[1]);
  assert.ok(refs.some((r) => r.startsWith("/assets/")), "index.html references no /assets/ bundle");
  for (const r of refs) assert.ok(exists(path.join(dist, r)), `index.html references missing file ${r}`);
});

test("case study data: ids match and have required fields", () => {
  const listIds = ids("src/data/caseStudies.ts", "id");
  const pageIds = ids("src/pages/casedata.tsx", "id");
  assert.ok(listIds.length > 0, "no case studies found");
  for (const id of listIds) assert.ok(pageIds.includes(id), `case "${id}" has no entry in casedata.tsx`);
  const src = read("src/data/caseStudies.ts");
  for (const key of ["name", "tagline", "impact", "thumbnail", "color"]) {
    const n = [...src.matchAll(new RegExp(`^\\s*${key}:\\s*"`, "gm"))].length;
    assert.ok(n >= listIds.length, `field "${key}" present ${n}x for ${listIds.length} cases`);
  }
});

test("every image referenced by case data exists on disk and in dist", () => {
  const missing = [];
  for (const f of dataFiles) {
    for (const ref of new Set(imageRefs(f))) {
      if (!exists(path.join(root, "public", ref))) missing.push(`${f}: ${ref}`);
      else if (!exists(path.join(dist, ref))) missing.push(`${f}: ${ref} (not in dist)`);
    }
  }
  assert.deepEqual(missing, [], `missing images:\n${missing.join("\n")}`);
});

test("vercel.json is valid with prerendered-route rewrite and security headers", () => {
  const cfg = JSON.parse(read("vercel.json"));
  assert.ok(cfg.rewrites?.some((r) => r.destination.endsWith("/index.html")), "no rewrite to a prerendered index.html");
  const keys = (cfg.headers ?? []).flatMap((h) => h.headers.map((x) => x.key));
  assert.ok(keys.includes("Content-Security-Policy"), "CSP header missing");
});
