# -*- coding: utf-8 -*-
"""Add official-image credit lines (Plan B: keep hotlinks, strengthen attribution)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MESSAGES = ROOT / "src" / "messages"
LOCALES = ["en", "ja", "zh", "zh-TW", "es", "fr", "de", "ko", "it", "pt", "ru"]

# Shared credit: official media + independent editorial work
CREDITS = {
    "en": {
        "characters": (
            "Character art and screenshots are official materials © FromSoftware / Nintendo. "
            "Roster notes, playstyle tips, and rankings on this page are independent fan analysis, not official guidance."
        ),
        "home": (
            "Screenshots are official materials © FromSoftware / Nintendo. "
            "Site copy and analysis are independent and unofficial."
        ),
        "article": (
            "Images in this article are official materials © FromSoftware / Nintendo. "
            "Rankings, commentary, and recommendations are our own."
        ),
    },
    "zh": {
        "characters": (
            "角色立绘与截图为 FromSoftware / Nintendo 官方素材。"
            "本页的角色说明、打法要点与评价为粉丝独立分析，非官方指引。"
        ),
        "home": (
            "截图来自 FromSoftware / Nintendo 官方素材。站内文案与分析为独立非官方内容。"
        ),
        "article": (
            "本文配图为 FromSoftware / Nintendo 官方素材。排名、评论与建议为本站独立观点。"
        ),
    },
    "zh-TW": {
        "characters": (
            "角色立繪與截圖為 FromSoftware / Nintendo 官方素材。"
            "本頁的角色說明、打法要點與評價為粉絲獨立分析，非官方指引。"
        ),
        "home": (
            "截圖來自 FromSoftware / Nintendo 官方素材。站內文案與分析為獨立非官方內容。"
        ),
        "article": (
            "本文配圖為 FromSoftware / Nintendo 官方素材。排名、評論與建議為本站獨立觀點。"
        ),
    },
    "ja": {
        "characters": (
            "キャラクターアートとスクリーンショットは FromSoftware / Nintendo の公式素材です。"
            "本ページの解説・プレイ所見・評価はファンによる独立分析であり、公式ガイドではありません。"
        ),
        "home": (
            "スクリーンショットは FromSoftware / Nintendo の公式素材です。サイト本文と分析は独立した非公式コンテンツです。"
        ),
        "article": (
            "本記事の画像は FromSoftware / Nintendo の公式素材です。ランキング・コメント・推奨は当サイトの独自見解です。"
        ),
    },
    "es": {
        "characters": (
            "El arte de personajes y las capturas son materiales oficiales © FromSoftware / Nintendo. "
            "Las notas, consejos de juego y valoraciones de esta página son análisis independientes de fans, no guía oficial."
        ),
        "home": (
            "Las capturas son materiales oficiales © FromSoftware / Nintendo. "
            "Los textos y análisis del sitio son independientes y no oficiales."
        ),
        "article": (
            "Las imágenes de este artículo son materiales oficiales © FromSoftware / Nintendo. "
            "Los rankings, comentarios y recomendaciones son propios."
        ),
    },
    "fr": {
        "characters": (
            "Les artworks de personnages et captures sont des supports officiels © FromSoftware / Nintendo. "
            "Les notes, conseils de jeu et classements de cette page sont des analyses de fans indépendantes, non un guide officiel."
        ),
        "home": (
            "Les captures sont des supports officiels © FromSoftware / Nintendo. "
            "Les textes et analyses du site sont indépendants et non officiels."
        ),
        "article": (
            "Les images de cet article sont des supports officiels © FromSoftware / Nintendo. "
            "Classements, commentaires et recommandations sont les nôtres."
        ),
    },
    "de": {
        "characters": (
            "Charaktergrafiken und Screenshots sind offizielle Materialien © FromSoftware / Nintendo. "
            "Hinweise, Spiel-Tipps und Bewertungen auf dieser Seite sind unabhängige Fan-Analysen, keine offizielle Anleitung."
        ),
        "home": (
            "Screenshots sind offizielle Materialien © FromSoftware / Nintendo. "
            "Texte und Analysen der Website sind unabhängig und inoffiziell."
        ),
        "article": (
            "Bilder in diesem Artikel sind offizielle Materialien © FromSoftware / Nintendo. "
            "Rankings, Kommentare und Empfehlungen sind unsere eigenen."
        ),
    },
    "ko": {
        "characters": (
            "캐릭터 아트와 스크린샷은 FromSoftware / Nintendo의 공식 자료입니다. "
            "본 페이지의 캐릭터 설명·플레이 팁·평가는 팬 독립 분석이며 공식 가이드가 아닙니다."
        ),
        "home": (
            "스크린샷은 FromSoftware / Nintendo의 공식 자료입니다. 사이트 본문과 분석은 독립적인 비공식 콘텐츠입니다."
        ),
        "article": (
            "본 문서의 이미지는 FromSoftware / Nintendo의 공식 자료입니다. 순위·코멘트·추천은 본 사이트의 독립 의견입니다."
        ),
    },
    "it": {
        "characters": (
            "Arte dei personaggi e screenshot sono materiali ufficiali © FromSoftware / Nintendo. "
            "Note, consigli di gioco e valutazioni in questa pagina sono analisi indipendenti di fan, non una guida ufficiale."
        ),
        "home": (
            "Gli screenshot sono materiali ufficiali © FromSoftware / Nintendo. "
            "Testi e analisi del sito sono indipendenti e non ufficiali."
        ),
        "article": (
            "Le immagini in questo articolo sono materiali ufficiali © FromSoftware / Nintendo. "
            "Classifiche, commenti e consigli sono nostri."
        ),
    },
    "pt": {
        "characters": (
            "Arte de personagens e capturas são materiais oficiais © FromSoftware / Nintendo. "
            "Notas, dicas de jogo e avaliações desta página são análises independentes de fãs, não guia oficial."
        ),
        "home": (
            "As capturas são materiais oficiais © FromSoftware / Nintendo. "
            "Os textos e análises do site são independentes e não oficiais."
        ),
        "article": (
            "As imagens deste artigo são materiais oficiais © FromSoftware / Nintendo. "
            "Rankings, comentários e recomendações são nossos."
        ),
    },
    "ru": {
        "characters": (
            "Арт персонажей и скриншоты — официальные материалы © FromSoftware / Nintendo. "
            "Заметки, советы по игре и оценки на этой странице — независимый фан-анализ, а не официальное руководство."
        ),
        "home": (
            "Скриншоты — официальные материалы © FromSoftware / Nintendo. "
            "Тексты и аналитика сайта независимы и неофициальны."
        ),
        "article": (
            "Изображения в этой статье — официальные материалы © FromSoftware / Nintendo. "
            "Рейтинги, комментарии и рекомендации — наши собственные."
        ),
    },
}


def update_locale(locale: str) -> None:
    path = MESSAGES / f"{locale}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    c = CREDITS[locale]

    data.setdefault("characters", {})["imageCredit"] = c["characters"]
    data.setdefault("home", {}).setdefault("screenshots", {})["credit"] = c["home"]
    # shared label for article footers used by content pipeline notes
    data.setdefault("news", {})["imageCredit"] = c["article"]

    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("credits", locale)


if __name__ == "__main__":
    for loc in LOCALES:
        update_locale(loc)
