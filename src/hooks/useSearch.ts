import { useEffect, useMemo, useState } from 'react';
import type { Establishment, LatLng } from '../types';
import { PostalDistanceStrategy, TextSearchStrategy, type SearchStrategy } from '../search/strategies';

export type Filters = {
  category1: boolean;
  category2: boolean;
};

const defaultFilters: Filters = { category1: false, category2: false };

const strategies: SearchStrategy[] = [
  new PostalDistanceStrategy(),
  new TextSearchStrategy(),
];

export function useSearch(items: Establishment[], userLocation: { lat: number; lng: number } | null = null) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [isSearching, setIsSearching] = useState(false);
  const [label, setLabel] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const submitSearch = () => {
    setPage(1);
  };

  const filtered = useMemo(() => {
    // Placeholder filters — no-op for now, but easy to extend later.
    return items;
  }, [items, filters]);

  const [searched, setSearched] = useState<Establishment[]>(filtered);

  // Debounce for text queries to avoid clunky updates while typing
  useEffect(() => {
    const q = query.trim();
    if (/^\d{6}$/.test(q)) {
      setDebouncedQuery(q); // no debounce for postal
      return;
    }
    const id = setTimeout(() => setDebouncedQuery(q), 250);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    let active = true;
    const q = debouncedQuery;
    if (!q) {
      setSearched(filtered);
      setIsSearching(false);
      setLabel('');
      return () => {
        active = false;
      };
    }
    
    // Reset page to 1 when search criteria change
    setPage(1);
    
    // Determine the strategy based on query type
    const strat = strategies.find((s) => s.canHandle(q)) ?? new TextSearchStrategy();
    const options: { origin?: LatLng } = {};
    
    // If user location is available, pass it as origin for distance sorting
    if (userLocation) {
      options.origin = { latitude: userLocation.lat, longitude: userLocation.lng };
    }
    
    const maybe = strat.run(q, filtered, options);
    if (maybe instanceof Promise) {
      setIsSearching(true);
      const labelText = userLocation
        ? `Sorting by distance from your location`
        : `Sorting by distance from postal code ${q}`;
      setLabel(labelText);
      maybe.then((res) => {
        if (!active) return;
        setSearched(res);
        setIsSearching(false);
      });
    } else {
      // Text search result - sort by user location if available
      if (userLocation) {
        setIsSearching(true);
        setLabel(`Matching "${q}" and sorting by your location`);
        const distanceStrat = new PostalDistanceStrategy();
        const sorted = distanceStrat.run(q, maybe, options);
        if (sorted instanceof Promise) {
          sorted.then((res) => {
            if (!active) return;
            setSearched(res);
            setIsSearching(false);
          });
        } else {
          setSearched(sorted);
          setIsSearching(false);
        }
      } else {
        setSearched(maybe);
        setIsSearching(false);
        setLabel(`Matching "${q}"`);
      }
    }
    return () => {
      active = false;
    };
  }, [filtered, debouncedQuery, userLocation]);

  const total = searched.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = searched.slice(start, start + pageSize);

  const setQueryOnChange = (v: string) => setQuery(v);
  const toggleFilter = (key: keyof Filters) => setFilters((f) => ({ ...f, [key]: !f[key] }));

  const goToPage = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return {
    query,
    setQuery: setQueryOnChange,
    filters,
    toggleFilter,
    page: currentPage,
    total,
    totalPages,
    pageItems,
    submitSearch,
    goToPage,
    pageSize,
    isSearching,
    label,
  };
}

