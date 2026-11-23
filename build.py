#!/usr/bin/env python3
"""Build Menu Studio into one self-contained HTML file.

    python3 build.py                      -> index.html (the public GitHub Pages version)
    python3 build.py --adobe-arabic DIR   -> dist/Menu_Studio_internal.html, with the licensed
                                             Adobe Arabic fonts (AdobeArabic-Regular/-Bold/-Italic
                                             .woff2 or .otf in DIR) built in. Never commit that file.

Only the Python standard library is needed.
"""
import base64, json, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')
p = lambda *a: os.path.join(SRC, *a)
read = lambda *a: open(p(*a), encoding='utf-8').read()
b64 = lambda path: base64.b64encode(open(path, 'rb').read()).decode()
font = lambda name: b64(p('fonts', name))

LAT = ('U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,'
       'U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD')
LATEXT = ('U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+2020,'
          'U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF')
ARAB = ('U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,'
        'U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC')
ff = lambda fam, data, extra='': (f"@font-face{{font-family:'{fam}';{extra}"
                                   f"src:url(data:font/woff2;base64,{data}) format('woff2');}}\n")


def diya_fonts(adobe_dir):
    css = ff('EB Garamond V', font('eb-garamond-latin-wght-normal.woff2'), 'font-style:normal;font-weight:400 800;')
    css += ff('EB Garamond V', font('eb-garamond-latin-wght-italic.woff2'), 'font-style:italic;font-weight:400 800;')
    if adobe_dir:  # licensed build (internal use only)
        for name, w, st in (('Regular', 400, 'normal'), ('Bold', 700, 'normal'), ('Italic', 400, 'italic')):
            f = next(os.path.join(adobe_dir, f'AdobeArabic-{name}.{e}') for e in ('woff2', 'otf')
                     if os.path.exists(os.path.join(adobe_dir, f'AdobeArabic-{name}.{e}')))
            fmt = 'woff2' if f.endswith('woff2') else 'opentype'
            css += (f"@font-face{{font-family:'AdobeArabicE';font-weight:{w};font-style:{st};"
                    f"src:url(data:font/{fmt};base64,{b64(f)}) format('{fmt}');}}\n")
    else:  # public build: Noto Naskh Arabic (OFL), scaled to Adobe Arabic's width
        for w in (400, 700):
            css += ff('AdobeArabicE', font(f'noto-naskh-arabic-arabic-{w}-normal.woff2'),
                      f'font-weight:{w};font-style:normal;size-adjust:72.5%;')
    return css


def tayo_fonts():
    css = ''
    for w in (400, 500, 700):
        css += ff('Spectral T', font(f'spectral-latin-{w}-normal.woff2'), f'font-weight:{w};unicode-range:{LAT};')
        css += ff('Spectral T', font(f'spectral-latin-ext-{w}-normal.woff2'), f'font-weight:{w};unicode-range:{LATEXT};')
    for sub, rng in (('arabic', ARAB), ('latin', LAT), ('latin-ext', LATEXT)):
        css += ff('Readex T', font(f'readex-pro-{sub}-wght-normal.woff2'), f'font-weight:160 700;unicode-range:{rng};')
    return css


def build(adobe_dir=None):
    head = (read('app_head.html').replace('/*FONTS*/', read('fonts', 'base-fonts.css'))
            .replace('/*DIYAFONTS*/', diya_fonts(adobe_dir)).replace('/*TAYOFONTS*/', tayo_fonts()))
    diya = (read('diya_seed.js').replace('__AT_TEAS__', read('data', 'at_teas.json'))
            .replace('__DR_TEAS__', read('data', 'dr_teas.json'))
            .replace('__DIYA_LOGO__', 'data:image/png;base64,' + b64(p('assets', 'diya_logo.png'))))
    tayo = (read('tayo_seed.js').replace('__TAYO_DATA__', read('data', 'tayo_seed_data.json'))
            .replace('__TAYO_LOGO__', 'data:image/png;base64,' + b64(p('assets', 'tayo_logo.png'))))
    js = ('const LOGOS=' + read('data', 'logos.json') + ';\n'
          'const TAYO_ART=' + read('data', 'tayo_art.json') + ';\n'
          'const DIYA_ILLUS="data:image/jpeg;base64,' + b64(p('assets', 'diya_illustration.jpg')) + '";\n'
          + '\n'.join([read('seed.js'), diya, tayo, read('engine.js'), read('diya_engine.js'),
                       read('tayo_engine.js'), read('sync.js'), read('app.js')]))
    return head + '<script>\n' + js + '\n</script>\n</body>\n</html>\n'


if __name__ == '__main__':
    args = sys.argv[1:]
    if args[:1] == ['--adobe-arabic'] and len(args) > 1:
        os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
        out = os.path.join(ROOT, 'dist', 'Menu_Studio_internal.html')
        html = build(args[1])
    else:
        out = os.path.join(ROOT, 'index.html')
        html = build()
    open(out, 'w', encoding='utf-8').write(html)
    print(f'Wrote {os.path.relpath(out, ROOT)} ({len(html) / 1e6:.1f} MB)')
