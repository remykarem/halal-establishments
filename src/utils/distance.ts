import type { LatLng } from '../types';

export interface DistanceMetric {
  distanceKm: (a: LatLng, b: LatLng) => number;
}

export const haversineMetric: DistanceMetric = {
  distanceKm(a: LatLng, b: LatLng): number {
    const R = 6371; // km
    const dLat = deg2rad(b.latitude - a.latitude);
    const dLon = deg2rad(b.longitude - a.longitude);
    const lat1 = deg2rad(a.latitude);
    const lat2 = deg2rad(b.latitude);
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const c = 2 * Math.asin(Math.sqrt(
      sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
    ));
    return R * c;
  },
};

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

