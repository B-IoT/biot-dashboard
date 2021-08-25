import { MUIDataTableColumn } from 'mui-datatables';

/**
 * An item category.
 */
export interface Category {
  id: number;
  name: string;
}

/**
 * An item.
 */
export interface Item {
  id?: number;
  beacon: string | null;
  category: string | null;
  fullCategory?: string | null;
  categoryID?: number | null;
  service: string | null;
  brand: string | null;
  model: string | null;
  supplier: string | null;
  itemID: string | null;
  purchaseDate: string | null;
  purchasePrice: string | number | null;
  originLocation: string | null;
  currentLocation: string | null;
  room: string | null;
  contact: string | null;
  currentOwner: string | null;
  previousOwner: string | null;
  orderNumber: string | null;
  color: string | null;
  serialNumber: string | null;
  maintenanceDate: string | null;
  comments: string | null;
  lastModifiedDate: string | null;
  lastModifiedBy: string | null;
  timestamp: string | null;
  battery: number | null;
  status: string | null;
  beaconStatus: string | null;
  latitude: number | null;
  longitude: number | null;
  floor: number | null;
  temperature: number | null;
}

/**
 * Returns an empty item.
 */
export const emptyItem = (): Item => ({
  beacon: null,
  category: null,
  categoryID: null,
  service: null,
  brand: null,
  model: null,
  supplier: null,
  itemID: null,
  purchaseDate: null,
  purchasePrice: null,
  originLocation: null,
  currentLocation: null,
  room: null,
  contact: null,
  currentOwner: null,
  previousOwner: null,
  orderNumber: null,
  color: null,
  serialNumber: null,
  maintenanceDate: null,
  comments: null,
  lastModifiedDate: null,
  lastModifiedBy: null,
  timestamp: null,
  battery: null,
  status: null,
  beaconStatus: null,
  latitude: null,
  longitude: null,
  floor: null,
  temperature: null,
});

export const itemFieldTranslation: Record<string, string> = {
  id: 'Code',
  status: 'Statut',
  category: 'Catégorie',
  service: 'Service',
  brand: 'Marque',
  model: 'Modèle',
  supplier: 'Fournisseur',
  itemID: "Numéro d'article",
  purchaseDate: "Date d'achat",
  purchasePrice: "Prix d'achat",
  originLocation: "Localisation d'origine",
  currentLocation: 'Localisation actuelle',
  room: 'Chambre',
  contact: 'Contact',
  previousOwner: "Propriétaire d'origine",
  currentOwner: 'Propriétaire actuel',
  orderNumber: 'Numéro de commande',
  color: 'Couleur',
  serialNumber: 'Numéro de série',
  maintenanceDate: 'Date de maintenance',
  comments: 'Commentaire',
  lastModifiedDate: 'Date de modification',
  lastModifiedBy: 'Modifié par',
};

export const mandatoryFields = [
  'category',
  'brand',
  'model',
  'supplier',
  'itemID',
  'purchaseDate',
  'purchasePrice',
];

export const underCreation = 'Under creation';

export const displayTextVersion: Record<string, string> = {
  available: 'disponible',
  unavailable: 'indisponible',
  needMaintenance: 'à réparer',
};

/**
 * Extracts the category name given the string. The string can either be of the form "group.category" or simply "category".
 * 
 * @param s the string containing the category and eventually its group
 * @return the category name without group, if any
 */
export function extractCategoryName(s: string): string {
  const split = s.split('.');
  return split.length > 1 ? split[1] : split[0];
}

export function getReadableDate(inputFormat: string) {
  function pad(s: number) {
    return s < 10 ? '0' + s : s;
  }

  if (!inputFormat) {
    return '';
  }
  let d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}

export function convertDate(inputFormat: string) {
  if (!inputFormat || inputFormat === '') return null;

  const split = inputFormat.split('/');
  return new Date(
    parseInt(split[2]),
    parseInt(split[1]) - 1,
    parseInt(split[0])
  );
}

export function extractItem(item: Item): Item {
  return {
    ...item,
    purchaseDate: item.purchaseDate ? getReadableDate(item.purchaseDate) : null,
    maintenanceDate: item.maintenanceDate
      ? getReadableDate(item.maintenanceDate)
      : null,
    lastModifiedDate: item.lastModifiedDate
      ? getReadableDate(item.lastModifiedDate)
      : null,
  };
}

export function getPrettyItems(items: Item[]): Item[] {
  return items.map(extractItem);
}

export const datatableLabels = (noMatchString: String) => {
  return {
    body: {
      noMatch: noMatchString,
      toolTip: 'Trier',
      columnHeaderTooltip: (column: MUIDataTableColumn) =>
        `Trier par ${column.label}`,
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
