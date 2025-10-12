import { Badge } from './styled/Badge';

type Props = {
  category1: boolean;
  category2: boolean;
  onToggle: (key: 'category1' | 'category2') => void;
};

export default function Filters({ category1, category2, onToggle }: Props) {
  return (
    <div className="flex items-center gap-4">
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={category1}
          onChange={() => onToggle('category1')}
        />
        <Badge>Category1</Badge>
      </label>
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={category2}
          onChange={() => onToggle('category2')}
        />
        <Badge>Category2</Badge>
      </label>
    </div>
  );
}

