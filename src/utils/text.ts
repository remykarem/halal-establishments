export function normalizeForSearch(input: string): string {
  return input.normalize('NFKC').toUpperCase();
}

export function containsInsensitive(haystack: string, needle: string): boolean {
  if (!needle) return true;
  return normalizeForSearch(haystack).includes(normalizeForSearch(needle));
}

export function buildSearchable(establishment: {
  name?: string;
  address?: string;
  type?: string;
  scheme?: string;
  number?: string;
}): string {
  const parts = [
    establishment.name,
    establishment.address,
    establishment.type,
    establishment.scheme,
    establishment.number,
  ].filter(Boolean) as string[];
  return parts.join(' | ');
}

