#!/usr/bin/env python3
"""Add systemRequirements English copy + nav label to en.json."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN = ROOT / "src" / "messages" / "en.json"

system_requirements = {
    "intro": {
        "eyebrow": "System Requirements",
        "title": "The Duskbloods System Requirements — What You Need to Play",
        "lead": "The Duskbloods is a Nintendo Switch 2 exclusive, so there is no PC spec sheet to chase. Here is what you actually need: the console, online membership for multiplayer, storage expectations, network, and accessories — confirmed vs. still unannounced.",
        "updatedAt": "Last updated: October 11, 2026",
    },
    "facts": {
        "eyebrow": "At a glance",
        "title": "Hardware checklist",
        "items": [
            {"label": "Platform", "value": "Nintendo Switch 2 only"},
            {"label": "PC / PS5 / Xbox", "value": "Not available"},
            {"label": "Display modes", "value": "TV, tabletop, handheld"},
            {"label": "Multiplayer", "value": "Up to 8 players online"},
            {"label": "Nintendo Switch Online", "value": "Required for online multiplayer"},
            {"label": "Storage", "value": "TBA — not announced"},
            {"label": "Internet", "value": "Broadband recommended for online"},
            {"label": "Players offline", "value": "Single-player mode included"},
        ],
    },
    "platform": {
        "eyebrow": "Platform",
        "title": "You need a Nintendo Switch 2",
        "paragraphs": [
            "The Duskbloods is developed by FromSoftware and published by Nintendo as a Nintendo Switch 2 exclusive. It does not run on the original Switch, and there is no PC minimum-spec table because there is no PC version — none announced for PS5 or Xbox either.",
            "That means the only real “requirement” is Nintendo’s current hardware: a Nintendo Switch 2 console with enough free storage once the eShop listing goes live, and a display you are happy with in TV, tabletop, or handheld mode. The network test ran exclusively on Switch 2, which is the same target for launch.",
            "If you already own a Switch 2, you are covered on hardware. If you are still deciding, watch for official bundles when the release date lands — Nintendo often pairs major exclusives with hardware SKUs.",
        ],
    },
    "online": {
        "eyebrow": "Online & accounts",
        "title": "Nintendo Switch Online for multiplayer",
        "paragraphs": [
            "The closed network test required a Nintendo Switch Online membership to participate. Expect full-game online multiplayer — the eight-player Dusk Battles — to need the same. A Nintendo Account is required for the eShop and for online play.",
            "Single-player is available without forming a full lobby, so you can learn systems offline. Crossplay does not apply: the game is Switch 2 only, so multiplayer is among Switch 2 players.",
            "A stable broadband connection is strongly recommended. The August test showed early-session server load and PvP latency issues; a wired adapter or solid 5 GHz Wi‑Fi will feel better than a congested 2.4 GHz network.",
        ],
    },
    "storage": {
        "eyebrow": "Storage & downloads",
        "title": "File size is still TBA",
        "paragraphs": [
            "Nintendo has not published an install size yet. It will appear on the Nintendo eShop product page when the listing goes live with the release date and pre-orders.",
            "As a practical floor, keep double-digit GB free on internal storage (or a fast microSD Express card for Switch 2) so preload and day-one patching are painless. Large multiplayer games often need room for the base install plus patches.",
        ],
    },
    "controllers": {
        "eyebrow": "Controllers & display",
        "title": "What plays well",
        "items": [
            {
                "title": "Joy-Con 2 / grip",
                "desc": "Full control support out of the box. Fine for handheld and casual TV sessions; combat timing may feel better with a full-size pad.",
            },
            {
                "title": "Nintendo Switch 2 Pro Controller",
                "desc": "Recommended if you plan to grind PvP. Sticks, triggers, and grip are more comfortable for longer Dusk Battle sessions.",
            },
            {
                "title": "TV mode",
                "desc": "Best for reading combat telegraphs and UI in multiplayer. 1080p/4K output depends on your TV and Switch 2 display settings.",
            },
            {
                "title": "Handheld mode",
                "desc": "Supported, as with other Switch 2 titles. Smaller UI can be harder in chaotic eight-player fights — use it for practice and House of Night time.",
            },
        ],
    },
    "checklist": {
        "eyebrow": "Before you buy",
        "title": "Ready-to-play checklist",
        "lead": "Work through this list when pre-orders open. Green items are known; anything marked TBA is waiting on Nintendo.",
        "items": [
            {"title": "Nintendo Switch 2 console", "desc": "Required. Original Switch will not run the game.", "required": True},
            {"title": "Nintendo Account", "desc": "Needed for eShop purchases and online play.", "required": True},
            {"title": "Nintendo Switch Online membership", "desc": "Required for online multiplayer (per network test). Single-player works without a full lobby.", "required": True},
            {"title": "Free storage space", "desc": "Exact size TBA. Keep ample headroom for preload and patches.", "required": False},
            {"title": "Stable internet", "desc": "Broadband recommended for eight-player PvPvE.", "required": False},
            {"title": "Pro Controller (optional)", "desc": "Comfort upgrade for long sessions and competitive play.", "required": False},
            {"title": "Release date + pre-order", "desc": "Still unannounced as of October 2026. Track our release-date hub.", "required": False},
        ],
    },
    "related": {
        "eyebrow": "Keep reading",
        "title": "Related guides & news",
        "items": [
            {
                "href": "/release-date",
                "title": "Release date hub",
                "desc": "Timeline, confirmed vs. rumored dates, and where the launch window stands.",
            },
            {
                "href": "/faq",
                "title": "Full FAQ",
                "desc": "Platforms, multiplayer, NSO, editions, and hardware questions answered.",
            },
            {
                "href": "/network-test",
                "title": "Network test recap",
                "desc": "What the August test needed for online play and what it said about servers.",
            },
            {
                "href": "/latest/duskbloods-network-test-review",
                "title": "Network test review",
                "desc": "Hands-on results: servers, lag, Virtue, and what it means for launch.",
            },
        ],
    },
    "note": {
        "title": "Unofficial fan site",
        "desc": "Requirements here summarize public Nintendo/FromSoftware information and the closed network test. Final specs, file size, and online requirements will be confirmed on official channels at launch.",
    },
    "cta": {
        "title": "Bookmark this page for final specs",
        "desc": "We will update storage, online requirements, and bundle notes the moment Nintendo publishes the eShop listing.",
    },
}

faq_additions = {
    "title": "Hardware & requirements",
    "items": [
        {
            "q": "What do I need to play The Duskbloods?",
            "a": "A Nintendo Switch 2 console. For online multiplayer you should also have a Nintendo Switch Online membership, based on the network test requirements. A Nintendo Account is required for the eShop and online play.",
        },
        {
            "q": "Is The Duskbloods on PC, PS5, or Xbox?",
            "a": "No. It is a Nintendo Switch 2 exclusive. There is no PC version and therefore no PC minimum or recommended spec list.",
        },
        {
            "q": "Can I play without Nintendo Switch Online?",
            "a": "Single-player is available. Online multiplayer — the core eight-player Dusk Battles — is expected to require Nintendo Switch Online, as the closed network test did.",
        },
        {
            "q": "How much storage space do I need?",
            "a": "The install size is not announced yet. It will show on the Nintendo eShop listing. Plan for headroom beyond the base install for day-one patches.",
        },
        {
            "q": "Does it work in handheld mode?",
            "a": "Yes. Like other Switch 2 titles it supports TV, tabletop, and handheld play. Competitive multiplayer may be easier to read on a larger screen.",
        },
    ],
}


def main() -> None:
    data = json.loads(EN.read_text(encoding="utf-8"))
    data["systemRequirements"] = system_requirements

    # nav label
    data["nav"]["systemRequirements"] = "System Requirements"

    # Metadata
    data["Metadata"]["systemRequirements"] = {
        "title": "The Duskbloods System Requirements — Switch 2, NSO & Storage",
        "description": "What you need to play The Duskbloods: Nintendo Switch 2 only, Nintendo Switch Online for multiplayer, storage (TBA), network tips, controllers, and a ready-to-play checklist.",
    }

    # Merge a 5th FAQ group if not present
    groups = data["faq"]["groups"]
    if not any(g.get("title") == faq_additions["title"] for g in groups):
        groups.append(faq_additions)

    EN.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    faq_count = sum(len(g["items"]) for g in data["faq"]["groups"])
    print(f"en.json updated — systemRequirements keys={list(system_requirements)}, faq questions={faq_count}")


if __name__ == "__main__":
    main()
