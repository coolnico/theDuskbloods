#!/usr/bin/env python3
"""Expand characters roster with detail-page fields (slug, role, playstyle, tips, lore)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN = ROOT / "src" / "messages" / "en.json"

# Detail copy keyed by roster order / slug
DETAILS = {
    "albert": {
        "slug": "albert",
        "role": "Balanced duelist",
        "tagline": "A jeweled saber and an SMG — flex between clean melee pressure and mid-range finishers.",
        "difficulty": 2,
        "playstyle": [
            "Albert is the roster’s most approachable all-rounder. Lorrik’s Jeweled Saber rewards clean spacing and stagger play, while the Submachine Gun lets you harass or confirm kills without committing to a full melee approach.",
            "His kit scales with blood caliber, so early Virtue and Blood upgrades feel immediately stronger. Blood Blade is a reliable poke; Light of Hayern is the burst tool when a target is staggered or pinned.",
        ],
        "tips": [
            {
                "title": "Bank Virtue early",
                "desc": "High Lorrik Blood grants extra uses of blood-based skills — more Virtue and blood pickups mean more Blades and beams per fight.",
            },
            {
                "title": "Hunt high-Virtue targets",
                "desc": "Upriser increases stagger against Bloodsworn who are already winning. Steal their momentum instead of farming weak players.",
            },
            {
                "title": "Saber for stagger, SMG for confirms",
                "desc": "Open with melee to fill the stagger gauge, then swap to the SMG when they try to disengage.",
            },
        ],
        "lore": [
            "Albert carries the jeweled saber of House Lorrik and a modern sidearm — a walking argument that the Twilight of Humanity still mixes aristocratic bloodline with industrial firepower.",
            "His Aspects (High Lorrik Blood, Upriser) read like a revolutionary’s manifesto: more power from blood craft, and extra pressure against those already crowned by Virtue.",
        ],
    },
    "bloodhand-jan": {
        "slug": "bloodhand-jan",
        "role": "Bruiser / sustain fighter",
        "tagline": "A bloodthirsty axe, counter-heals, and spellbound minions — win ugly, win long.",
        "difficulty": 3,
        "playstyle": [
            "Bloodhand Jan wants messy, close fights. The Bloodthirsty Axe hits hard and the Stone of Sorcery gives you a deceptive ranged option, but the real engine is counterattacking: Bloodhand Lineage restores HP when you trade after taking damage.",
            "Blink is your get-out and your re-engage. Surrender to My Blood is a area-denial burst — plant the axe, flood the ground with blood slashes, and dare anyone to walk in.",
        ],
        "tips": [
            {
                "title": "Trade on purpose",
                "desc": "Do not panic-heal every chip. Counterattack after hits to trigger Bloodhand Lineage and stay in the pocket.",
            },
            {
                "title": "Spellbind, then snowball",
                "desc": "Lord of Blood heals spellbound foes and boosts your attack. After a successful blood drink, press the advantage instead of resetting.",
            },
            {
                "title": "Blink is tempo",
                "desc": "Use Blink to dodge a culling burst or to close after they waste stamina — the buff is temporary, so act fast.",
            },
        ],
        "lore": [
            "Jan’s epithet is not marketing. Bloodhand Lineage and Lord of Blood describe a fighter who treats blood as both wound and weapon — a theme FromSoftware loves to push until it turns romantic and ugly at once.",
            "The axe that “thirsts” and the stone of sorcery place him between butchery and ritual: a Twilight mercenary who already knows the First Blood will be taken, not given.",
        ],
    },
    "trang-lanh": {
        "slug": "trang-lanh",
        "role": "Ambush / control",
        "tagline": "Darkmoon stealth, silver serpents, and alluring blood drinks — disappear, then decide the fight.",
        "difficulty": 4,
        "playstyle": [
            "Trang Lanh is an information fighter. Darkmoon conceals you for a short window — enough to break lock-ons, reposition, or open with a thrown Full Moon Blade. Mama Nātha is a wide-area summon that turns a duel into chaos.",
            "Alluring Bride turns every successful blood drink into soft crowd control. Daughter of the Darkmoon keeps you hard to target at range, which is how you survive third parties in eight-player lobbies.",
        ],
        "tips": [
            {
                "title": "Open from stealth",
                "desc": "Do not show yourself first. Darkmoon in, throw the blade or start the summon, and let them panic into each other.",
            },
            {
                "title": "Drink blood in crowds",
                "desc": "Alluring Bride spellbinds nearby enemies on drink — stagger one target in a group and convert the whole skirmish.",
            },
            {
                "title": "Stay at the edge of vision",
                "desc": "Daughter of the Darkmoon is strongest when you are far. Creep the perimeter of fights instead of standing on the objective.",
            },
        ],
        "lore": [
            "The Full Moon Blade and Mama Nātha — a silver serpent guardian of the Ratnam — pull Trang Lanh toward myth rather than gothic Europe. The Twilight of Humanity is not only Victorian streets; it still keeps older gods and guardians in the dark.",
            "Her Aspects frame her as bride and daughter of the darkmoon: a romantic, dangerous reading of blood power that fits Miyazaki’s stated interest in “romantic” blood rather than pure horror.",
        ],
    },
    "sniper-layla": {
        "slug": "sniper-layla",
        "role": "Long-range pick / scout",
        "tagline": "Insect-form repositions, a body-mounted Gatling, and Nighteye lock-ons — control the sightline.",
        "difficulty": 3,
        "playstyle": [
            "Sniper Layla owns the long angle. Nighteye extends lock-on and observation range, and the Sniper Rifle punishes anyone who rotates carelessly between Lowanro landmarks.",
            "When the fight collapses on you, Neb-ra Vanishing turns you into a swarm and leaves a confusing afterimage. Verd Gatling Gun is your close-range panic button — or a brutal finisher if you set it up from high ground.",
        ],
        "tips": [
            {
                "title": "Play elevation, not honor",
                "desc": "Clock towers, roofs, and long streets are your kit. If you are in a tight corridor, you are playing someone else’s game.",
            },
            {
                "title": "Vanish to reset, not to style",
                "desc": "Neb-ra Vanishing is an escape and reposition tool. Use the afterimage to bait shots, then re-peek from a new angle.",
            },
            {
                "title": "Respect the Stake economy",
                "desc": "Neb-ra Lineage regenerates HP toward half, but Goldblood Stakes heal you less. Do not plan around burst heals.",
            },
        ],
        "lore": [
            "Hieroglyph Katars and a sniper rifle is a deliberate clash — archive and battlefield in one kit. Layla reads like a scholar-hunter whose bloodline (Neb-ra) is insectile and hard to pin down.",
            "Nighteye and the swarm form make her the roster’s best “eyes”: in a game about culling and opportunism, information is a weapon as real as the rifle.",
        ],
    },
    "senator-samir-patres": {
        "slug": "senator-samir-patres",
        "role": "Technique / anti-carry",
        "tagline": "Senate rapier, blood swamps, and dinosaur charges — outbuild them, then run them over.",
        "difficulty": 4,
        "playstyle": [
            "Senator Samir Patres is a technical fighter who rewards clean defense. Unshakable Sword boosts melee attack after a perfect guard, so he wants structured duels more than brawls.",
            "Blood Disciple lowers required Bloodsworn skill level — a quiet economy advantage that comes online earlier than opponents expect. Bloodstake locks space; Saurian Form is a shocking engage when they think you will keep fencing.",
        ],
        "tips": [
            {
                "title": "Perfect guard is your damage buff",
                "desc": "Train the guard counter window. Unshakable Sword turns defense into offense; do not mash dodge when you can parry.",
            },
            {
                "title": "Spend the skill-level edge",
                "desc": "Blood Disciple lets you take Bloodsworn skills earlier. Prioritize unlocks that compound (stagger, blood economy) over raw flair.",
            },
            {
                "title": "Bloodstake then charge",
                "desc": "Drop the swamp to pin them, then Saurian Form when they try to circle out of it.",
            },
        ],
        "lore": [
            "The title “Senator” and the Senate Rapier stage him as political aristocracy — until Saurian Form reminds you the Twilight still runs on monstrous blood, not speeches.",
            "Bloodstake (a literal stake rising from a blood swamp) is ritual violence with legal theater around it. He is a strong read on the game’s tone: order, then something older and hungrier.",
        ],
    },
    "zork": {
        "slug": "zork",
        "role": "Aggressive tank / disruptor",
        "tagline": "Diving suit, speargun, rockets, and stolen max HP — be the problem they cannot ignore.",
        "difficulty": 2,
        "playstyle": [
            "Zork is a front-line menace. Undersea Cable and Speargun are honest tools, but Human Rocket and Missile make him the best character for forcing fights and breaking setups.",
            "Law of the Deep Sea steals max HP on Bloodsworn kills — if you get ahead, you snowball. Dread Resonance is a howl you can extend to interrupt and inflate stagger; use it to ruin someone else’s combo.",
        ],
        "tips": [
            {
                "title": "Kill to grow",
                "desc": "Law of the Deep Sea wants Bloodsworn eliminations, not just PvE. Hunt players who are already weak from the Grail’s culling.",
            },
            {
                "title": "Do not die to your victim",
                "desc": "HP stolen is lost if the player you robbed finishes you. After a steal, reset or play safer — greed throws the lead.",
            },
            {
                "title": "Hold the howl",
                "desc": "Dread Resonance ([L] + [ZR]) extends while held. Use it to cancel telegraphed attacks or to bully a final-phase duel.",
            },
        ],
        "lore": [
            "A diving suit that grows cannons and rocket packs is peak Twilight industrial body-horror. Zork looks like deep-sea salvage and reads like a predator.",
            "Law of the Deep Sea is a cruel rule set: take their maximum life, and lose it if they take yours. He is the network test’s meme favorite for a reason — and a real snowball threat in the final three.",
        ],
    },
}

LABELS = {
    "role": "Role",
    "difficulty": "Difficulty",
    "playstyle": "How to play",
    "tips": "Tips",
    "lore": "Background",
    "weapons": "Weapons",
    "bloodArts": "Blood Arts",
    "powers": "Aspects",
    "backToRoster": "All Bloodsworn",
    "otherCharacters": "Other Bloodsworn",
    "relatedNews": "From the newsroom",
    "relatedGuides": "Related guides",
    "ctaTitle": "Master the core systems",
    "ctaDesc": "Read the gameplay guide for Virtue, phases, stagger, and House of Night — then bring it back to this Bloodsworn.",
    "level": "Level",
    "detailLead": "Weapons, Blood Arts, Aspects, playstyle, and tips from the network test build.",
}


def main() -> None:
    data = json.loads(EN.read_text(encoding="utf-8"))
    items = data["characters"]["roster"]["items"]
    by_name = {DETAILS[k]["slug"]: k for k in DETAILS}
    # match current items to details by order / known names
    name_to_slug = {
        "Albert": "albert",
        "Bloodhand Jan": "bloodhand-jan",
        "Trang Lanh": "trang-lanh",
        "Sniper Layla": "sniper-layla",
        "Senator Samir Patres": "senator-samir-patres",
        "Zork": "zork",
    }

    for item in items:
        slug = name_to_slug.get(item["name"])
        if not slug:
            raise SystemExit(f"no slug mapping for {item['name']}")
        detail = DETAILS[slug]
        item.update(
            {
                "slug": detail["slug"],
                "role": detail["role"],
                "tagline": detail["tagline"],
                "difficulty": detail["difficulty"],
                "playstyle": detail["playstyle"],
                "tips": detail["tips"],
                "lore": detail["lore"],
            }
        )

    # detail page chrome labels
    data["characters"]["detail"] = LABELS
    # list-page link labels
    data["characters"]["roster"]["labels"]["viewGuide"] = "View guide"
    data["characters"]["roster"]["labels"]["role"] = "Role"
    data["characters"]["roster"]["labels"]["difficulty"] = "Difficulty"

    EN.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("characters expanded:", [(i["slug"], i["role"]) for i in items])


if __name__ == "__main__":
    main()
