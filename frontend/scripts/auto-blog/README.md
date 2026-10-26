# Auto blog

Publishes an original, sourced analysis of a recent Gurugram real estate news story to the blog, twice a week.

## What a run does

1. **Find news.** Pulls the last 7 days of headlines from Google News RSS (`news.mjs`).
2. **Research.** OpenAI's `gpt-6-luna` (Responses API with hosted web search, `openai.mjs`) picks the story most useful to buyers and investors. It skips celebrity, promotional and off-topic pieces and anything already on the blog. It also skips negative news about Unisel's builder partners: lawsuits, allegations, penalties, delays and complaints. The partner list is read from the `builderPartner` documents in Sanity on every run. It then reads the original reporting plus at least one independent source and writes a brief with a source URL for every fact. If nothing is worth an article it says so and the run ends without posting.
3. **Write.** A second call turns the brief into a structured article: an explainer intro, 4–6 question-style H2 sections, FAQs, and a source list. Internal links come from a fixed list: micromarket pages, service pages, property pages and earlier posts.
4. **Check.** The script removes any link that is not a real page on this site or a page the web search actually returned. It stops without publishing if the article has fewer than 2 verifiable sources, under 700 words, or fewer than 3 sections.
5. **Publish.** Renders a branded cover image, creates the `post` in Sanity, then calls `/api/revalidate` so `/blog`, the homepage and `sitemap.xml` update straight away.

Each run saves `brief.md`, `post.json`, `cover.png` and `preview.html` to `auto-blog-output/`. In GitHub Actions these are kept as a downloadable artifact for 30 days.

## Setup

Add three repository secrets in GitHub (Settings → Secrets and variables → Actions):

| Secret | Where to get it |
|---|---|
| `OPENAI_API_KEY` | platform.openai.com → API keys |
| `SANITY_API_WRITE_TOKEN` | sanity.io/manage → project `uqxf8913` → API → Tokens → Add API token, with **Editor** permissions |
| `SANITY_REVALIDATE_SECRET` | The same value as `SANITY_REVALIDATE_SECRET` in Vercel and `.env.local` |

Then do a test run: Actions → **Auto blog** → Run workflow → tick **dry run**. Download the artifact and open `preview.html`.

## Schedule and modes

- Runs Tuesdays and Fridays at 09:00 IST (`.github/workflows/auto-blog.yml`).
- **Draft** (default): the post waits in Sanity Studio until someone reviews and publishes it.
- **Publish**: the post goes live as soon as it passes the checks. To switch scheduled runs to this, set the repository variable `AUTO_BLOG_MODE` to `publish`. Manual runs let you pick either mode.
- On a public repository, GitHub pauses scheduled workflows after 60 days with no commits. Re-enable it from the Actions tab if that happens.

## Running locally

```bash
# needs OPENAI_API_KEY in .env.local or the environment
npm run blog:auto -- --dry-run           # generate and preview only
npm run blog:auto -- --draft             # create a draft in Sanity (needs SANITY_API_WRITE_TOKEN)
npm run blog:auto                        # publish
```

## Cost

Roughly $0.05–$0.20 per post with `gpt-6-luna` ($0.10 / $0.50 per 1M input / output tokens). Most of that is web search, which OpenAI bills at $10 per 1,000 calls; the script caps each run at 15 calls. Each run logs its token counts and search calls.

## Changing the model

`gpt-6-luna` is OpenAI's cheapest current model. If articles come out thin or miss facts, set the repository variable `AUTO_BLOG_MODEL` to a stronger model such as `gpt-6.1-sol` ($2 / $10 per 1M tokens, still well under $1 per post). Locally, set `AUTO_BLOG_MODEL` in `.env.local`.

## Notes

- Posts are written as "Unisel Realty" (`BLOG_AUTHOR` overrides this). Each post ends with a dated "not investment advice" note.
- Content uses `h2`/`h3` headings, bullet lists and link annotations. The site renders all of these. If the Studio's `post` schema doesn't list them, Studio may show warnings when someone edits an auto-generated post.
