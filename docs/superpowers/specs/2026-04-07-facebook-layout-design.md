# Facebook-layout för Lindoffs Familjearkiv

**Datum:** 2026-04-07  
**Status:** Godkänd

## Sammanfattning

Ersätt nuvarande editorial/Apple-design med en tre-kolumns Facebook-inspirerad layout. Startsidans hero-sektion tas bort helt. Personprofilsidor får cover-foto + överlappad profilbild i Facebook-stil. Navigeringen flyttas till ett vänster sidofält.

---

## Gemensam layout (alla sidor)

### Topprad (Navbar)
- Höjd: h-14, bakgrund: `primary` (#1E3A1E)
- Vänster: logotyp (🌲 Lindoffs) i vitt
- Mitten: sökfält med avrundade hörn (söker bland personer)
- Höger: viewer-avatar (cirkulär, klickbar → öppnar PersonPicker)
- Sticky, z-50

### Tre-kolumns grid
```
[Vänster nav 220px] [Mitten flex-1] [Höger sidebar 220px]
```
- Bakgrund: `background` (#F9F6F1)
- Max-width: 1200px, centrerat
- Gap: 16px
- Padding: 16px

### Mobil (< md)
- En kolumn, ingen sidebar
- Nedre flikrad med ikoner: Hem / Träd / Personer / Profil
- Topprad behålls men sökfältet döljs (ikon istället)

---

## Vänster sidebar (alla sidor)

### Viewer-kort
- Avatar (40px cirkulär) + fullName + "Du ser som dig"
- Klickbar → öppnar PersonPicker
- Separator under

### Navigeringslänkar
Ikoner + text-etiketter:
- Hem (`/`)
- Släktträd (`/tree`)
- Alla personer (`/people`)

Aktivt tillstånd: grön bakgrund (`jan-tint`), grön text (`primary`), ingen understrykning.

### Komponent
Ny komponent: `components/layout/LeftSidebar.tsx`  
Ersätter nuvarande Navbar-sidolänkar. Navbar behålls för topprad.

---

## Höger sidebar (alla sidor)

### Familjestatistik-kort
```
FAMILJEN
———————————
Personer        22
Generationer     4
År historia    200+
```

### Kända personer-kort
3–4 utvalda personer (getFeaturedPersons()), visas som:
- Liten cirkulär avatar
- Namn (klickbar länk → profilsida)
- Familjesida-färg (grön/guld)

### Komponent
Ny komponent: `components/layout/RightSidebar.tsx`

---

## Startsida (`app/page.tsx`)

### Nuvarande
- Hero-sektion (85vh, mörk grön)
- FeaturedPeopleSection
- StoriesSection
- HowItWorks

### Ny
Hero-sektionen tas bort helt. Startsidans mittenkolumn ersätts med:

#### Ancestral träd (nedifrån och upp)
- Viewer längst ner (markerad med "Du" och grön bakgrund)
- Föräldrar i raden ovanför, förbundna med linjer
- Mor-/farföräldrar i raden ovanför det
- Urföräldrar (generation 4, max 4 generationer totalt)
- Varje nod: cirkulär avatar + förnamn + år (kompakt)
- Klickbar → navigerar till profilsida
- Färgkodad: grön kant för Jans sida, guldig kant för Karins sida
- Scrollbar horisontellt vid behov
- Om ingen viewer vald: visas med Jan+Karin som rot

#### Komponent
Ny komponent: `components/tree/AncestorTreeView.tsx`  
Bygger trädet från perspective-context nedifrån. Använder `getAncestorIds()` från `lib/perspective.tsx`.

#### Layout
```
<AppShell>
  <LeftSidebar />
  <main>
    <AncestorTreeView />
  </main>
  <RightSidebar />
</AppShell>
```

Ny wrapper-komponent: `components/layout/AppShell.tsx` — hanterar tre-kolumns grid + mobil-fallback.

---

## Personprofilsida (`app/people/[id]/page.tsx`)

### Cover-sektion
- Cover-foto area (h-40): personens `coverImage` om det finns, annars gradient (`jan-tint` → `karin-tint` baserat på sida, eller `primary`-gradient)
- Profilbild: 80px cirkulär, absolut positionerad, bottom -40px, left 24px, vit kant 4px
- Placeras i `<div style="position:relative">`

### Profilhuvud (under cover)
- Padding-left: 120px (för att ge plats åt den överlappade avataren)
- Namn (font-serif, stor)
- Levnadsår + familjesida (liten text, accent-färg)

### Flikar
```
[Berättelse] [Bilder] [Tidslinje] [Släktingar]
```
- Aktiv flik: understreck i `primary`-färg
- URL-hash eller state-baserad navigation (ingen ny route)
- Default: Berättelse

### Flik-innehåll
- **Berättelse:** Nuvarande PersonStorySection
- **Bilder:** Nuvarande PersonGallery
- **Tidslinje:** Nuvarande TimelineSection
- **Släktingar:** Nuvarande PersonRelations

### Tre kolumner på profilsidan
```
[LeftSidebar 220px] [Profilinnehåll flex-1] [Höger: närmaste släktingar 220px]
```
Höger sidebar på profilsida: make/maka, föräldrar, barn (kompakt lista).

---

## Alla personer (`app/people/page.tsx`)

Behåller nuvarande PeopleListView men placeras i AppShell (tre kolumner).  
Sökning och filtrering i mittenkolumnen.

---

## Släktträd (`app/tree/page.tsx`)

Behåller nuvarande FamilyTreeView (generationsrader) i mittenkolumnen.  
AppShell runt om.

---

## Nya komponenter att skapa

| Komponent | Plats | Syfte |
|---|---|---|
| `AppShell` | `components/layout/AppShell.tsx` | Tre-kolumns grid-wrapper |
| `LeftSidebar` | `components/layout/LeftSidebar.tsx` | Viewer-kort + nav-länkar |
| `RightSidebar` | `components/layout/RightSidebar.tsx` | Stats + kända personer |
| `AncestorTreeView` | `components/tree/AncestorTreeView.tsx` | Nedifrån-och-upp träd |

## Komponenter att uppdatera

| Komponent | Förändring |
|---|---|
| `Navbar` | Ny stil: mörk grön, sökfält i mitten, viewer-avatar höger |
| `app/page.tsx` | Ta bort hero + sections, lägg in AppShell + AncestorTreeView |
| `PersonHero` | Ersätts av cover-foto + överlappad avatar |
| `app/people/[id]/page.tsx` | Lägg till cover-sektion + flikar |
| `Providers.tsx` | Ingen ändring — AppShell används per sida, inte globalt |

## Komponenter att ta bort / avveckla

- `components/home/HeroSection.tsx` — tas bort
- `components/home/HowItWorks.tsx` — tas bort
- `components/home/StoriesSection.tsx` — tas bort eller sparas för framtiden
- `components/home/FeaturedPeopleSection.tsx` — ersätts av RightSidebar

---

## Tekniska noter

- `AncestorTreeView` renderas client-side (använder `usePerspective`)
- Cover-foto: lägg till valfritt `coverImage`-fält på `Person`-typen i `types/person.ts`
- Flik-navigation på profilsida: useState-baserad, ingen URL-ändring (undviker re-render)
- AppShell hanterar `md:grid-cols-[220px_1fr_220px]` vs `grid-cols-1` på mobil
- Nedre flikrad på mobil: fast positionerad, z-50, vit bakgrund
