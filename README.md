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
- `_data/gallery.json`: all 51 supplied images, captions, categories and provenance.
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
