# Edit Features Design — Profilbild, Galleri, Berättelse

**Datum:** 2026-04-08  
**Status:** Godkänd

## Sammanfattning

Lägg till tre redigeringsfunktioner direkt på personprofilsidan: uppladdning av profilbild, hantering av bildgalleri och in-place textredigering av berättelsesektion. Ändringar sparas permanent i Supabase (PostgreSQL + Storage) och syns omedelbart för alla besökare.

---

## Persistence-lager: Supabase

### Databas-tabeller

**`person_overrides`**
```sql
CREATE TABLE person_overrides (
  person_id  TEXT NOT NULL,
  field      TEXT NOT NULL,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (person_id, field)
);
```
Fält som stöds: `"image"` (string), `"gallery"` (string[]), `"storySections"` (StorySection[])

**`gallery_items`**
```sql
CREATE TABLE gallery_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id  TEXT NOT NULL,
  url        TEXT NOT NULL,
  caption    TEXT DEFAULT '',
  sort_order INT  DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX ON gallery_items (person_id, sort_order);
```

### Storage

Bucket: `family-media` (public)  
- Profilbilder: `people/{person_id}.{ext}`  
- Galleribilder: `gallery/{person_id}/{uuid}.{ext}`

### RLS-policy (Row Level Security)

Alla operationer öppna (INSERT, UPDATE, DELETE, SELECT) — ingen autentisering behövs eftersom sidan är familjeinternt.

```sql
ALTER TABLE person_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "open" ON person_overrides FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "open" ON gallery_items FOR ALL USING (true) WITH CHECK (true);
```

---

## Abstraktion: `lib/storage.ts`

Hanterar all Supabase-kommunikation. Ingen annan fil importerar Supabase-klienten direkt.

```typescript
// Läsa
export async function getPersonOverrides(personId: string): Promise<Partial<Person>>
export async function getGalleryItems(personId: string): Promise<GalleryItem[]>

// Skriva
export async function setPersonOverride(personId: string, field: string, value: unknown): Promise<void>
export async function uploadProfileImage(personId: string, file: File): Promise<string> // returnerar URL
export async function addGalleryImage(personId: string, file: File): Promise<GalleryItem>
export async function deleteGalleryImage(item: GalleryItem): Promise<void>
export async function updateGallerySortOrder(items: GalleryItem[]): Promise<void>
```

### Miljövariabler (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## Hook: `lib/usePersonData.ts`

Client-side hook som hämtar Supabase-overrides och mergar med statisk data från `data/family.ts`.

```typescript
export function usePersonData(staticPerson: Person): {
  person: Person;          // merged: static + overrides
  gallery: GalleryItem[];  // från gallery_items-tabellen
  loading: boolean;
  refresh: () => void;
}
```

Merge-prioritet: Supabase-värden vinner över static data. Om Supabase är nere visas statisk data utan fel.

---

## Nya komponenter

### `components/edit/EditableAvatar.tsx`

Ersätter den klickbara avatar-div i `PersonProfileClient`.

- Visar profilbilden som vanligt
- Hover-overlay: kamera-ikon + "Byt bild"
- Klick öppnar en modal (`UploadImageModal`)
- Modal: drag-and-drop yta + "Välj fil"-knapp, preview av vald bild, "Spara"-knapp
- Vid spara: laddar upp till Supabase Storage, sparar URL i `person_overrides`, anropar `refresh()`
- Stödda format: jpg, jpeg, png, webp (max 5 MB)
- Visar loading-spinner under uppladdning

### `components/edit/EditableGallery.tsx`

Ersätter `PersonGallery` i Bilder-fliken.

- Visar befintliga bilder i samma grid som `PersonGallery`
- "+" knapp i övre hörnet → öppnar fil-dialog (multi-select)
- Varje bild har ett kryss-knapp (hover) → bekräftelsedialog → tar bort från Supabase
- Befintlig lightbox-funktionalitet bevaras
- Visar upload-progress per bild (liten progress-bar under thumbnails)
- Om inga bilder: visar "+" uppladdningsknapp centrerat

### `components/edit/EditableStory.tsx`

Ersätter `PersonStorySection` i Berättelse-fliken.

- Visar berättelsesektion som vanligt
- Penna-ikon (top-right per sektion) → sektionen byter till edit-läge:
  - Titel: `<input>` (single-line)  
  - Text: `<textarea>` (auto-grow)
  - Knappar: "Avbryt" och "Spara"
- Vid spara: skickar hela `storySections`-arrayen uppdaterad till Supabase
- Ännu inte implementerat: lägga till / ta bort sektioner (utanför scope)

---

## Ändringar i `PersonProfileClient`

`PersonProfileClient` refaktoreras att använda `usePersonData`-hooken och de nya edit-komponenterna:

```typescript
export function PersonProfileClient({ person: staticPerson }: { person: Person }) {
  const { person, gallery, loading, refresh } = usePersonData(staticPerson);
  // ...
  // Avatar ersätts av <EditableAvatar>
  // Gallery-fliken använder <EditableGallery>
  // Story-fliken använder <EditableStory>
}
```

`PersonProfileClient` tar fortfarande emot en statisk `Person` från servern (för snabb initial render), men klienten hämtar och mergar overrides asynkront.

---

## Miljösetup: `.env.example` uppdateras

Lägg till:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Utanför scope

- Lägga till / ta bort berättelsesektion (ny sektion, ordna om)
- Redigera tidslinje-events
- Redigera personens grunddata (namn, år, relationer)
- Autentisering / åtkomstkontroll
- Cover-bild uppladdning
