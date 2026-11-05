"""Check the built site for broken internal links and image-inventory mistakes."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib
import json
import re
import sys
import xml.etree.ElementTree as ET
from urllib.robotparser import RobotFileParser

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / '_site'
errors = []

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
        self.headings = 0
        self.canonicals = []
        self.meta = {}
        self.title_parts = []
        self.in_title = False
        self.json_ld = []
        self.current_json = None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'title':
            self.in_title = True
        if tag == 'meta':
            self.meta[attrs.get('name', attrs.get('property', ''))] = attrs.get('content', '')
        if tag == 'link' and 'canonical' in attrs.get('rel', '').split():
            self.canonicals.append(attrs.get('href', ''))
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.current_json = []
        if tag == 'h1':
            self.headings += 1
        for name in ('src', 'href'):
            value = attrs.get(name)
            if value:
                self.links.append((tag, value))

    def handle_data(self, data):
        if self.in_title:
            self.title_parts.append(data)
        if self.current_json is not None:
            self.current_json.append(data)
    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'script' and self.current_json is not None:
            self.json_ld.append(''.join(self.current_json))
            self.current_json = None

pages = {}
for path in SITE.rglob('*.html'):
    parser = Links()
    parser.feed(path.read_text())
    pages[path.resolve()] = parser
    if parser.headings != 1:
        errors.append(f'{path.relative_to(SITE)}: expected one H1, found {parser.headings}')

for path, parser in pages.items():
    for tag, value in parser.links:
        split = urlsplit(value)
        if split.scheme or split.netloc or value == '#':
            continue
        target = SITE / unquote(split.path.lstrip('/')) if split.path.startswith('/') else path.parent / unquote(split.path)
        if not split.path:
            target = path
        if target.is_dir():
            target = target / 'index.html'
        if not target.exists() and target.suffix == '':
            target = target / 'index.html'
        if not target.exists():
            errors.append(f'{path.relative_to(SITE)}: missing {value}')
        elif split.fragment and target.resolve() in pages and unquote(split.fragment) not in pages[target.resolve()].ids:
            errors.append(f'{path.relative_to(SITE)}: missing anchor {value}')

photos = json.loads((ROOT / '_data/gallery.json').read_text())
original_batch_photos = [photo for photo in photos if photo['source_batch'] in {'batch-a', 'batch-b'}]
if len(original_batch_photos) != 51 or len({p['slug'] for p in photos}) != len(photos):
    errors.append('Gallery must retain the 51 original batch images and unique names for all artwork')
for photo in photos:
    source = ROOT / photo['image'].lstrip('/')
    if hashlib.sha256(source.read_bytes()).hexdigest() != photo['sha256']:
        errors.append(f"Original content changed: {photo['slug']}")
    for field in ('image', 'thumbnail'):
        if not (SITE / photo[field].lstrip('/')).exists():
            errors.append(f"Missing published gallery asset: {photo[field]}")

stylesheets = {SITE / urlsplit(value).path.lstrip('/') for parser in pages.values() for tag, value in parser.links if tag == 'link' and urlsplit(value).path.endswith('.css') and not urlsplit(value).scheme}
for css in stylesheets:
    for value in re.findall(r'url\([\'\"]?([^\)\'\"]+)',css.read_text()):
        if not urlsplit(value).scheme and not value.startswith('data:') and not (css.parent / value).exists():
            errors.append(f'Missing CSS asset: {value}')

# Search metadata and the sitemap must agree with the actual public domain,
# including when the local preview server rebuilds the generated directory.
public_root = 'https://' + (ROOT / 'CNAME').read_text().strip()
indexable_urls = set()
titles = set()
descriptions = set()
for path, parser in pages.items():
    relative = path.relative_to(SITE.resolve())
    label = str(relative)
    noindex = 'noindex' in parser.meta.get('robots', '')
    title = ''.join(parser.title_parts).strip()
    description = parser.meta.get('description', '')
    if len(parser.canonicals) != 1 or not parser.canonicals[0].startswith(public_root + '/'):
        errors.append(f'{label}: missing or invalid production canonical URL')
        continue
    canonical = parser.canonicals[0]
    if len(title) < 10 or len(description) < 60:
        errors.append(f'{label}: missing or unhelpfully short search metadata')
    for key in ['og:title','og:description','og:url','og:image','og:image:alt','twitter:card','twitter:title','twitter:description','twitter:image']:
        if not parser.meta.get(key):
            errors.append(f'{label}: missing {key}')
    if parser.meta.get('og:url') != canonical:
        errors.append(f'{label}: canonical and social URL disagree')
    if not noindex:
        indexable_urls.add(canonical)
        if title in titles or description in descriptions:
            errors.append(f'{label}: duplicate title or description')
        titles.add(title)
        descriptions.add(description)
        if not parser.json_ld:
            errors.append(f'{label}: missing structured data')
        for block in parser.json_ld:
            try:
                data = json.loads(block)
                graph = data['@graph']
                types = {node['@type'] for node in graph}
                if data['@context'] != 'https://schema.org' or not {'Dentist','WebSite','Person'}.issubset(types):
                    errors.append(f'{label}: incomplete structured data')
                page_nodes = [n for n in graph if n['@type'] in ['WebPage','ContactPage','AboutPage','CollectionPage']]
                if len(page_nodes) != 1 or page_nodes[0]['url'] != canonical:
                    errors.append(f'{label}: structured page URL disagrees with canonical')
                if any(not n['@id'].startswith(public_root + '/') for n in graph):
                    errors.append(f'{label}: structured data uses a non-production entity URL')
            except (ValueError, KeyError, TypeError) as e:
                errors.append(f'{label}: invalid JSON-LD: {e}')

try:
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'image': 'http://www.google.com/schemas/sitemap-image/1.1'}
    sitemap = ET.parse(SITE / 'sitemap.xml').getroot()
    listed = [node.text for node in sitemap.findall('s:url/s:loc', ns)]
    if len(listed) != len(set(listed)) or set(listed) != indexable_urls:
        errors.append(f'Sitemap coverage differs from indexable pages: {set(listed) ^ indexable_urls}')
    listed_images = [node.text for node in sitemap.findall('.//image:loc', ns)]
    expected_images = {public_root + photo['image'] for photo in photos}
    if len(listed_images) != len(expected_images) or set(listed_images) != expected_images:
        errors.append('Image sitemap does not cover every gallery original')
    if any(urlsplit(url).query or urlsplit(url).fragment for url in listed):
        errors.append('Sitemap must contain canonical paths without search parameters or fragments')
except (OSError, ET.ParseError) as e:
    errors.append(f'Invalid sitemap: {e}')

try:
    robots = (SITE / 'robots.txt').read_text()
    rules = RobotFileParser()
    rules.parse(robots.splitlines())
    if f'Sitemap: {public_root}/sitemap.xml' not in robots:
        errors.append('robots.txt is missing the production sitemap URL')
    if not rules.can_fetch('Googlebot', public_root + '/') or not rules.can_fetch('Googlebot', public_root + '/assets/css/site.css'):
        errors.append('robots.txt blocks public content or rendering assets')
except OSError as e:
    errors.append(f'Missing robots.txt: {e}')

if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'Passed: {len(pages)} pages, internal links/anchors, CSS assets, {len(photos)} originals, {len(indexable_urls)} sitemap URLs, image sitemap, robots.txt, unique metadata, canonicals and JSON-LD.')
