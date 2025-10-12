import { Button } from './ui/Button';

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
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrev}
      >
        Prev
      </Button>
      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
      >
        Next
      </Button>
    </div>
  );
}

