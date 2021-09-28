import { MUIDataTableColumn } from 'mui-datatables';
import { translate } from '../i18n';

const strings = {
  code: translate('code'),
  category: translate('category'),
  brand: translate('brand'),
  model: translate('model'),
  supplier: translate('supplier'),
  purchaseDate: translate('purchaseDate'),
  purchasePrice: translate('purchasePrice'),
  originalOwner: translate('originalOwner'),
  currentOwner: translate('currentOwner'),
  service: translate('service'),
  originalLocation: translate('originalLocation'),
  currentLocation: translate('currentLocation'),
  room: translate('room'),
  contact: translate('contact'),
  orderNumber: translate('orderNumber'),
  color: translate('color'),
  serialNumber: translate('serialNumber'),
  maintenanceDate: translate('maintenanceDate'),
  comments: translate('comments'),
  lastModifiedDate: translate('lastModifiedDate'),
  lastModifiedBy: translate('lastModifiedBy'),
  status: translate('status'),
  itemID: translate('itemID'),
  sort: translate('sort'),
  sortBy: translate('sortBy'),
  nextPage: translate('nextPage'),
  previousPage: translate('previousPage'),
  print: translate('print'),
  filterTable: translate('filterTable'),
  all: translate('all'),
  filters: translate('filters'),
  reset: translate('reset'),
  showHideColumns: translate('showHideColumns'),
  deleteLine: translate('deleteLine'),
  itemsPerPage: translate('itemsPerPage'),
  search: translate('search'),
  downloadCSV: translate('downloadCSV'),
  showColumns: translate('showColumns'),
  chosenLines: translate('chosenLines'),
  delete: translate('delete'),
};

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
  /**
   * Contains category and subcategory strings.
   */
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
  id: strings.code!,
  status: strings.status!,
  category: strings.category!,
  service: strings.service!,
  brand: strings.brand!,
  model: strings.model!,
  supplier: strings.supplier!,
  itemID: strings.itemID!,
  purchaseDate: strings.purchaseDate!,
  purchasePrice: strings.purchasePrice!,
  originLocation: strings.originalLocation!,
  currentLocation: strings.currentLocation!,
  room: strings.room!,
  contact: strings.contact!,
  previousOwner: strings.originalOwner!,
  currentOwner: strings.currentOwner!,
  orderNumber: strings.orderNumber!,
  color: strings.color!,
  serialNumber: strings.serialNumber!,
  maintenanceDate: strings.maintenanceDate!,
  comments: strings.comments!,
  lastModifiedDate: strings.lastModifiedDate!,
  lastModifiedBy: strings.lastModifiedBy!,
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

export const UNDER_CREATION = 'Under creation';

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
      toolTip: strings.sort!,
      columnHeaderTooltip: (column: MUIDataTableColumn) =>
        `${strings.sortBy} ${column.label}`,
    },
    pagination: {
      next: strings.nextPage!,
      previous: strings.previousPage!,
      rowsPerPage: `${strings.itemsPerPage}:`,
      displayRows: '/',
    },
    toolbar: {
      search: strings.search!,
      downloadCsv: strings.downloadCSV!,
      print: strings.print!,
      viewColumns: strings.showColumns!,
      filterTable: strings.filterTable!,
    },
    filter: {
      all: strings.all!,
      title: strings.filters!,
      reset: strings.reset!,
    },
    viewColumns: {
      title: strings.showColumns!,
      titleAria: strings.showHideColumns!,
    },
    selectedRows: {
      text: strings.chosenLines!,
      delete: strings.delete!,
      deleteAria: strings.deleteLine!,
    },
  };
};
