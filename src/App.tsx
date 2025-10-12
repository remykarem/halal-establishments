import {useEffect, useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import EstablishmentCard from './components/EstablishmentCard';
import Pagination from './components/Pagination';
import type {Establishment} from './types';
import {useSearch} from './hooks/useSearch';

function App() {
    const [items, setItems] = useState<Establishment[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        let mounted = true;
        // Try build-time import first; fallback to fetch from root for large files.
        import('./data/establishments.json')
            .then((mod) => (mod.default as Establishment[]))
            .catch(async () => {
                const res = await fetch('/establishments.json');
                if (!res.ok) throw new Error('Failed to load establishments.json');
                return (await res.json()) as Establishment[];
            })
            .then((data) => {
                if (!mounted) return;
                setItems(data);
                setLoading(false);
            })
            .catch((err) => {
                if (!mounted) return;
                setLoadError(String(err));
                setLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, []);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error fetching location:", error.message);
                    alert("Unable to retrieve location.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const {
        query,
        setQuery,
        page,
        total,
        totalPages,
        pageItems,
        submitSearch,
        goToPage,
        isSearching,
        label,
    } = useSearch(items);

    return (
        <div className="mx-auto max-w-5xl p-6">
            <header
                className="sticky top-0 z-10 mb-6 rounded-2xl border border-gray-200 bg-white/80 p-4 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <h1 className="text-3xl font-bold tracking-tight">Halal Establishments</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Search Halal-certified establishments by name/address or sort by postal code.
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <SearchBar value={query} onChange={setQuery} onSubmit={submitSearch}
                               latlng={userLocation !== null ? [userLocation.lat, userLocation.lng] : null}/>
                    <button
                        onClick={handleGetLocation}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={userLocation !== null}
                    >
                        Sort By My Location
                    </button>
                </div>
            </header>

            {loading && <div className="text-gray-600">Loading establishments…</div>}
            {loadError && <div className="text-red-600">Error: {loadError}</div>}

            {!loading && !loadError && (
                <>
                    <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                        <span>{total} results</span>
                        <span className="italic text-gray-500">{isSearching ? "Working…" : label}</span>
                    </div>
                    {total === 0 ? (
                        <div className="text-gray-600">No results found.</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {pageItems.map((e) => (
                                <EstablishmentCard key={e.id + e.postal} item={e}/>
                            ))}
                        </div>
                    )}
                    <div className="mt-6">
                        <Pagination page={page} totalPages={totalPages} onPageChange={goToPage}/>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;