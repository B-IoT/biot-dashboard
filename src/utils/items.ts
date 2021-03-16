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

export function simplifyText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function getIconPath(itemName: string) {
  return '/itemIcons/' + itemName + '.svg';
}

export const itemExamples = getPrettyItems([
  {
    id: 1,
    beacon: 'aa:aa:aa:aa:aa:aa',
    floor: 2,
    category: 'Oxygène',
    status: 'available',
    battery: 94,
    latitude: 46.440896,
    longitude: 6.891924,
    timestamp: '2020-10-26T08:54:14',
    service: 'Bloc 1',
  },
  {
    beacon: 'aa:aa:aa:aa:aa:aa',
    floor: 0,
    timestamp: '2020-10-26T08:54:14',
    status: 'available',
    battery: 87,
    latitude: 46.44092,
    longitude: 6.891924,
    category: 'Lit',
    service: 'Bloc 1',
    id: 2,
  },
  {
    beacon: 'aa:aa:aa:aa:aa:aa',
    floor: 1,
    timestamp: '2020-10-26T08:54:14',
    status: 'available',
    battery: 56,
    latitude: 46.44089,
    longitude: 6.891944,
    category: 'ECG',
    service: 'Bloc 1',
    id: 3,
  },
  {
    beacon: 'aa:aa:aa:aa:aa:aa',
    floor: 2,
    timestamp: '2020-10-26T08:54:14',
    category: 'Oxygène',
    status: 'needMaintenance',
    battery: 20,
    latitude: 46.44099,
    longitude: 6.891984,
    service: 'Bloc 1',
    id: 4,
  },
  {
    beacon: 'aa:aa:aa:aa:aa:aa',
    floor: 0,
    timestamp: '2020-10-26T08:54:14',
    category: 'Lit',
    status: 'unavailable',
    battery: 0,
    latitude: 46.44079,
    longitude: 6.891984,
    service: 'Bloc 2',
    id: 5,
  },
  {
    beacon: 'aa:aa:aa:aa:aa:aa',
    floor: 1,
    timestamp: '2020-10-26T08:54:14',
    category: 'Lit',
    status: 'available',
    battery: 12,
    latitude: 46.44089,
    longitude: 6.891684,
    service: 'Bloc 2',
    id: 6,
  },
  {
    beacon: 'aa:aa:aa:aa:aa:aa',
    floor: 2,
    timestamp: '2020-10-26T08:54:14',
    category: 'ECG',
    status: 'available',
    battery: 12,
    latitude: 46.440898,
    longitude: 6.892268,
    service: 'Bloc 2',
    id: 7,
  },
  {
    beacon: 'aa:aa:aa:aa:aa:aa',
    floor: 1,
    timestamp: '2020-10-26T08:54:14',
    category: 'ECG',
    status: 'needMaintenance',
    battery: 20,
    latitude: 46.441019,
    longitude: 6.891783,
    service: 'Bloc 2',
    id: 8,
  },
  {
    beacon: 'aa:aa:aa:aa:aa:aa',
    floor: 0,
    timestamp: '2020-10-26T08:54:14',
    id: 9,
    category: 'ECG',
    status: 'available',
    battery: 73,
    latitude: 46.440754,
    longitude: 6.892197,
    service: 'Bloc 2',
  },
]);
