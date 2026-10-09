import os, re

pages_dir = os.path.join(os.path.dirname(__file__), '..', 'pages')

for fname in sorted(os.listdir(pages_dir)):
    if not fname.endswith('.js'):
        continue
    path = os.path.join(pages_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    # Fix pre tags: color '#333' in a pre style should be '#d4d4d4' (light on dark code block bg)
    content = re.sub(
        r"(<pre style=\{\{)color: '#333'(, margin:)",
        r"\1color: '#d4d4d4'\2",
        content
    )
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {fname}')
    else:
        print(f'OK: {fname}')

print('Done.')
