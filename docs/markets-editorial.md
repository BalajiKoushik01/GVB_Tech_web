# GVB Markets publishing
Each edition is an immutable JSON file in `src/app/markets/content` named after its unique slug. Copy an existing edition's schema. Use the market session date in ISO format, the actual publication timestamp with timezone, and one of the categories allowed in articles.ts. Create a new file, never replace the archive. The site automatically regenerates the landing page, individual article URL and sitemap on deployment.
Publish factual, original summaries with source URLs. Verify dates and source access; never copy articles, offer stock-specific trade recommendations, republish restricted market data or fabricate figures. Distinguish intraday and closing coverage. Corrections should be clearly labelled and attributable. If no verified material is available, skip publication.
The public page has no write endpoint; repository access is the publishing trust boundary. JSON is schema checked at build time, content renders as escaped text, and source links must use HTTPS. Private stock watchlists are not public content.

## Editorial voice
Write like a careful Indian financial-news editor: clear, specific, and conversational without sounding casual or promotional.
- Lead with the most important verified event or market move. Use active verbs and concrete details; avoid generic openings such as "in a dynamic market landscape".
- Make headlines precise and useful, not clickbait. Explain what happened, then give context. Use short paragraphs, natural sentence rhythm, varied section headings and Indian English.
- Attribute numbers and reported causes to named sources. Distinguish intraday snapshots from closing figures. Where the cause is uncertain, say so; do not manufacture a narrative or a prediction.
- Avoid stock phrases, repetitive summaries, filler, excessive headings, needless jargon, hype and formulaic endings. Use no emojis, invented quotes, invented reporters or claims of human review.
- Keep articles original; a concise source-linked summary is better than padded or copied material. Do not imply inspected data is live.
- An explicitly authorised copy-edit may improve a previously published article in place without changing its slug, session date, publication timestamp or factual meaning. The repository records its revision; otherwise append new editions.
