// Branded cover image for a post, rendered with the same next/og engine as
// the site's opengraph-image.tsx routes.

import { readFile } from "node:fs/promises";
// next has no "exports" map, so ESM needs the file extension.
import { ImageResponse } from "next/og.js";
import { createElement as h } from "react";

const WIDTH = 1600;
const HEIGHT = 1000;
// Blog cards crop the cover to ~1.23:1 and social previews to ~1.9:1, so all
// text stays inside the centre area that both crops keep.
const SAFE_X = 220;
const SAFE_Y = 110;

export async function renderCover({ title, tag, place, date }) {
  const logo = await readFile(new URL("../../public/images/header/new-logo-white.png", import.meta.url));
  // The bundled font has no rupee glyph.
  const text = title.replace(/₹\s?/g, "Rs ");
  const fontSize = text.length > 80 ? 60 : text.length > 55 ? 70 : 80;

  const image = new ImageResponse(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: `${SAFE_Y}px ${SAFE_X}px`,
          background: "linear-gradient(135deg, #172023 0%, #0b3a4d 55%, #0f7398 100%)",
          color: "#ffffff",
        },
      },
      h(
        "div",
        { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
        h("img", { src: `data:image/png;base64,${logo.toString("base64")}`, width: 194, height: 70 }),
        h(
          "div",
          {
            style: {
              display: "flex",
              fontSize: 26,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#9cc2dd",
              border: "2px solid rgba(156, 194, 221, 0.5)",
              borderRadius: 999,
              padding: "10px 26px",
            },
          },
          tag,
        ),
      ),
      h("div", { style: { display: "flex", fontSize, fontWeight: 700, lineHeight: 1.15 } }, text),
      h(
        "div",
        { style: { display: "flex", alignItems: "center", fontSize: 28, color: "#9cc2dd" } },
        h("div", { style: { width: 64, height: 4, background: "#79adff", marginRight: 20 } }),
        `${place}  ·  ${date}`,
      ),
    ),
    { width: WIDTH, height: HEIGHT },
  );

  return Buffer.from(await image.arrayBuffer());
}
