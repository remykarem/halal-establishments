import type { Establishment } from '../types';
import { Card, CardHeader, CardTitle, CardDescription } from './styled/Card';
import { Badge } from './styled/Badge';

type Props = {
  item: Establishment;
};

export default function EstablishmentCard({ item }: Props) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>{item.address}</CardDescription>
          <CardDescription>Postal: {item.postal}</CardDescription>
        </div>
        <div className="text-right">
          <Badge $variant="primary">{item.type}</Badge>
          <div className="mt-2 text-xs text-gray-500">{item.scheme}</div>
        </div>
      </CardHeader>
      <div className="mt-0 flex items-center justify-between text-xs text-gray-500">
        {item.distanceKm !== undefined && (
          <Badge $variant="secondary">
            {item.distanceKm.toFixed(1)} km
          </Badge>
        )}
      </div>
    </Card>
  );
}

