type Props = {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;
  const canPrev = page > 1;
  const canNext = page < totalPages;
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrev}
      >
        Prev
      </button>
      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>
      <button
        className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
      >
        Next
      </button>
    </div>
  );
}

