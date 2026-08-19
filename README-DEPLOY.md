# CFO Accounting - GitHub and Vercel deployment

This folder is the deployment root. Upload its contents to the root of a GitHub repository, then import that repository into Vercel as an **Other** project with no framework preset and no build command.

## Required Vercel environment variables

Add these in **Vercel > Project Settings > Environment Variables** before testing the forms:

- `RESEND_API_KEY` - a Resend API key for the verified sending domain.
- `CONTACT_TO_EMAIL` - the inbox that should receive enquiries, normally `consult@cfoaccounting.co.uk`.
- `CONTACT_FROM_EMAIL` - a sender on the verified domain, for example `CFO Accounting Website <website@cfoaccounting.co.uk>`.

Redeploy after adding or changing environment variables. The enquiry and callback forms use `/api/contact` and `/api/callback`, and redirect successful submissions to `/thank-you`. Until the email variables are configured, forms return a clear setup error instead of showing a false success message.

## Google Analytics

Open `site-config.js` and add the real GA4 ID:

```js
window.CFO_SITE_CONFIG = {
  gaMeasurementId: "G-XXXXXXXXXX"
};
```

Analytics loads only after the visitor accepts optional cookies. Phone clicks, email clicks and successful forms push events to `dataLayer`.

## Domain and indexing

1. Connect the final domain in Vercel and set the preferred `www` or non-`www` version.
2. Update the canonical domain in HTML and `sitemap.xml` if it is not `https://www.cfoaccounting.co.uk`.
3. Submit `/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
4. Confirm the live source contains `index, follow` and no `noindex` tag.

## Details to replace when supplied by the owner

- Exact registered legal entity, active Companies House number, registered address, ICO number and AML supervisor/reference.
- Real Google Business Profile, Trustpilot and social-profile URLs.
- Real verified reviews. No fabricated reviews or aggregate rating schema is included.
- Confirmed Google Analytics ID.
- Confirmed FCA position before adding prominent credit-broking or lender-introduction claims.

## Included production features

- Clean Vercel URLs and legacy redirects.
- Responsive 404 and thank-you pages.
- Serverless contact and callback endpoints with a honeypot and consent checkbox.
- Cookie consent that blocks optional analytics until permission.
- Sitemap, robots directives, canonical tags, Open Graph data and structured data.
- Funding hub, R&D tax relief, government grants, financial statements, business valuation and 2026 grants guide.
- Keyboard focus, skip navigation, reduced-motion support and mobile layouts.
- A redesigned homepage hero, consistent responsive section spacing and a reorganised site-wide footer.
- Descriptive local WebP content images; the deployable site has no remote stock-image dependency.
- `node verify-site.mjs` checks page routes, hash targets, legal pages, form endpoints and local assets before deployment.
