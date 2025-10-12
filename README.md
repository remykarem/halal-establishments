# Halal Establishments Search (React + Vite)

Clean UI to search Singapore halal establishments with text search, optional postal-based distance sorting, and pagination.

## Run locally

1) Install deps
```bash
npm install
```

2) Provide data (choose one):
- Preferred: copy your `establishments.json` to `src/data/establishments.json` (bundled import)
- Alternative: copy it to `public/establishments.json` (fetched at runtime)

3) Start dev server
```bash
npm run dev
```
Open `http://localhost:5173`.

## Features
- Search box with Enter-to-search and debounced updates
- Strategy-based search:
  - Text contains match (name, address, type, scheme, number)
  - 6-digit postal → stubbed lat/lng → distance sort (Haversine)
- Pagination (10 per page)
- Cute cards, sticky header, and accessible controls (TailwindCSS)

## Project structure
- `src/types.ts`: core types
- `src/utils/*`: text, distance, postal utilities
- `src/search/strategies.ts`: search strategy pattern
- `src/hooks/useSearch.ts`: orchestrates search, filters, pagination
- `src/components/*`: UI components

## Notes
- Replace `postalToLatLng` in `src/utils/postal.ts` with a real resolver when ready
- Swap distance metric by passing a new `DistanceMetric` to `PostalDistanceStrategy`
