#!/usr/bin/env python3
"""
Generate side-by-side HTML diffs between old and new book renders.

Usage:
    python scripts/generate_diffs.py <old_docs_dir> <new_docs_dir> <output_dir>

Outputs:
    <output_dir>/index.html        — index page listing all changes
    <output_dir>/<name>_diff.html  — individual diff per changed file
"""

import difflib
import json
import subprocess
import sys
from pathlib import Path

from bs4 import BeautifulSoup

EXCLUDE_DIRS = {"site_libs", "diffs"}

# Plain string — no escaping needed when referenced as {STYLE} in an f-string
STYLE = """
    body  { font-family: system-ui, sans-serif; max-width: 860px; margin: 2rem auto; padding: 0 1rem; color: #222; }
    h1    { font-size: 1.4rem; }
    h2    { font-size: 1.05rem; color: #555; margin-top: 2rem; border-bottom: 1px solid #ddd; padding-bottom: .3rem; }
    h3    { font-size: 0.95rem; color: #555; margin-top: 1.5rem; }
    ul    { padding-left: 1.4rem; }
    li    { margin: .3rem 0; }
    a     { color: #0066cc; }
    .none { color: #888; font-style: italic; }
    table { border-collapse: collapse; width: 100%; margin: 0.5rem 0; }
    th, td { text-align: left; padding: 0.3rem 0.6rem; border-bottom: 1px solid #eee; font-size: 0.9rem; }
    th    { font-weight: 600; color: #444; background: #f8f8f8; }
"""


def get_package_changes():
    """Compare renv.lock in git HEAD vs working tree. Returns dict or None."""
    try:
        old_text = subprocess.check_output(["git", "show", "HEAD:renv.lock"]).decode()
        old_pkgs = json.loads(old_text).get("Packages", {})
    except subprocess.CalledProcessError:
        return None
    try:
        with open("renv.lock") as f:
            new_pkgs = json.load(f).get("Packages", {})
    except FileNotFoundError:
        return None

    updated = [
        (pkg, old_pkgs[pkg]["Version"], new_pkgs[pkg]["Version"])
        for pkg in sorted(new_pkgs)
        if pkg in old_pkgs and new_pkgs[pkg]["Version"] != old_pkgs[pkg]["Version"]
    ]
    added = sorted(set(new_pkgs) - set(old_pkgs))
    removed = sorted(set(old_pkgs) - set(new_pkgs))
    return {"updated": updated, "added": added, "removed": removed}


def packages_html(pkg_changes) -> str:
    if pkg_changes is None:
        return '<p class="none">Package comparison unavailable.</p>'

    parts = []

    if pkg_changes["updated"]:
        rows = "".join(f"<tr><td>{pkg}</td><td>{old}</td><td>{new}</td></tr>" for pkg, old, new in pkg_changes["updated"])
        parts.append(
            f"<h3>Updated ({len(pkg_changes['updated'])})</h3>"
            f"<table><tr><th>Package</th><th>From</th><th>To</th></tr>{rows}</table>"
        )
    else:
        parts.append('<h3>Updated</h3><p class="none">None</p>')

    for label, key in (("Added", "added"), ("Removed", "removed")):
        items = pkg_changes[key]
        if items:
            lis = "".join(f"<li>{p}</li>" for p in items)
            parts.append(f"<h3>{label} ({len(items)})</h3><ul>{lis}</ul>")
        else:
            parts.append(f'<h3>{label}</h3><p class="none">None</p>')

    return "\n".join(parts)


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


def items_html(items, href_fn=None) -> str:
    """Render a list of items as an HTML <ul>, or a 'None' note if empty."""
    if not items:
        return '<p class="none">None</p>'
    lis = ""
    for item in items:
        label = str(item[0]) if isinstance(item, tuple) else str(item)
        href = href_fn(item) if href_fn else None
        if href:
            lis += '<li><a href="' + href + '">' + label + "</a></li>\n"
        else:
            lis += "<li>" + label + "</li>\n"
    return "<ul>\n" + lis + "</ul>"


def make_index(changed: list, added: list, removed: list, unchanged: list, pkg_changes) -> str:
    # Pre-compute all HTML sections so the f-string stays simple
    changed_html = items_html(changed, href_fn=lambda x: x[1])
    added_html = items_html(added)
    removed_html = items_html(removed)
    unchanged_html = items_html(unchanged)

    n_changed = len(changed)
    n_added = len(added)
    n_removed = len(removed)
    n_unchanged = len(unchanged)

    packages_section = packages_html(pkg_changes)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Update preview — diff index</title>
  <style>{STYLE}</style>
</head>
<body>
  <h1>Package update — diff index</h1>
  <p>Comparing the current production build against a build with updated packages.</p>

  <h2>Package changes</h2>
  {packages_section}

  <h2>Changed chapters ({n_changed})</h2>
  {changed_html}

  <h2>Added chapters ({n_added})</h2>
  {added_html}

  <h2>Removed chapters ({n_removed})</h2>
  {removed_html}

  <h2>Unchanged chapters ({n_unchanged})</h2>
  {unchanged_html}
</body>
</html>"""


def html_files(base: Path) -> set:
    return {p.relative_to(base) for p in base.rglob("*.html") if not any(part in EXCLUDE_DIRS for part in p.parts)}


def diff_filename(rel: Path) -> str:
    return str(rel).replace("/", "-").replace("\\", "-").replace(".html", "_diff.html")


def main():
    if len(sys.argv) != 4:
        print("Usage: generate_diffs.py <old_dir> <new_dir> <output_dir>")
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

    (out_dir / "index.html").write_text(
        make_index(changed, added, removed, unchanged, get_package_changes()), encoding="utf-8"
    )

    print(f"Diffs: {len(changed)} changed, {len(added)} added, {len(removed)} removed, {len(unchanged)} unchanged")
    for rel, _ in changed:
        print(f"  changed: {rel}")


if __name__ == "__main__":
    main()
