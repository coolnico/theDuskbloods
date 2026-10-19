# -*- coding: utf-8 -*-
from pathlib import Path

files = [
    Path("src/app/[locale]/latest/[slug]/page.tsx"),
    Path("src/app/[locale]/guides/[slug]/page.tsx"),
]

for p in files:
    t = p.read_text(encoding="utf-8")
    t = t.replace(
        "import { Calendar, ArrowLeft, Clock, Tag } from 'lucide-react';",
        "import { Calendar, ArrowLeft, Clock, Tag, User } from 'lucide-react';",
    )
    t = t.replace(
        "author: { '@type': 'Organization', name: SITE_NAME },",
        "author: { '@type': 'Organization', name: article.author || SITE_NAME, url: DOMAIN },",
    )
    old = (
        '            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">\n'
        '              <span className="flex items-center gap-1.5">\n'
        '                <Calendar className="h-3.5 w-3.5" />'
    )
    new = (
        '            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">\n'
        '              <span className="flex items-center gap-1.5">\n'
        '                <User className="h-3.5 w-3.5" />\n'
        '                <span itemProp="author">{article.author || SITE_NAME}</span>\n'
        '              </span>\n'
        '              <span className="flex items-center gap-1.5">\n'
        '                <Calendar className="h-3.5 w-3.5" />'
    )
    if old not in t:
        raise SystemExit(f"pattern missing in {p}")
    t = t.replace(old, new, 1)
    p.write_text(t, encoding="utf-8")
    print("updated", p)
