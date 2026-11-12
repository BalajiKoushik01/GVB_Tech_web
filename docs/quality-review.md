# Website quality review checklist

These are manual checks; recording them here does not mean they have been performed on a real device.

## Before merging

- Run `npm ci`, `npx tsc --noEmit`, `npm run lint`, `npm audit --audit-level=high` and `npm run build`.
- Check that all portfolio links resolve and all static project detail pages build.
- Inspect the desktop header, logo-to-home behaviour, mobile menu and keyboard focus states.
- Use the Project Guide and workflow calculator; verify reset/copy/email actions and input bounds.
- Verify article search, categories, article table of contents, reading progress and Back to Top.
- Confirm errors and empty states use understandable, non-accusatory text.
- Confirm animation does not obscure content or interfere with `prefers-reduced-motion`.

## Real-device and browser QA

Run at least one mobile-width and one desktop-width check in Chromium; repeat critical paths in Firefox and Safari when possible.

- At 320, 375, 768, 1024 and 1440 CSS pixels, look for clipped text, horizontal overflow, undersized hit targets and overlapping headings.
- Test tab/shift-tab keyboard navigation, visible focus and the escape/close behaviour of the mobile menu.
- Inspect images for meaningful alt text, aspect ratio and layout shift. Avoid stock imagery that implies an actual project.
- Test the contact form with a safe, authorised test entry. Verify database delivery, duplicate submission behaviour, an API outage and manual fallback.
- Verify preview vs production: build SHA, domain, redirects, security headers, sitemap and robots.
- Use Lighthouse / Chrome DevTools / WebPageTest or field data to measure LCP, INP and CLS under realistic throttling. **Do not invent scores.**

## Results log

| Date | Environment | Device/browser | Build SHA | Checks run | Findings / evidence | Reviewer |
| --- | --- | --- | --- | --- | --- | --- |
| _Add after testing_ | | | | | | |

Open an issue for every material finding, including its reproduction steps, expected result and screenshot or log where appropriate.
