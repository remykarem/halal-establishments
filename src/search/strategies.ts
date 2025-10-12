import type { Establishment, StrategyOptions, LatLng } from '../types';
import { buildSearchable, containsInsensitive } from '../utils/text';
import { haversineMetric, type DistanceMetric } from '../utils/distance';
import { postalToLatLng } from '../utils/postal';

export interface SearchStrategy {
  canHandle: (q: string) => boolean;
  run: (q: string, items: Establishment[], options: StrategyOptions) => Promise<Establishment[]> | Establishment[];
}

export class TextSearchStrategy implements SearchStrategy {
  canHandle(q: string): boolean {
    return q.trim().length > 0 && !/^\d{6}$/.test(q.trim());
  }

  run(q: string, items: Establishment[]): Establishment[] {
    const normalized = q.trim();
    return items.filter((e) => containsInsensitive(buildSearchable(e), normalized));
  }
}

export class PostalDistanceStrategy implements SearchStrategy {
  private metric: DistanceMetric;
  constructor(metric: DistanceMetric = haversineMetric) {
    this.metric = metric;
  }

  canHandle(q: string): boolean {
    return /^\d{6}$/.test(q.trim());
  }

  async run(q: string, items: Establishment[], options: StrategyOptions): Promise<Establishment[]> {
    const origin = options.origin ?? (await postalToLatLng(q.trim()));
    if (!origin) return items;
    
    const withDistance = items.map(item => ({
      ...item,
      distanceKm: this.metric.distanceKm(origin, toLatLng(item))
    }));
    
    return withDistance.sort((a, b) => a.distanceKm - b.distanceKm);
  }
}

function toLatLng(e: Establishment): LatLng {
  return { latitude: e.latitude, longitude: e.longitude };
}

