import { MUIDataTableColumn } from 'mui-datatables';

export interface Item {
  id: number,
  beacon: string,
  category: string,
  service: string,
  itemID: string,
  brand: string,
  model: string,
  supplier: string,
  purchaseDate: string,
  purchasePrice: string | number,
  originLocation: string,
  currentLocation: string,
  room: string,
  contact: string,
  currentOwner: string,
  previousOwner: string,
  orderNumber: string,
  color: string,
  serialNumber: string,
  maintenanceDate: string,
  comments: string,
  lastModifiedDate: string,
  lastModifiedBy: string,
  timestamp: string,
  battery: number,
  status: string,
  beaconStatus: string,
  latitude: number,
  longitude: number,
  floor: number,
  temperature: number,
}

export const itemFieldTranslation: Record<string, string> = {
  category: 'Catégorie',
  service: 'Service',
  itemID: 'Code',
  brand: 'Marque',
  model: 'Modèle',
  supplier: 'Fournisseur',
  purchaseDate: 'Date d\'achat',
  purchasePrice: 'Prix d\'achat',
  originLocation: 'Localisation d\'origine',
  currentLocation: 'Localisation actuelle',
  room: 'Chambre',
  contact: 'Contact',
  previousOwner: 'Propriétaire d\'origine',
  currentOwner: 'Propriétaire actuel',
  orderNumber: 'Numéro de commande',
  color: 'Couleur',
  serialNumber: 'Numéro de série',
  maintenanceDate: 'Date de maintenance',
  comments: 'Commentaire',
  lastModifiedDate: 'Date de modification',
  lastModifiedBy: 'Modifié par',
};

export const displayTextVersion: Record<string, string> = {
  available: 'disponible',
  unavailable: 'indisponible',
  needMaintenance: 'à réparer',
};

export function getReadableDate(inputFormat: string) {
  function pad(s: number) {
    return (s < 10) ? '0' + s : s;
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
  return new Date(parseInt(split[2]), parseInt(split[1]) - 1, parseInt(split[0]));
}

export function getPrettyItems(items: Item[]): Item[] {
  return items.map((item) => {
    return {
      ...item,
      status: item.status && displayTextVersion[item.status],
      purchaseDate: getReadableDate(item.purchaseDate),
      maintenanceDate: getReadableDate(item.maintenanceDate),
      lastModifiedDate: getReadableDate(item.lastModifiedDate),
    };
  });
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