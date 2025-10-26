import {Select} from './styled/Select';
import type {EstablishmentTypeFilter} from '../hooks/useSearch';

type Props = {
    value: EstablishmentTypeFilter;
    onChange: (value: EstablishmentTypeFilter) => void;
};

export default function EstablishmentTypeFilterDropdown({value, onChange}: Props) {
    return (
        <Select
            value={value}
            onChange={(e) => onChange(e.target.value as EstablishmentTypeFilter)}
            aria-label="Filter by Establishment Type"
        >
            <option value="All">All Establishment Types</option>
            <option value="Hawker">Hawker</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Central Kitchen">Central Kitchen</option>
            <option value="Catering Company">Catering Company</option>
            <option value="Snack Bar / Bakery">Snack Bar / Bakery</option>
        </Select>
    );
}
