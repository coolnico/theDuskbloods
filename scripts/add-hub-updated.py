# -*- coding: utf-8 -*-
"""Add hub intro.updatedAt labels and refresh llms/sitemap helpers."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MESSAGES = ROOT / "src" / "messages"
LOCALES = ["en", "ja", "zh", "zh-TW", "es", "fr", "de", "ko", "it", "pt", "ru"]

UPDATED = {
    "en": "Last updated: October 19, 2026",
    "ja": "最終更新：2026年10月19日",
    "zh": "最后更新：2026年10月19日",
    "zh-TW": "最後更新：2026年10月19日",
    "es": "Última actualización: 19 de octubre de 2026",
    "fr": "Dernière mise à jour : 19 octobre 2026",
    "de": "Zuletzt aktualisiert: 19. Oktober 2026",
    "ko": "최종 업데이트: 2026년 10월 19일",
    "it": "Ultimo aggiornamento: 19 ottobre 2026",
    "pt": "Última atualização: 19 de outubro de 2026",
    "ru": "Последнее обновление: 19 октября 2026",
}

# namespaces that get intro.updatedAt
HUBS = ("gameplay", "characters", "maps", "kin")


def main() -> None:
    for loc in LOCALES:
        path = MESSAGES / f"{loc}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        for ns in HUBS:
            intro = data.setdefault(ns, {}).setdefault("intro", {})
            intro["updatedAt"] = UPDATED[loc]
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("hub updated", loc)


if __name__ == "__main__":
    main()
