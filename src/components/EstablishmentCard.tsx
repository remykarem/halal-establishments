import type { Establishment } from '../types';

type Props = {
  item: Establishment;
};

export default function EstablishmentCard({ item }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{item.address}</p>
          <p className="mt-1 text-sm text-gray-600">Postal: {item.postal}</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
            {item.type}
          </span>
          <div className="mt-2 text-xs text-gray-500">{item.scheme}</div>
        </div>
      </div>
      <div className="mt-0 flex items-center justify-between text-xs text-gray-500">
        {item.distanceKm !== undefined && (
          <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">
            {item.distanceKm.toFixed(1)} km
          </span>
        )}
      </div>
    </div>
  );
}

