export interface Item {
  id: number;
  beacon: string;
  category: string;
  service: string;
  timestamp: string;
  battery: number;
  status: string;
  latitude: number;
  longitude: number;
  floor: number;
}

export const displayTextVersion: Record<string, string> = {
  available: 'disponible',
  unavailable: 'indisponible',
  needMaintenance: 'à réparer',
};

export function getPrettyItems(items: Item[]): Item[] {
  return items.map((item) => {
    return {
      ...item,
      status: displayTextVersion[item.status],
    };
  });
}
