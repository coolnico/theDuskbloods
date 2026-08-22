'use client';

import { useTranslations } from 'next-intl';
import { Gamepad2, Sword, Shield, Zap, Users, MapPin, BookOpen, Star, ChevronLeft, ChevronRight, X, Target, Crosshair, Compass, Clock, AlertTriangle, Info, Eye } from 'lucide-react';
import { useState } from 'react';

type Role = { title: string; desc: string };
type Section = { title: string; desc: string };
type Stage = { name: string; desc: string; image?: string; bullets?: string[] };
type System = { title: string; desc: string };
type Mechanic = { title: string; desc: string };
type Item = { title: string; desc: string };
type Feature = { name: string; desc: string };
type Tip = { title: string; desc: string };
type VirtueType = { title: string; desc: string };
type RegionFeature = { title: string; desc: string };
type FaqItem = { q: string; a: string };

const GGBASE = 'https://media.fromsoftware.jp/theduskbloods/campaign/resources/networktest/images/gameplayguide';

const virtueImages = [
  `${GGBASE}/virtue/pc/img_01.jpg`,
  `${GGBASE}/virtue/pc/img_02.jpg`,
  `${GGBASE}/virtue/pc/img_03.jpg`,
  `${GGBASE}/virtue/pc/img_04.jpg`,
  `${GGBASE}/virtue/pc/img_05.jpg`,
  `${GGBASE}/virtue/pc/img_06.jpg`,
  `${GGBASE}/virtue/pc/img_07.jpg`,
];

const enhancingImages = [
  `${GGBASE}/enhancing_bloodsworn/pc/ss/image_levelup.jpg`,
  `${GGBASE}/enhancing_bloodsworn/pc/ss/image_compact.jpg`,
  `${GGBASE}/enhancing_bloodsworn/pc/ss/image_kin_ex.png`,
  `${GGBASE}/enhancing_bloodsworn/pc/ss/image_levelup_of_kin.jpg`,
];


const battleImages = [
  `${GGBASE}/battlefactor/pc/img_01.jpg`,
  `${GGBASE}/battlefactor/pc/img_02.jpg`,
  `${GGBASE}/battlefactor/pc/img_03.jpg`,
];

const colClasses: Record<number, string> = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' };

function ImageGrid({ images, cols = 3, altPrefix = 'The Duskbloods gameplay screenshot' }: { images: string[]; cols?: number; altPrefix?: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className={`grid grid-cols-2 ${colClasses[cols] || 'sm:grid-cols-3'} gap-3 mt-6`}>
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative aspect-video overflow-hidden rounded-lg bg-zinc-800 cursor-pointer"
          >
            <img src={src} alt={`${altPrefix} ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <button type="button" onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/70 hover:text-white cursor-pointer" aria-label="Close">
            <X className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}
            className="absolute left-4 text-white/70 hover:text-white cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <img src={images[lightbox]} alt={`${altPrefix} ${lightbox + 1}`} className="max-h-[90vh] max-w-[90vw] object-contain" onClick={(e) => e.stopPropagation()} />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}
            className="absolute right-4 text-white/70 hover:text-white cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </>
  );
}

export default function GameplayView() {
  const t = useTranslations('gameplay');

  // --- optional sections ---
  type MatchStructureData = { eyebrow: string; title: string; desc: string; stages: Stage[]; finalDetail?: string };
  type VirtueData = { title: string; desc: string; types: VirtueType[] };
  type CoreSystemsData = { title: string; systems: System[] };
  type ExpeditionData = { eyebrow: string; title: string; bloodPowers?: { title: string; desc: string }; coopBattle?: { title: string; desc: string }; regions?: { title: string; desc: string; features: RegionFeature[] } };
  type CombatData = { eyebrow: string; title: string; mechanics: Mechanic[] };
  type EventsData = { eyebrow: string; title: string; desc: string; items: Item[] };
  type StonesData = { eyebrow: string; title: string; desc: string; items: Item[] };
  type AlliancesData = { eyebrow: string; title: string; items: Item[] };
  type HubData = { eyebrow: string; title: string; desc: string; features: Feature[] };
  type TipsData = { eyebrow: string; title: string; items: Tip[] };
  type FaqData = { eyebrow: string; title: string; items: FaqItem[] };

  function safeLoad<T>(key: string, check: (r: unknown) => boolean): T | null {
    try {
      const raw = t.raw(key) as unknown;
      return check(raw) ? (raw as T) : null;
    } catch { return null; }
  }

  const matchStructure = safeLoad<MatchStructureData>('matchStructure', (r) =>
    !!r && typeof r === 'object' && 'stages' in r && Array.isArray((r as any).stages));
  const virtue = safeLoad<VirtueData>('virtue', (r) =>
    !!r && typeof r === 'object' && 'types' in r && Array.isArray((r as any).types));
  const coreSystems = safeLoad<CoreSystemsData>('coreSystems', (r) =>
    !!r && typeof r === 'object' && 'systems' in r && Array.isArray((r as any).systems));
  const expedition = safeLoad<ExpeditionData>('expedition', (r) =>
    !!r && typeof r === 'object' && 'eyebrow' in r);
  const combat = safeLoad<CombatData>('combat', (r) =>
    !!r && typeof r === 'object' && 'mechanics' in r && Array.isArray((r as any).mechanics));
  const events = safeLoad<EventsData>('events', (r) =>
    !!r && typeof r === 'object' && 'items' in r && Array.isArray((r as any).items));
  const stones = safeLoad<StonesData>('stones', (r) =>
    !!r && typeof r === 'object' && 'items' in r && Array.isArray((r as any).items));
  const alliances = safeLoad<AlliancesData>('alliances', (r) =>
    !!r && typeof r === 'object' && 'items' in r && Array.isArray((r as any).items));
  const hub = safeLoad<HubData>('hub', (r) =>
    !!r && typeof r === 'object' && 'features' in r && Array.isArray((r as any).features));
  const tips = safeLoad<TipsData>('tips', (r) =>
    !!r && typeof r === 'object' && 'items' in r && Array.isArray((r as any).items));
  const faq = safeLoad<FaqData>('faq', (r) =>
    !!r && typeof r === 'object' && 'items' in r && Array.isArray((r as any).items) && 'q' in (r as any).items[0]);

  return (
    <main className="relative z-10">
      <article>
      {/* Header */}
      <header className="relative overflow-hidden px-4 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-14">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{t('intro.eyebrow')}</p>
          <h1 className="speakable text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {t('intro.title')}
          </h1>
          <p className="speakable mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">{t('intro.lead')}</p>
        </div>
      </header>

      {/* Core feature sections */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(t.raw('sections') as Section[]).map((s, i) => {
              const icons = [<Users className="h-7 w-7" />, <Zap className="h-7 w-7" />, <Star className="h-7 w-7" />, <Target className="h-7 w-7" />, <Gamepad2 className="h-7 w-7" />, <Compass className="h-7 w-7" />];
              return (
                <div key={i} className="group rounded-xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 p-6 transition-all hover:border-zinc-700 hover:from-zinc-900">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 transition-colors group-hover:bg-amber-500/20 shrink-0">
                      {icons[i] || <Sword className="h-7 w-7" />}
                    </div>
                    <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{t('roles.eyebrow')}</p>
          <h2 className="speakable mb-3 text-center text-3xl font-black text-white sm:text-4xl">{t('roles.title')}</h2>
          <p className="mb-10 text-center text-zinc-400">{t('roles.desc')}</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {(t.raw('roles.items') as Role[]).map((r, i) => {
              const icons = [<Sword className="h-8 w-8" />, <Shield className="h-8 w-8" />, <Crosshair className="h-8 w-8" />];
              const colors = ['from-red-500/15 to-red-500/5 border-red-500/25', 'from-sky-500/15 to-sky-500/5 border-sky-500/25', 'from-emerald-500/15 to-emerald-500/5 border-emerald-500/25'];
              const iconColors = ['text-red-400 bg-red-500/15', 'text-sky-400 bg-sky-500/15', 'text-emerald-400 bg-emerald-500/15'];
              return (
                <div key={i} className={`rounded-xl border bg-gradient-to-b p-6 ${colors[i]}`}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${iconColors[i]} shrink-0`}>
                      {icons[i]}
                    </div>
                    <h3 className="text-lg font-bold text-white">{r.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Match Structure */}
      {matchStructure && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{matchStructure.eyebrow}</p>
            <h2 className="speakable mb-3 text-center text-3xl font-black text-white sm:text-4xl">{matchStructure.title}</h2>
            <p className="mb-10 text-center text-zinc-400">{matchStructure.desc}</p>
            <div className="space-y-6">
              {matchStructure.stages.map((s, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={i} className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/60">
                    <div className={`flex flex-col ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                      {s.image && (
                        <div className="relative sm:w-2/5 shrink-0">
                          <img src={s.image} alt={s.name} loading="lazy" className="h-48 w-full object-cover sm:h-full" />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-zinc-900/60" />
                        </div>
                      )}
                      <div className="flex-1 p-5 sm:p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-black shrink-0">{i + 1}</span>
                          <h3 className="text-xl font-bold text-white">{s.name}</h3>
                        </div>
                        <p className="text-base text-zinc-300 mb-3">{s.desc}</p>
                        {s.bullets && s.bullets.length > 0 && (
                          <ul className="space-y-2">
                            {s.bullets.map((b, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-zinc-400">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/60 shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {matchStructure.finalDetail && (
              <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
                <p className="text-base leading-relaxed text-zinc-300">{matchStructure.finalDetail}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Virtue */}
      {virtue && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="speakable mb-3 text-center text-3xl font-black text-white sm:text-4xl">{virtue.title}</h2>
            <p className="mb-10 text-center text-zinc-400 max-w-3xl mx-auto">{virtue.desc}</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {virtue.types.map((v, i) => {
                const icons = [<Sword className="h-6 w-6" />, <Star className="h-6 w-6" />, <Zap className="h-6 w-6" />, <Shield className="h-6 w-6" />, <MapPin className="h-6 w-6" />];
                return (
                  <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shrink-0">{icons[i]}</div>
                      <h3 className="font-bold text-white">{v.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">{v.desc}</p>
                  </div>
                );
              })}
            </div>
            <ImageGrid images={virtueImages} cols={4} altPrefix="Virtue system in The Duskbloods" />
          </div>
        </section>
      )}

      {/* Red & Gold Stones */}
      {stones && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{stones.eyebrow}</p>
            <h2 className="speakable mb-3 text-center text-3xl font-black text-white sm:text-4xl">{stones.title}</h2>
            <p className="mb-10 text-center text-zinc-400 max-w-3xl mx-auto">{stones.desc}</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {stones.items.map((s, i) => {
                const icons = [<Zap className="h-6 w-6" />, <Star className="h-6 w-6" />];
                return (
                  <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shrink-0">{icons[i]}</div>
                      <h3 className="font-bold text-white">{s.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Enhancing Bloodsworn */}
      {coreSystems && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="speakable mb-10 text-center text-3xl font-black text-white sm:text-4xl">{coreSystems.title}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {coreSystems.systems.map((s, i) => {
                const icons = [<Zap className="h-6 w-6" />, <Users className="h-6 w-6" />, <Sword className="h-6 w-6" />, <MapPin className="h-6 w-6" />];
                return (
                  <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shrink-0">{icons[i] || <Zap className="h-6 w-6" />}</div>
                      <h3 className="font-bold text-white">{s.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                  </div>
                );
              })}
            </div>
            <ImageGrid images={enhancingImages} cols={4} altPrefix="Enhancing Bloodsworn in The Duskbloods" />
          </div>
        </section>
      )}

      {/* Expedition Details */}
      {expedition && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{expedition.eyebrow}</p>
            <h2 className="speakable mb-10 text-center text-3xl font-black text-white sm:text-4xl">{expedition.title}</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {expedition.bloodPowers && (
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-6">
                  <h3 className="mb-3 font-bold text-white">{expedition.bloodPowers.title}</h3>
                  <p className="text-sm text-zinc-400">{expedition.bloodPowers.desc}</p>
                </div>
              )}
              {expedition.coopBattle && (
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-6">
                  <h3 className="mb-3 font-bold text-white">{expedition.coopBattle.title}</h3>
                  <p className="text-sm text-zinc-400">{expedition.coopBattle.desc}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Regional Features */}
      {expedition?.regions && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="speakable mb-3 text-center text-3xl font-black text-white sm:text-4xl">{expedition.regions.title}</h2>
            <p className="mb-10 text-center text-zinc-400 max-w-3xl mx-auto">{expedition.regions.desc}</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {expedition.regions.features.map((f, i) => {
                const icons = [<Zap className="h-6 w-6" />, <Sword className="h-6 w-6" />, <Users className="h-6 w-6" />, <MapPin className="h-6 w-6" />];
                return (
                  <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shrink-0">{icons[i]}</div>
                      <h3 className="font-bold text-white">{f.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Combat */}
      {combat && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{combat.eyebrow}</p>
            <h2 className="speakable mb-10 text-center text-3xl font-black text-white sm:text-4xl">{combat.title}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {combat.mechanics.map((m, i) => {
                const icons = [<Shield className="h-6 w-6" />, <Zap className="h-6 w-6" />, <Star className="h-6 w-6" />, <Shield className="h-6 w-6" />, <Sword className="h-6 w-6" />];
                return (
                  <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shrink-0">{icons[i] || <Sword className="h-6 w-6" />}</div>
                      <h3 className="font-bold text-white">{m.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">{m.desc}</p>
                  </div>
                );
              })}
            </div>
            <ImageGrid images={battleImages} cols={3} altPrefix="Combat mechanics in The Duskbloods" />
          </div>
        </section>
      )}

      {/* Events */}
      {events && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{events.eyebrow}</p>
            <h2 className="speakable mb-3 text-center text-3xl font-black text-white sm:text-4xl">{events.title}</h2>
            <p className="mb-10 text-center text-zinc-400">{events.desc}</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {events.items.map((e, i) => {
                const icons = [<Target className="h-6 w-6" />, <AlertTriangle className="h-6 w-6" />];
                return (
                  <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shrink-0">{icons[i]}</div>
                      <h3 className="font-bold text-white">{e.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">{e.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Alliances & Brands */}
      {alliances && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{alliances.eyebrow}</p>
            <h2 className="speakable mb-10 text-center text-3xl font-black text-white sm:text-4xl">{alliances.title}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {alliances.items.map((a, i) => {
                const icons = [<Users className="h-6 w-6" />, <Target className="h-6 w-6" />];
                return (
                  <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shrink-0">{icons[i]}</div>
                      <h3 className="font-bold text-white">{a.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">{a.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Hub */}
      {hub && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{hub.eyebrow}</p>
            <h2 className="speakable mb-3 text-center text-3xl font-black text-white sm:text-4xl">{hub.title}</h2>
            <p className="mb-10 text-center text-zinc-400">{hub.desc}</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {hub.features.map((f, i) => {
                const icons = [<Clock className="h-6 w-6" />, <BookOpen className="h-6 w-6" />, <Sword className="h-6 w-6" />, <Gamepad2 className="h-6 w-6" />];
                return (
                  <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shrink-0">{icons[i] || <Gamepad2 className="h-6 w-6" />}</div>
                      <h3 className="font-bold text-white">{f.name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tips */}
      {tips && (
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{tips.eyebrow}</p>
            <h2 className="speakable mb-10 text-center text-3xl font-black text-white sm:text-4xl">{tips.title}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tips.items.map((tip, i) => {
                const icons = [<Eye className="h-5 w-5" />, <Info className="h-5 w-5" />, <Compass className="h-5 w-5" />, <Target className="h-5 w-5" />, <Users className="h-5 w-5" />, <Gamepad2 className="h-5 w-5" />];
                return (
                  <div key={i} className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-amber-400">{icons[i]}</span>
                      <h3 className="font-bold text-white text-sm">{tip.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-400">{tip.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq && (
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">{faq.eyebrow}</p>
            <h2 className="speakable mb-10 text-center text-3xl font-black text-white sm:text-4xl">{faq.title}</h2>
            <div className="mx-auto max-w-3xl space-y-3">
              {faq.items.map((item, i) => (
                <details key={i} className="group rounded-xl border border-zinc-800/80 bg-zinc-900/60">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-left font-bold text-white">
                    <span>{item.q}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-zinc-500 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed text-zinc-400">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
      </article>
    </main>
  );
}
