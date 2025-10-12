import type {LatLng} from '../types';

// Load postal code data from CSV
let postalData: Map<string, LatLng> | null = null;

async function loadPostalData(): Promise<Map<string, LatLng>> {
  if (postalData) return postalData;
  
  try {
    const response = await fetch('./SG_postal.csv');
    const csvText = await response.text();
    const lines = csvText.split('\n').slice(1); // Skip header
    
    postalData = new Map();
    for (const line of lines) {
      if (!line.trim()) continue;
      const [postal_code, _, lat, lon] = line.split(',');
      if (postal_code && lat && lon) {
        postalData.set(postal_code, {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon)
        });
      }
    }
    
    return postalData;
  } catch (error) {
    console.warn('Failed to load postal data:', error);
    return new Map();
  }
}

export async function postalToLatLng(postal: string): Promise<LatLng | null> {
  if (!/^\d{6}$/.test(postal)) return null;
  
  const data = await loadPostalData();
  return data.get(postal) || null;
}

