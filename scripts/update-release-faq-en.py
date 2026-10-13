#!/usr/bin/env python3
"""Expand releaseDate + faq English copy in src/messages/en.json."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN = ROOT / "src" / "messages" / "en.json"

release_date = {
    "intro": {
        "eyebrow": "Release Date",
        "title": "The Duskbloods Release Date — Everything We Know (October 2026)",
        "lead": "The Duskbloods is still officially a 2026 Nintendo Switch 2 exclusive — but there is still no calendar date. This page tracks every confirmed detail, every credible rumor, and what the remaining launch window actually looks like as of October 2026.",
        "updatedAt": "Last updated: October 11, 2026",
    },
    "facts": {
        "eyebrow": "At a glance",
        "title": "Key facts",
        "items": [
            {"label": "Exact release date", "value": "Not announced"},
            {"label": "Release window", "value": "2026 (under review)"},
            {"label": "Platform", "value": "Nintendo Switch 2 (Exclusive)"},
            {"label": "Developer", "value": "FromSoftware"},
            {"label": "Publisher", "value": "Nintendo"},
            {"label": "Director", "value": "Hidetaka Miyazaki"},
            {"label": "Genre", "value": "PvPvE Action RPG"},
            {"label": "Max players", "value": "8"},
        ],
    },
    "status": {
        "eyebrow": "Confirmed vs. rumored",
        "title": "What is actually official",
        "lead": "Separate marketing noise from facts. Confirmed items come from Nintendo, FromSoftware, or Kadokawa. The right column is trackers, press predictions, or community speculation — useful signal, but not a release date.",
        "confirmedLabel": "Confirmed",
        "unconfirmedLabel": "Not confirmed",
        "confirmed": [
            {
                "title": "2026 release window",
                "desc": "Nintendo and Kadokawa have repeatedly listed The Duskbloods as a 2026 title. That window has not been officially changed — though it is getting tight.",
            },
            {
                "title": "Nintendo Switch 2 exclusive",
                "desc": "The Duskbloods is published by Nintendo and is exclusive to Nintendo Switch 2. No PS5, Xbox, or PC version has been announced.",
            },
            {
                "title": "FromSoftware × Nintendo",
                "desc": "Developed by FromSoftware and directed by Hidetaka Miyazaki. Published by Nintendo — the studio's first major console exclusive in over twenty years.",
            },
            {
                "title": "Closed network test completed",
                "desc": "A multi-session closed network test ran August 21–24, 2026. Servers struggled early, later sessions stabilized, and core gameplay was well received.",
            },
            {
                "title": "More than a dozen Bloodsworn",
                "desc": "Official materials promise a roster of more than a dozen playable Bloodsworn, each with unique weapons, abilities, and a customizable blood history.",
            },
        ],
        "unconfirmed": [
            {
                "title": "December 31, 2026 on trackers",
                "desc": "IGN's game page and several databases now list December 31, 2026. That is almost certainly a year-end placeholder — Nintendo has not confirmed it.",
            },
            {
                "title": "December 3, 2026 prediction",
                "desc": "IGN's Logan Plant predicted a December 3 launch based on Nintendo's monthly first-party release pattern. It remains analysis, not an announcement.",
            },
            {
                "title": "A slip into 2027",
                "desc": "With no date in October and GTA 6 owning November, a 2027 slip is a common community base case. Neither Nintendo nor FromSoftware has announced a delay.",
            },
            {
                "title": "Physical, deluxe, or collector's editions",
                "desc": "No edition lineup, pricing, or pre-order bonuses have been announced. Expect details in the same beat that reveals the date.",
            },
            {
                "title": "Price and file size",
                "desc": "Still unannounced. Switch 2 first-party titles typically land in a familiar premium band, but nothing official is on record yet.",
            },
        ],
    },
    "timeline": {
        "eyebrow": "Timeline",
        "title": "How we got here",
        "items": [
            {
                "date": "April 2025",
                "title": "The Duskbloods is revealed",
                "desc": "Announced as a Nintendo Switch 2 exclusive from FromSoftware, directed by Hidetaka Miyazaki. The reveal trailer introduced the Bloodsworn, the First Blood, and the Twilight of Humanity setting.",
            },
            {
                "date": "July 22–28, 2026",
                "title": "Network test applications open",
                "desc": "Registration for the closed network test ran through the official site and required Nintendo Switch Online. Applications closed at the end of July.",
            },
            {
                "date": "August 7, 2026",
                "title": "Testers selected",
                "desc": "Selected players were notified. Demand reportedly exceeded expectations — early comparisons to Elden Ring Nightreign's test traffic were favorable to The Duskbloods.",
            },
            {
                "date": "August 21–24, 2026",
                "title": "Closed network test",
                "desc": "Five sessions across four days. Session one crashed under load, PvP showed latency issues, and FromSoftware patched mid-test. Later sessions stabilized. The Virtue system and PvPvE loop impressed most players.",
            },
            {
                "date": "August 25, 2026",
                "title": "September 24 date denied",
                "desc": "A preview article spread a September 24, 2026 launch date. Nintendo denied it. The only solid line remained: 2026, exact date TBA.",
            },
            {
                "date": "September 9–10, 2026",
                "title": "Nintendo Direct — no-show",
                "desc": "The Duskbloods skipped the September Direct entirely: no trailer, no date. Switch 2 owners ate well on other titles; this game stayed silent.",
            },
            {
                "date": "Late September 2026",
                "title": "Trackers fill in December 31",
                "desc": "IGN and other databases began listing December 31, 2026. First concrete date on paper — still not official.",
            },
            {
                "date": "October 2026",
                "title": "No date. Delay talk grows",
                "desc": "Under three months left in the year, GTA 6 dominating November, and the announce-to-launch marketing window is nearly gone. 2026 is still the official line; 2027 is no longer a hot take.",
            },
        ],
    },
    "expect": {
        "eyebrow": "What we know",
        "title": "About the launch",
        "paragraphs": [
            "The Duskbloods was revealed during a Nintendo Switch 2 presentation and is slated for a 2026 release. As of October 11, 2026, FromSoftware and Nintendo still have not announced an exact calendar date. That is the single most important fact on this page — everything else is context around it.",
            "As a Switch 2 exclusive, the game will only be available on Nintendo's current-generation console. It will not launch on PS5, Xbox, or PC. Multiplayer is built around Switch 2 players, and the network test required a Nintendo Switch Online membership.",
            "Directed by Hidetaka Miyazaki (creator of Elden Ring and the Dark Souls series), The Duskbloods is a PvPvE multiplayer action game. Players take on the role of the Bloodsworn — warriors who draw power from special blood and compete for the First Blood at the Twilight of Humanity. Matches support up to eight players, with a single-player mode also available.",
            "The August network test proved the core loop works: eight Bloodsworn enter the Lands of Dusk, bank Virtue, survive the Grail's culling across four phases, and fight down to a final three. It also exposed real server and netcode work still ahead of launch — which is exactly what a network test is for.",
            "For buyers, that means two practical things. First, when the date lands, expect online multiplayer to want a Nintendo Switch Online membership — the test already required one. Second, do not trust any pre-order page, price tag, or calendar date that does not appear on an official Nintendo or FromSoftware channel. Placeholders and fake launch days have already circulated twice in this game's short public life.",
        ],
    },
    "window": {
        "eyebrow": "Launch window",
        "title": "Can it still make 2026?",
        "paragraphs": [
            "Technically yes — and officially, 2026 is still the line. If the game ships this year, the realistic remaining windows are late November (unlikely against GTA 6) or December. A December 3 mid-week drop or a mid-to-late December date are the patterns fans and press keep pointing at.",
            "In practice the calendar is brutal. A global multiplayer launch needs a marketing beat: date announce, pre-orders, maybe one more trailer, preload, then ship. Squashing that into a few weeks is possible but tight. If October and November pass without a date, a 2027 announcement becomes the rational expectation rather than pessimism.",
            "What would settle it fast: a Nintendo Direct / Direct Partner Showcase featuring The Duskbloods with a locked date and pre-order date. Watch Nintendo's official channels and this page — we update the moment something is confirmed.",
        ],
    },
    "editions": {
        "eyebrow": "Editions & buying",
        "title": "Where and how to buy",
        "lead": "Nothing below is on sale yet. This section is the checklist we will fill in the moment Nintendo announces date, price, and editions.",
        "items": [
            {"label": "Platform", "value": "Nintendo Switch 2 only"},
            {"label": "Digital", "value": "Nintendo eShop — expected at launch"},
            {"label": "Physical", "value": "TBA — not announced"},
            {"label": "Price", "value": "Not announced"},
            {"label": "Pre-order", "value": "Not open"},
            {"label": "Nintendo Switch Online", "value": "Required for multiplayer (per network test)"},
            {"label": "File size", "value": "TBA"},
            {"label": "Languages", "value": "Multiple — full list TBA"},
        ],
    },
    "watch": {
        "eyebrow": "What to watch",
        "title": "Where the exact date will drop",
        "items": [
            {
                "title": "Nintendo Direct / Partner Showcase",
                "desc": "The most likely stage for a date reveal. If The Duskbloods appears in a Direct, expect a release date and pre-orders in the same segment.",
            },
            {
                "title": "FromSoftware & Nintendo social channels",
                "desc": "Twitter/X and official news posts will carry the confirmation the same day. Treat any date that does not appear on an official channel as unofficial.",
            },
            {
                "title": "Kadokawa financial reports",
                "desc": "FromSoftware's parent has reaffirmed the 2026 window in investor materials before. The next report is a useful, if dry, checkpoint.",
            },
            {
                "title": "This page",
                "desc": "We revise the timeline and the confirmed / not confirmed tables as soon as facts change. Bookmark it instead of refreshing trackers.",
            },
        ],
    },
    "related": {
        "eyebrow": "From the newsroom",
        "title": "Deep dives behind this page",
        "items": [
            {
                "href": "/latest/duskbloods-october-2026-delay-risk",
                "title": "October 2026 delay risk, explained",
                "desc": "Why 2026 is getting harder every week — and why the network test numbers cut both ways.",
            },
            {
                "href": "/latest/duskbloods-release-date-december-31-2026-trackers",
                "title": "Trackers now point to December 31",
                "desc": "What actually changed on IGN and other databases, and why Dec. 31 is probably a placeholder.",
            },
            {
                "href": "/latest/duskbloods-september-direct-no-show",
                "title": "September Direct recap",
                "desc": "The Duskbloods skipped the show entirely. Still 2026. Still no date.",
            },
            {
                "href": "/latest/duskbloods-release-date-september24-denied",
                "title": "September 24? Nintendo says no",
                "desc": "How a single preview article created a fake launch day — and the official denial.",
            },
        ],
    },
    "cta": {
        "title": "Bookmark this page for the exact date",
        "desc": "We will update the timeline and the confirmed table the moment FromSoftware and Nintendo announce the release date, preload schedule, and launch details.",
    },
}

faq = {
    "intro": {
        "eyebrow": "FAQ",
        "title": "The Duskbloods — frequently asked questions",
        "lead": "Straight answers to the questions players actually search: release date, Switch 2 exclusivity, PvPvE, single player, online requirements, and what the network test told us.",
    },
    "groups": [
        {
            "title": "Release date & platforms",
            "items": [
                {
                    "q": "When does The Duskbloods come out?",
                    "a": "The Duskbloods is officially scheduled for 2026 on Nintendo Switch 2. As of October 2026 an exact calendar date has not been announced. Trackers listing December 31, 2026 are placeholders, not confirmations.",
                },
                {
                    "q": "Is The Duskbloods only on Nintendo Switch 2?",
                    "a": "Yes. The Duskbloods is published by Nintendo and is exclusive to Nintendo Switch 2 at launch. No other platforms have been announced.",
                },
                {
                    "q": "Will The Duskbloods come to PS5, Xbox, or PC?",
                    "a": "There are no announced plans for PS5, Xbox, or PC. As a Nintendo-published exclusive, it is expected to remain on Nintendo Switch 2.",
                },
                {
                    "q": "Is The Duskbloods delayed to 2027?",
                    "a": "Not officially. Nintendo and FromSoftware still list 2026. With no date in October and a crowded holiday calendar, a 2027 slip is widely discussed — but it has not been announced.",
                },
                {
                    "q": "Is the December 31, 2026 release date real?",
                    "a": "Unlikely. December 31 is a common year-end placeholder used by game databases when only the release year is known. Nintendo has not confirmed any calendar date.",
                },
                {
                    "q": "How much will The Duskbloods cost?",
                    "a": "No price has been announced. Expect details alongside the official release date and edition reveal.",
                },
                {
                    "q": "Is there a physical copy or deluxe edition?",
                    "a": "No edition lineup has been announced yet — not standard physical, not deluxe, not collector's. Those details usually drop with the date and pre-order page.",
                },
                {
                    "q": "Can I pre-order The Duskbloods yet?",
                    "a": "No. Pre-orders are not open. Treat any pre-order link that appears before an official Nintendo/FromSoftware announcement as unofficial.",
                },
                {
                    "q": "What is the file size / install size?",
                    "a": "Not announced. It will appear on the Nintendo eShop listing once the game page goes live.",
                },
            ],
        },
        {
            "title": "Gameplay & multiplayer",
            "items": [
                {
                    "q": "What does PvPvE mean in The Duskbloods?",
                    "a": "PvPvE means player-versus-player-versus-environment. In every match you compete against other Bloodsworn while also fighting powerful AI enemies — a three-way contest of rivalry, opportunism, and survival.",
                },
                {
                    "q": "How many players can play together?",
                    "a": "Up to eight Bloodsworn compete in a single Dusk Battle match. The match runs across four phases until only three finalists remain for the Blood Bestowal.",
                },
                {
                    "q": "Can I play The Duskbloods single player?",
                    "a": "Yes. Although multiplayer is the core, The Duskbloods includes a single-player mode so you can experience the systems without a full lobby.",
                },
                {
                    "q": "Does The Duskbloods have crossplay?",
                    "a": "Crossplay with other platforms does not apply — the game is exclusive to Nintendo Switch 2. Multiplayer is among Switch 2 players.",
                },
                {
                    "q": "Is The Duskbloods like Elden Ring Nightreign?",
                    "a": "They share FromSoftware DNA and multiplayer-focused structure, but The Duskbloods is its own PvPvE design: 8-player matches, Virtue culling across phases, Bloodsworn builds, and a Switch 2 exclusive format directed by Miyazaki.",
                },
                {
                    "q": "What is Virtue?",
                    "a": "Virtue is the power you accumulate during a Dusk Battle. You bank it by fighting, exploring, and completing objectives. The Grail culls Bloodsworn with insufficient Virtue each phase — only the top three reach the final Blood Bestowal.",
                },
                {
                    "q": "What are Blood Powers?",
                    "a": "Special blood grants abilities beyond human limits. Up to five Powers of Blood can be manifested at once and swapped from the menu. They define much of how each Bloodsworn plays.",
                },
                {
                    "q": "Is there skill-based matchmaking?",
                    "a": "Yes. In an IGN interview, director Hidetaka Miyazaki confirmed a tiered, ranked-style matchmaking approach — new players should match with other newcomers rather than veterans.",
                },
                {
                    "q": "Can I form alliances with other players?",
                    "a": "Yes. You can petition rival Bloodsworn for an alliance, and Sigils create special relationship objectives. The network test also offered a Bloodbound Alliances mode where pairs stay bonded into the final phase.",
                },
            ],
        },
        {
            "title": "Bloodsworn, Kin & world",
            "items": [
                {
                    "q": "Who are the Bloodsworn?",
                    "a": "The playable characters. They are humans who gained superhuman power through special blood — conscious fighters with their own identity, weapons, abilities, and a customizable blood history.",
                },
                {
                    "q": "How many playable characters are there?",
                    "a": "Official materials say more than a dozen Bloodsworn. A full roster has not been published yet; more reveals are expected closer to launch.",
                },
                {
                    "q": "What is blood history?",
                    "a": "A customizable narrative element that shapes your Bloodsworn's path and destiny across a match. It gives each run room for personal build and story expression.",
                },
                {
                    "q": "What are Kin and Compacts?",
                    "a": "Those who enter an agreement with the Order of Dusk are known as kin. Compacts with Kin grant powers and progression (including Kin EXP) that strengthen your Bloodsworn during a battle.",
                },
                {
                    "q": "What is the First Blood?",
                    "a": "A mysterious force the Bloodsworn compete to obtain at the Twilight of Humanity. Pursuing it is the engine behind every match and the game's larger conflict.",
                },
                {
                    "q": "Where does the game take place?",
                    "a": "In the Lands of Dusk during the Twilight of Humanity — a dark, romantic world moving from gothic Victorian streets toward an industrial modern era. The network test staged matches in Lowanro City.",
                },
                {
                    "q": "Who is directing The Duskbloods?",
                    "a": "Hidetaka Miyazaki, president of FromSoftware and director of Elden Ring and the Dark Souls series. The game is developed by FromSoftware and published by Nintendo.",
                },
            ],
        },
        {
            "title": "Network test & online",
            "items": [
                {
                    "q": "Was there a network test?",
                    "a": "Yes. A closed network test ran August 21–24, 2026 across multiple sessions. Applications were held July 22–28, and selected players were notified August 7.",
                },
                {
                    "q": "Do I need Nintendo Switch Online to play?",
                    "a": "The closed network test required a Nintendo Switch Online membership. Expect online multiplayer in the full game to need it as well, though final requirements will be confirmed at launch.",
                },
                {
                    "q": "Will there be another beta or network test?",
                    "a": "Nothing has been announced after the August test. If a second test or open beta is planned, it will appear on official Nintendo/FromSoftware channels first.",
                },
                {
                    "q": "How did the network test go?",
                    "a": "Core gameplay impressed: PvPvE fights, Virtue culling, and Bloodsworn abilities landed well. Early sessions crashed under demand and PvP had lag, but FromSoftware patched mid-test and later sessions were more stable.",
                },
                {
                    "q": "Does progress carry over to the full game?",
                    "a": "Do not count on it. Network test progress is almost never carried into release builds. Official carry-over rules have not been published.",
                },
                {
                    "q": "What is the House of Night?",
                    "a": "The Bloodsworn base. There you choose characters, run tutorials and lessons, check records (weapons, Kin, items, Powers of Blood, events), practice on the Graveyard Scarecrow, and configure matchmaking.",
                },
            ],
        },
        {
            "title": "Buying & hardware",
            "items": [
                {
                    "q": "What do I need to play The Duskbloods?",
                    "a": "A Nintendo Switch 2 console. For multiplayer you should also expect a Nintendo Switch Online membership, based on the network test requirements.",
                },
                {
                    "q": "Is The Duskbloods good for beginners?",
                    "a": "It is approachable for newcomers, and Miyazaki has said matchmaking separates new players from veterans. The House of Night includes tutorials and practice. Expect a steep mastery curve past the basics.",
                },
                {
                    "q": "Will there be a demo?",
                    "a": "No public demo has been announced. The closed network test was the only hands-on opportunity so far.",
                },
                {
                    "q": "Is The Duskbloods related to Bloodborne?",
                    "a": "No. It is an original IP. The dark gothic tone invites comparisons, but The Duskbloods is not a Bloodborne sequel or spin-off.",
                },
                {
                    "q": "Is this an official FromSoftware or Nintendo site?",
                    "a": "No. This is an unofficial fan information site and is not affiliated with or endorsed by FromSoftware or Nintendo. Always confirm release details on official channels.",
                },
                {
                    "q": "Does The Duskbloods have cross-save?",
                    "a": "Nothing has been announced. The game is Switch 2 exclusive at launch, so cross-save with other ecosystems is not applicable unless Nintendo announces cloud save support details.",
                },
                {
                    "q": "Is The Duskbloods a live-service game?",
                    "a": "There are no announced seasonal battle-pass plans. It is a premium multiplayer action game from FromSoftware and Nintendo. Post-launch updates and balance patches are possible but not detailed yet.",
                },
                {
                    "q": "How long is a typical match?",
                    "a": "The network test structured fights across four phases of culling down to three finalists. Exact minute counts were not published — expect session-based matches rather than hour-long raids.",
                },
                {
                    "q": "Where can I watch The Duskbloods gameplay?",
                    "a": "Official trailers and network-test footage are on Nintendo and FromSoftware channels. Our gallery and newsroom break down what the footage shows.",
                },
            ],
        },
    ],
}


def main() -> None:
    data = json.loads(EN.read_text(encoding="utf-8"))
    data["releaseDate"] = release_date
    data["faq"] = faq
    # Tighten SEO titles/descriptions to match the thicker content
    data["Metadata"]["releaseDate"] = {
        "title": "The Duskbloods Release Date — 2026 Window, Timeline & Rumors (Oct 2026)",
        "description": "The Duskbloods release date tracker: official 2026 Switch 2 window, full timeline, confirmed vs rumored dates, December 31 tracker analysis, delay risk, and how to buy once announced.",
    }
    data["Metadata"]["faq"] = {
        "title": "The Duskbloods FAQ — Release Date, PvPvE, Multiplayer & Buying",
        "description": "40+ answers on The Duskbloods: exact release date status, Switch 2 exclusivity, PvPvE and Virtue, Bloodsworn & Kin, network test results, Nintendo Switch Online, editions, and more.",
    }
    EN.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    faq_count = sum(len(g["items"]) for g in faq["groups"])
    print(f"Updated en.json — FAQ questions: {faq_count}, releaseDate keys: {list(release_date.keys())}")


if __name__ == "__main__":
    main()
