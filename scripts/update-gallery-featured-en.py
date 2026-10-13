#!/usr/bin/env python3
"""Gallery featured: 12 unique frames, 3 non-overlapping themes."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN = ROOT / "src" / "messages" / "en.json"

FEATURED_META = {
    "eyebrow": "FEATURED BREAKDOWN",
    "title": "Screenshot breakdowns — what these frames are really showing",
    "lead": "Twelve official stills, sorted into three non-overlapping reads: who the Bloodsworn are, how fights actually look, and how the world signals danger. Each note starts from what is on screen, then folds it back into match play.",
    "sourceNote": "Images are official screenshots © FromSoftware / Nintendo. Analysis is independent and unofficial.",
    "h2A": "Bloodsworn & blood craft",
    "h2B": "Combat, creatures & Blood Arts",
    "h2C": "World, routes & omens",
    "groupA": "a",
    "groupB": "b",
    "groupC": "c",
}

FEATURED = [
    # A — who they are
    {
        "group": "a",
        "n": 1,
        "title": "Archive hall — the hunter before the hunt",
        "desc": "A silver-haired fighter in an ornate coat crosses a vaulted gothic library: iron screens, reading desks, a wall of books. Quiet interior, aristocratic tailoring — the House of Night as study as much as staging ground. You learn a Bloodsworn by silhouette long before you learn their Blood Arts.",
        "keyword": "Bloodsworn archive House of Night costume",
    },
    {
        "group": "a",
        "n": 4,
        "title": "Rifle and saber — a two-hander lineup",
        "desc": "One fighter braces a long gun on a ridge; another crouches with twin sabers, mountains and a bruised sunset behind them. Pairing is the point: long-range pressure plus close threat is how a duo owns a lane. Expect these silhouettes to split roles the second the lobby fills.",
        "keyword": "Bloodsworn duo rifle saber team roles",
    },
    {
        "group": "a",
        "n": 14,
        "title": "Portrait study — costume as build tell",
        "desc": "Crouched close-up of the same silver-haired Bloodsworn: jeweled harness, wide cuffs, hair over one eye. In this game costume is data — house, lineage, and the blood craft you should respect. When a silhouette enters frame, you are already reading their kit.",
        "keyword": "Bloodsworn portrait costume design",
    },
    {
        "group": "a",
        "n": 22,
        "title": "Zork at the flooded shrine",
        "desc": "The diving-suit fighter sits in black water beside a mossy pale statue — swamp light, dead trees, a gate arch. Character vignettes like this whisper Compact and Kin themes without a tutorial. Slow frame in a fast game: worth a look before you queue.",
        "keyword": "Zork swamp statue Kin Compact shrine",
    },
    # B — how fights look
    {
        "group": "b",
        "n": 2,
        "title": "Clock-tower plaza free-for-all",
        "desc": "Cape fighter shoots, a woman channels a blue beam, a polearm giant braces — and bodies hang on spikes to the left. PvPvE in one still: players, environment, and the city as witness. Nobody is dueling politely; spacing is the whole fight.",
        "keyword": "PvPvE clock tower multi-fight Lowanro",
    },
    {
        "group": "b",
        "n": 5,
        "title": "Stairwell toad — PvE pressure on the route",
        "desc": "A katana user and a conical-hat hunter pinch a bloated red-eyed toad on a grand staircase. Readable maw, choke point, two angles: classic FromSoftware PvE geometry. These beasts are also resource nodes — Virtue, blood, and a third party you did not invite.",
        "keyword": "PvE toad monster stairs co-op",
    },
    {
        "group": "b",
        "n": 20,
        "title": "Fire-axe Art in a church duel",
        "desc": "A massive axe drags while a flame jet catches another Bloodsworn mid-dodge inside a pillared church. Blood Arts are loud on purpose — can you still see the body through the VFX? Eight-player readability starts here: trust the silhouette, not the fireworks.",
        "keyword": "Blood Arts fire duel PvP church",
    },
    {
        "group": "b",
        "n": 28,
        "title": "Torch cultists and hounds",
        "desc": "Hooded figures with torches and clubs advance with wolf-like dogs under a cathedral and a blood-red sky. This is the PvE chorus under every Dusk Battle — not a boss, but the map's immune system. Learn their tells before you blame a player for a bad trade.",
        "keyword": "PvE cultist mobs hounds cathedral",
    },
    # C — world & omens
    {
        "group": "c",
        "n": 3,
        "title": "Rooftop traversal above the spires",
        "desc": "A heavy-axe Bloodsworn leaps the skyline: moonlit spires, smokestacks, mountain fog. When the Grail starts culling, roofs and bridges are how you break line of sight and refuse a bad fight. In a stacked city, your route is part of your build.",
        "keyword": "rooftop mobility route Lowanro",
    },
    {
        "group": "c",
        "n": 6,
        "title": "Cliff path toward the hill church",
        "desc": "Long-katana fighter on a cliff trail, full moon, hilltop church ahead. This is the scouting beat of a Dusk Battle — you approach landmarks before you contest them. Fog, pine, and stone mark the wild edges where solo players can still breathe.",
        "keyword": "night scout church wilderness route",
    },
    {
        "group": "c",
        "n": 10,
        "title": "Blood-rose brand on the hand",
        "desc": "A pale hand rests over a table edge, a thorned blood-rose wound branded on the back. Pure omen imagery: Compact, lineage, or a price already paid. FromSoftware sells systems through props — treat this as a story item, not wallpaper.",
        "keyword": "blood rose brand Compact lore omen",
    },
    {
        "group": "c",
        "n": 16,
        "title": "Blood moon over the ruined walk",
        "desc": "A lone brimmed coat faces a crimson moon bleeding onto broken brick and a distant clock tower. The Twilight of Humanity thesis image — romantic, cosmic, ruined. Expect the First Blood to feel like weather hanging over every match, not a UI bar.",
        "keyword": "blood moon Twilight of Humanity First Blood",
    },
]


def main() -> None:
    data = json.loads(EN.read_text(encoding="utf-8"))
    data["gallery"]["featured"] = {**FEATURED_META, "items": FEATURED}
    EN.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("groups:", FEATURED_META["h2A"], "|", FEATURED_META["h2B"], "|", FEATURED_META["h2C"])
    for g in ("a", "b", "c"):
        items = [i for i in FEATURED if i["group"] == g]
        print(f"  [{g}] {[i['n'] for i in items]} {[i['title'][:28] for i in items]}")


if __name__ == "__main__":
    main()
