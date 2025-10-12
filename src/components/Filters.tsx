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
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">Category1</span>
      </label>
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={category2}
          onChange={() => onToggle('category2')}
        />
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">Category2</span>
      </label>
    </div>
  );
}

