# -*- coding: utf-8 -*-
import json
from pathlib import Path

NOTES = {
    "en": (
        "Official screenshots and system facts reference materials published by "
        "FromSoftware / Nintendo (network test gameplay guide). Layout, analysis, "
        "and recommendations on this page are independent and unofficial."
    ),
    "zh": (
        "官方截图与系统事实参考 FromSoftware / Nintendo 公布的资料（网络测试玩法指南）。"
        "本页的版式、分析与建议为独立非官方内容。"
    ),
    "zh-TW": (
        "官方截圖與系統事實參考 FromSoftware / Nintendo 公布的資料（網路測試玩法指南）。"
        "本頁的版式、分析與建議為獨立非官方內容。"
    ),
    "ja": (
        "公式スクリーンショットとシステム情報は FromSoftware / Nintendo 公開資料"
        "（ネットワークテスト攻略ガイド）を参照しています。"
        "本ページの構成・分析・所見は独立した非公式コンテンツです。"
    ),
    "es": (
        "Las capturas oficiales y los datos de sistemas referencian materiales "
        "publicados por FromSoftware / Nintendo (guía del network test). "
        "El diseño, el análisis y las recomendaciones de esta página son independientes y no oficiales."
    ),
    "fr": (
        "Les captures officielles et les données systèmes référencent les supports "
        "publiés par FromSoftware / Nintendo (guide du network test). "
        "La mise en page, les analyses et les recommandations de cette page sont indépendantes et non officielles."
    ),
    "de": (
        "Offizielle Screenshots und Systemfakten beziehen sich auf Materialien von "
        "FromSoftware / Nintendo (Gameplay-Guide des Network Tests). "
        "Layout, Analyse und Empfehlungen dieser Seite sind unabhängig und inoffiziell."
    ),
    "ko": (
        "공식 스크린샷과 시스템 정보는 FromSoftware / Nintendo가 공개한 자료"
        "(네트워크 테스트 플레이 가이드)를 참조합니다. "
        "본 페이지의 구성·분석·조언은 독립적인 비공식 콘텐츠입니다."
    ),
    "it": (
        "Screenshot ufficiali e dati di sistema fanno riferimento a materiali pubblicati "
        "da FromSoftware / Nintendo (guida al network test). "
        "Layout, analisi e consigli di questa pagina sono indipendenti e non ufficiali."
    ),
    "pt": (
        "Capturas oficiais e dados de sistemas referenciam materiais publicados pela "
        "FromSoftware / Nintendo (guia do network test). "
        "O layout, as análises e as recomendações desta página são independentes e não oficiais."
    ),
    "ru": (
        "Официальные скриншоты и сведения о системах основаны на материалах "
        "FromSoftware / Nintendo (гайд сетевого теста). "
        "Структура, анализ и рекомендации этой страницы независимы и неофициальны."
    ),
}

base = Path(__file__).resolve().parents[1] / "src" / "messages"
for loc, note in NOTES.items():
    p = base / f"{loc}.json"
    data = json.loads(p.read_text(encoding="utf-8"))
    for ns in ("maps", "kin", "gameplay"):
        if ns not in data:
            print("missing", loc, ns)
            continue
        data[ns]["sourceNote"] = note
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("notes", loc)
