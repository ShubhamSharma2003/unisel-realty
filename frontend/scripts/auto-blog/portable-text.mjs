// Article JSON -> Sanity Portable Text, matching what blog/[slug]/page.tsx
// renders: h2/h3 headings, bullet lists, strong/em marks and link annotations.

import { randomBytes } from "node:crypto";

export const key = () => randomBytes(6).toString("hex");

// Tolerates stray spaces inside the parentheses: the model sometimes writes "]( /path)".
const LINK = /\[([^\]]+)\]\(\s*([^)\s]+)\s*\)/g;
const INLINE = /\[([^\]]+)\]\(\s*([^)\s]+)\s*\)|\*\*([^*]+)\*\*/g;

/** Plain text of a string that may hold [anchor](href) and **bold** markup. */
export const stripMarkup = (text) => text.replace(LINK, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

export const countWords = (text) => stripMarkup(text).split(/\s+/).filter(Boolean).length;

/** The URL without tracking parameters, or null if it does not parse. */
export function stripTracking(href) {
  try {
    const url = new URL(href);
    for (const param of [...url.searchParams.keys()]) {
      if (/^(utm_|fbclid$|gclid$)/.test(param)) url.searchParams.delete(param);
    }
    return url;
  } catch {
    return null;
  }
}

const safeDecode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

/**
 * Canonical form used to compare URLs the model cites with URLs it actually
 * read. Decoded, because the model may write "%3D" in a path as "=".
 */
export function normalizeUrl(href) {
  const url = stripTracking(href);
  if (!url) return null;
  return safeDecode(`${url.hostname.toLowerCase().replace(/^www\./, "")}${url.pathname.replace(/\/+$/, "")}${url.search}`);
}

const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });

/**
 * Builds spans for one block. Each link goes through `resolveHref`, which
 * returns the href to keep, or null to drop the link but keep its anchor text.
 */
function inline(text, resolveHref, report) {
  const children = [];
  const markDefs = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) children.push(span(text.slice(last, m.index)));
    if (m[1] !== undefined) {
      const href = resolveHref(m[2]);
      if (href) {
        const markKey = key();
        markDefs.push({ _type: "link", _key: markKey, href });
        children.push(span(m[1], [markKey]));
        report.links.push(href);
      } else {
        children.push(span(m[1]));
        report.dropped.push(m[2]);
      }
    } else {
      children.push(span(stripMarkup(m[3]), ["strong"]));
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) children.push(span(text.slice(last)));
  return { children: children.length ? children : [span("")], markDefs };
}

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Rough HTML render of Portable Text, for reviewing a dry run in a browser. */
export function toHtml(blocks) {
  const html = [];
  let inList = false;
  for (const block of blocks) {
    const inner = block.children
      .map((child) => {
        let text = escapeHtml(child.text);
        for (const mark of child.marks) {
          const link = block.markDefs.find((d) => d._key === mark);
          if (link) text = `<a href="${escapeHtml(link.href)}">${text}</a>`;
          else if (mark === "strong") text = `<strong>${text}</strong>`;
          else if (mark === "em") text = `<em>${text}</em>`;
        }
        return text;
      })
      .join("");
    if (block.listItem && !inList) html.push("<ul>");
    if (!block.listItem && inList) html.push("</ul>");
    inList = Boolean(block.listItem);
    const tagName = block.listItem ? "li" : block.style === "normal" ? "p" : block.style;
    html.push(`<${tagName}>${inner}</${tagName}>`);
  }
  if (inList) html.push("</ul>");
  return html.join("\n");
}

export function articleToPortableText(article, { resolveHref, sources, note }) {
  const report = { links: [], dropped: [], duplicates: 0 };
  const blocks = [];

  const paragraph = (text, extra = {}) =>
    blocks.push({ _type: "block", _key: key(), style: "normal", ...inline(text, resolveHref, report), ...extra });
  const bullet = (text) => paragraph(text, { listItem: "bullet", level: 1 });
  const heading = (text, style) =>
    blocks.push({ _type: "block", _key: key(), style, markDefs: [], children: [span(stripMarkup(text))] });

  // The model occasionally repeats the intro as the first section's body.
  const written = new Set();
  const isNew = (text) => {
    const k = stripMarkup(text).replace(/\s+/g, " ").trim().toLowerCase();
    if (written.has(k)) {
      report.duplicates++;
      return false;
    }
    written.add(k);
    return true;
  };

  article.intro.filter(isNew).forEach((text) => paragraph(text));

  for (const section of article.sections) {
    const body = section.body.filter((item) => isNew(item.text));
    if (!body.length) continue;
    heading(section.heading, "h2");
    for (const item of body) {
      if (item.type === "bullet") bullet(item.text);
      else paragraph(item.text);
    }
  }

  if (article.faqs.length) {
    heading("Frequently asked questions", "h2");
    for (const faq of article.faqs) {
      heading(faq.question, "h3");
      paragraph(faq.answer);
    }
  }

  heading("Sources", "h2");
  for (const source of sources) {
    bullet(`[${source.publisher}: ${source.title}](${source.url})`);
  }

  blocks.push({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [span(note, ["em"])] });

  return { blocks, report };
}
