#!/usr/bin/env python3
"""
Generate side-by-side HTML diffs between old and new book renders.

Usage:
    python scripts/generate_diffs.py <old_docs_dir> <new_docs_dir> <output_dir>

Outputs:
    <output_dir>/index.html        — index page listing all changes
    <output_dir>/<name>_diff.html  — individual diff per changed file
"""

import sys
import difflib
from pathlib import Path

from bs4 import BeautifulSoup

EXCLUDE_DIRS = {"site_libs", "diffs"}


def extract_text(html_path: Path) -> str:
    soup = BeautifulSoup(html_path.read_text(encoding="utf-8"), "html.parser")
    for tag in soup(["script", "style", "nav", "header", "footer"]):
        tag.decompose()
    return soup.get_text(separator="\n", strip=True)


def make_diff_page(old_lines: list, new_lines: list) -> str:
    return difflib.HtmlDiff(wrapcolumn=80).make_file(
        old_lines,
        new_lines,
        fromdesc="Before update",
        todesc="After update",
        context=True,
        numlines=3,
    )


def make_index(changed: list, added: list, removed: list, unchanged: list) -> str:
    def item_list(items, href_fn=None):
        if not items:
            return '<p class="none">None</p>'
        lis = ""
        for item in items:
            label = str(item[0]) if isinstance(item, tuple) else str(item)
            href = href_fn(item) if href_fn else None
            if href:
                lis += f'<li><a href="{href}">{label}</a></li>\n'
            else:
                lis += f"<li>{label}</li>\n"
        return f"<ul>{lis}</ul>"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Update preview — diff index</title>
  <style>
    body  {{ font-family: system-ui, sans-serif; max-width: 860px; margin: 2rem auto; padding: 0 1rem; color: #222; }}
    h1    {{ font-size: 1.4rem; }}
    h2    {{ font-size: 1.05rem; color: #555; margin-top: 2rem; border-bottom: 1px solid #ddd; padding-bottom: .3rem; }}
    ul    {{ padding-left: 1.4rem; }}
    li    {{ margin: .3rem 0; }}
    a     {{ color: #0066cc; }}
    .none {{ color: #888; font-style: italic; }}
  </style>
</head>
<body>
  <h1>Package update — diff index</h1>
  <p>Comparing the current production build against a build with updated packages.</p>

  <h2>🔴 Changed ({len(changed)})</h2>
  {item_list(changed, href_fn=lambda x: x[1])}

  <h2>🟢 Added ({len(added)})</h2>
  {item_list(added)}

  <h2>🗑 Removed ({len(removed)})</h2>
  {item_list(removed)}

  <h2>⚪ Unchanged ({len(unchanged)})</h2>
  {item_list(unchanged)}
</body>
</html>"""


def html_files(base: Path) -> set:
    return {
        p.relative_to(base)
        for p in base.rglob("*.html")
        if not any(part in EXCLUDE_DIRS for part in p.parts)
    }


def diff_filename(rel: Path) -> str:
    return str(rel).replace("/", "-").replace("\\", "-").replace(".html", "_diff.html")


def main():
    if len(sys.argv) != 4:
        print(f"Usage: {sys.argv[0]} <old_dir> <new_dir> <output_dir}")
        sys.exit(1)

    old_dir = Path(sys.argv[1])
    new_dir = Path(sys.argv[2])
    out_dir = Path(sys.argv[3])
    out_dir.mkdir(parents=True, exist_ok=True)

    old_set = html_files(old_dir) if old_dir.exists() else set()
    new_set = html_files(new_dir)

    changed, added, removed, unchanged = [], [], [], []

    for rel in sorted(new_set):
        if rel not in old_set:
            added.append(rel)
            continue

        old_text = extract_text(old_dir / rel)
        new_text = extract_text(new_dir / rel)

        if old_text == new_text:
            unchanged.append(rel)
        else:
            fname = diff_filename(rel)
            diff_html = make_diff_page(old_text.splitlines(), new_text.splitlines())
            (out_dir / fname).write_text(diff_html, encoding="utf-8")
            changed.append((rel, fname))

    for rel in sorted(old_set - new_set):
        removed.append(rel)

    (out_dir / "index.html").write_text(make_index(changed, added, removed, unchanged), encoding="utf-8")

    print(f"Diffs: {len(changed)} changed, {len(added)} added, {len(removed)} removed, {len(unchanged)} unchanged")
    for rel, _ in changed:
        print(f"  changed: {rel}")


if __name__ == "__main__":
    main()
