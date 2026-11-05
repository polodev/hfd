"""Check the built site for broken internal links and image-inventory mistakes."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / '_site'
errors = []

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
        self.headings = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'h1':
            self.headings += 1
        for name in ('src', 'href'):
            value = attrs.get(name)
            if value:
                self.links.append((tag, value))

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
if len(photos) != 51 or len({p['slug'] for p in photos}) != 51:
    errors.append('Gallery must contain 51 uniquely named images')
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

if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'Passed: {len(pages)} pages, internal links/anchors, CSS assets and all 51 original images.')
