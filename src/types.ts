export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Establishment = {
  id: string;
  name: string;
  address: string;
  type: string;
  number: string;
  scheme: string;
  postal: string; // 6-digit string
  latitude: number;
  longitude: number;
  distanceKm?: number; // Optional distance when sorted by postal
};

export type StrategyOptions = {
  origin?: LatLng;
};

