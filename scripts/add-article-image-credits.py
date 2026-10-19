# -*- coding: utf-8 -*-
"""Append official-image credit note to articles that hotlink FromSoftware media."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
MARK = "media.fromsoftware.jp"

NOTES = {
    "en": "\n\n---\n\n*Image credit: official materials © FromSoftware / Nintendo. Rankings and commentary are independent fan analysis.*\n",
    "zh": "\n\n---\n\n*配图来源：FromSoftware / Nintendo 官方素材。排名与评论为粉丝独立分析。*\n",
    "zh-TW": "\n\n---\n\n*配圖來源：FromSoftware / Nintendo 官方素材。排名與評論為粉絲獨立分析。*\n",
    "ja": "\n\n---\n\n*画像クレジット：FromSoftware / Nintendo の公式素材。ランキングとコメントは独立したファン分析です。*\n",
    "ru": "\n\n---\n\n*Источник изображений: официальные материалы © FromSoftware / Nintendo. Рейтинги и комментарии — независимый фан-анализ.*\n",
}

CREDIT_MARKER = "Image credit:"


def locale_for(path: Path) -> str:
    if path.parent.name == "content":
        return "en"
    return path.parent.name


def process(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    if MARK not in text:
        return
    if CREDIT_MARKER in text or "配图来源" in text or "画像クレジット" in text or "配圖來源" in text:
        return
    loc = locale_for(path)
    note = NOTES.get(loc, NOTES["en"])
    if not text.endswith("\n"):
        text += "\n"
    path.write_text(text + note, encoding="utf-8")
    print("credited", path.relative_to(ROOT))


def main() -> None:
    files = list(CONTENT.glob("*.md"))
    for sub in ("ja", "zh", "zh-TW", "ru"):
        files.extend((CONTENT / sub).glob("*.md"))
    for path in sorted(files):
        process(path)


if __name__ == "__main__":
    main()
