import { MUIDataTableColumn } from 'mui-datatables';

export interface Item {
  id:	number,
  beacon:	string,
  category:	string,
  service: string,
  itemID: string,
  brand: string,
  model: string,
  supplier:	string,
  purchaseDate:	string,
  purchasePrice: number,
  originLocation:	string,
  currentLocation: string,
  room: string,
  contact: string,
  owner: string,
  timestamp: string,
  battery:	number,
  status: string,
  latitude:	number,
  longitude:	number,
  floor:	number,
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

export const datatableLabels = (noMatchString: String) => {
  return {
    body: {
      noMatch: noMatchString,
      toolTip: 'Trier',
      columnHeaderTooltip: (column: MUIDataTableColumn) => `Trier par ${column.label}`,
    },
    pagination: {
      next: 'Page suivante',
      previous: 'Page précédente',
      rowsPerPage: 'Objets par page:',
      displayRows: '/',
    },
    toolbar: {
      search: 'Rechercher',
      downloadCsv: 'Télécharger CSV',
      print: 'Imprimer',
      viewColumns: 'Afficher les colonnes',
      filterTable: 'Filtrer le tableau',
    },
    filter: {
      all: 'Tous',
      title: 'FILTRES',
      reset: 'RÉINITIALISER',
    },
    viewColumns: {
      title: 'Afficher les colonnes',
      titleAria: 'Afficher/Cacher les colonnes',
    },
    selectedRows: {
      text: 'ligne(s) selectionée(s)',
      delete: 'Éliminer',
      deleteAria: 'Éliminer la ligne choisie',
    },
  };
};

export const itemExamples = getPrettyItems([
  {
    id:	0,
    beacon:	'aa:aa:aa:aa:aa:aa',
    category: 'Oxygène',
    service: 'Bloc 1',
    itemID: 'ItemID',
    brand: 'Brand',
    model: 'Model',
    supplier: 'Supplier',
    purchaseDate: 'Date',
    purchasePrice: 10,
    originLocation:	'OriginLocation',
    currentLocation:	'CurrentLocation',
    room: 'Room',
    contact: 'Contact',
    owner: 'Owner',
    timestamp: 'Timestamp',
    battery: 100,
    status: 'Status',
    latitude:	0,
    longitude: 0,
    floor: 2,
  },
  {
    id:	1,
    beacon:	'aa:aa:aa:aa:aa:aa',
    category: 'Oxygène',
    service: 'Bloc 1',
    itemID: 'ItemID',
    brand: 'Brand',
    model: 'Model',
    supplier: 'Supplier',
    purchaseDate: 'Date',
    purchasePrice: 10,
    originLocation:	'OriginLocation',
    currentLocation:	'CurrentLocation',
    room: 'Room',
    contact: 'Contact',
    owner: 'Owner',
    timestamp: 'Timestamp',
    battery: 100,
    status: 'Status',
    latitude:	0,
    longitude: 0,
    floor: 2,
  },
  {
    id:	2,
    beacon:	'aa:aa:aa:aa:aa:aa',
    category: 'Oxygène',
    service: 'Bloc 1',
    itemID: 'ItemID',
    brand: 'Brand',
    model: 'Model',
    supplier: 'Supplier',
    purchaseDate: 'Date',
    purchasePrice: 10,
    originLocation:	'OriginLocation',
    currentLocation:	'CurrentLocation',
    room: 'Room',
    contact: 'Contact',
    owner: 'Owner',
    timestamp: 'Timestamp',
    battery: 100,
    status: 'Status',
    latitude:	0,
    longitude: 0,
    floor: 2,
  },
]);
