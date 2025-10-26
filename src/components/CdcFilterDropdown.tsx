import { Select } from './styled/Select';
import type { CdcFilter } from '../hooks/useSearch';

type Props = {
  value: CdcFilter;
  onChange: (value: CdcFilter) => void;
};

export default function CdcFilterDropdown({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as CdcFilter)}
      aria-label="Filter by CDC"
    >
      <option value="all">Search by CDC</option>
      <option value="with">With CDC</option>
      <option value="without">Without CDC</option>
    </Select>
  );
}
