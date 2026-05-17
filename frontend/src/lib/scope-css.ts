/**
 * Scope CSS rules under a wrapper selector so an injected HTML document
 * doesn't leak globals (body/html/* resets) into the host site.
 *
 * Handles: @keyframes / @font-face passthrough, @media / @supports recursion,
 * body/html/:root rewriting, universal selector prefixing.
 */

export function scopeCss(css: string, scope: string): string {
    return processRules(css, scope);
}

function processRules(css: string, scope: string): string {
    const out: string[] = [];
    let i = 0;
    while (i < css.length) {
        while (i < css.length && /\s/.test(css[i])) {
            out.push(css[i]);
            i++;
        }
        if (i >= css.length) break;

        // Strip comments (keep structure simple)
        if (css[i] === "/" && css[i + 1] === "*") {
            const end = css.indexOf("*/", i + 2);
            if (end === -1) break;
            i = end + 2;
            continue;
        }

        if (css[i] === "@") {
            const atStart = i;
            let j = i + 1;
            while (j < css.length && css[j] !== ";" && css[j] !== "{") j++;
            const atRule = css.slice(atStart, j);

            if (j < css.length && css[j] === ";") {
                out.push(css.slice(atStart, j + 1));
                i = j + 1;
                continue;
            }

            if (
                /^@(-webkit-)?keyframes\b/.test(atRule) ||
                /^@font-face\b/.test(atRule) ||
                /^@page\b/.test(atRule)
            ) {
                let depth = 1;
                let k = j + 1;
                while (k < css.length && depth > 0) {
                    if (css[k] === "{") depth++;
                    else if (css[k] === "}") depth--;
                    k++;
                }
                out.push(css.slice(atStart, k));
                i = k;
                continue;
            }

            // @media, @supports → recurse inside
            let depth = 1;
            let k = j + 1;
            while (k < css.length && depth > 0) {
                if (css[k] === "{") depth++;
                else if (css[k] === "}") depth--;
                k++;
            }
            const inner = css.slice(j + 1, k - 1);
            out.push(atRule + "{" + processRules(inner, scope) + "}");
            i = k;
            continue;
        }

        let j = i;
        while (j < css.length && css[j] !== "{" && css[j] !== "}") j++;
        if (j >= css.length || css[j] === "}") {
            out.push(css.slice(i, j));
            i = j === css.length ? j : j + 1;
            continue;
        }
        const selectors = css.slice(i, j).trim();
        let depth = 1;
        let k = j + 1;
        while (k < css.length && depth > 0) {
            if (css[k] === "{") depth++;
            else if (css[k] === "}") depth--;
            k++;
        }
        const body = css.slice(j + 1, k - 1);

        const scoped = selectors
            .split(",")
            .map((raw) => {
                const s = raw.trim();
                if (!s) return s;
                if (s.startsWith(scope)) return s;
                if (/^(html|body|:root)\b(?![\w-])/.test(s)) {
                    const rest = s.replace(/^(html|body|:root)\b(?![\w-])/, "");
                    return scope + rest;
                }
                return scope + " " + s;
            })
            .filter(Boolean)
            .join(", ");
        out.push(scoped + "{" + body + "}");
        i = k;
    }
    return out.join("");
}
