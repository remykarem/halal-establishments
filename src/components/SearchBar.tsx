import {useCallback, useRef} from 'react';
import { Input } from './styled/Input';
import { Button } from './styled/Button';

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
            <Input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search establishments or enter postal code"
            />
            <Button onClick={onSubmit}>
                Search
            </Button>
        </div>
    );
}

