# Haris Family Dentistry and Cosmetic Center

Jekyll website published by GitHub Pages from the root of `master` at
https://harisfamilydentistry.com. The original Haris logo, pink-red colour
(`#c94d5d`) and Nueva typography are retained.

## Run locally

Install Ruby 3.2 or newer and Bundler, then:

```sh
bundle install
npm run dev
```

Open http://127.0.0.1:4000. Node/npm is only a convenient script runner;
`sh scripts/jekyll.sh serve --host 127.0.0.1 --port 4000` also works.

```sh
npm run build
npm run check
```

`_site` was already tracked in this repository and is also used by the existing
cPanel copy configuration. Build before committing so the generated copy matches
the source. GitHub Pages itself builds the source from `master`.

## Content

- `_data/clinic.yml`: address, phone numbers and Facebook links.
- `_data/doctors.yml`: doctor profiles.
- `_data/gallery.json`: all supplied images, captions, categories and provenance, including updated doctor posters.
- `_treatments/`: dental information, retaining the original URLs.
- `assets/css/site.css` and `assets/js/site.js`: shared styling and interactions.
- `docs/content-notes.md`: editorial decisions and supplied-image references.

Gallery originals have descriptive filenames and remain byte-for-byte identical
to the supplied files. Lightweight WebP previews are used in image grids.
Screenshot black margins are hidden with CSS, preserving the original artwork
and its text. The viewer supports keyboard arrows, Escape, enlargement and
opening the original. Filters and search are reflected in shareable URLs.

The optional appointment date uses locally hosted Flatpickr 4.6.13, with past dates
disabled and a native date-input fallback if JavaScript is unavailable. The pinned
npm package is retained for reproducible vendor updates.

Appointment requests open WhatsApp or the visitor's email app. The visitor must
send the message and wait for the clinic to confirm. There is no booking backend
or claim of an automatically confirmed appointment.

To re-import the same photo batches (Python with Pillow required):

```sh
python3 scripts/import-gallery.py /path/to/batch-a /path/to/batch-b
```

## Publish

After building and checking:

```sh
git add .
git commit -m "Update clinic website"
git push origin master
```

No new hosting service or deployment framework is required.

## Search and local-business information

The public domain is also stored as `production_url`, so local preview builds
cannot accidentally publish localhost canonical or sitemap URLs.

- `/sitemap.xml` is generated from indexable pages and both collections. Its
  gallery entry includes every original image, including later doctor-profile updates. New content is included on build.
- `/robots.txt` allows crawling and points to the public sitemap.
- Each indexable page has a unique title/description, an HTTPS canonical,
  Open Graph/Twitter metadata and schema.org JSON-LD.
- Dentist, WebSite, WebPage, doctor Person and BreadcrumbList data reflect the
  site content. No reviews, ratings, opening hours or qualifications are invented.
- The 404 page and duplicate assessment-summary URL are marked `noindex` and
  excluded from the sitemap. The duplicate points to `/evaluation/` as canonical.
- Image filenames, alt text, visible poster captions and crawlable original links
  help people and search engines understand the supplied artwork.

The clinic's supplied Maps link is in `_data/clinic.yml`; the interactive embed
uses that exact business listing at zoom 17. Accessible zoom-in, zoom-out and
reset controls work on mobile without an API key. The listing's pin currently
appears south of the written Dhanmondi address. The clinic owner should correct or
confirm that pin in Google Business Profile. Structured data deliberately omits
geographic coordinates until the pin and written address agree.

After publishing, the owner can submit `https://harisfamilydentistry.com/sitemap.xml`
in [Google Search Console](https://search.google.com/search-console) and Bing
Webmaster Tools. If Google supplies an HTML verification token, add its value as
`google_site_verification` in `_config.yml`. Ownership verification and sitemap
submission require access to the owner's search account; deployment does not
perform these account actions or guarantee rankings/indexing.

Implementation references: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[local-business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business),
[title guidance](https://developers.google.com/search/docs/appearance/title-link) and
[description guidance](https://developers.google.com/search/docs/appearance/snippet).

Updated doctor designations, degrees and advanced training are maintained in
`_data/doctors.yml`. The two later doctor-supplied posters are preserved alongside
the 51 original batch images, giving 53 gallery entries. Re-importing the original
batches preserves later profile-update records. Portraits and full profile
posters have separate fields so the approved portrait framing remains consistent.
