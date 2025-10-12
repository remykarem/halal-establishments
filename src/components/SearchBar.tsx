import {useCallback, useRef} from 'react';

type Props = {
    value: string,
    onChange: (v: string) => void,
    onSubmit: () => void,
    latlng: [number, number] | null
};

export default function SearchBar({value, onChange, onSubmit}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                onSubmit();
            }
        },
        [onSubmit],
    );

    return (
        <div className="w-full flex items-center gap-2">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search establishments or enter postal code"
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
            />
            <button
                onClick={onSubmit}
                className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Search
            </button>
        </div>
    );
}

