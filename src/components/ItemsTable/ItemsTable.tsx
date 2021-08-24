import { useEffect, useState } from 'react';
import MUIDataTable, {
  FilterType,
  MUIDataTableColumnDef,
  SelectableRows,
  MUIDataTableState,
} from 'mui-datatables';

import {
  datatableLabels,
  itemFieldTranslation,
  mandatoryFields,
  underCreation,
} from '../../utils/items';
import { ItemsTableProps } from './ItemsTable.props';
import Popup, { ONGOING_UPDATE_WARNING } from '../Popup/Popup';

const NO_MATCH_STRING = 'Aucun objet trouvé';

/**
 * Interactive and editable item table.
 */
export default function ItemsTable(props: ItemsTableProps) {
  const {
    items,
    itemIndex,
    setItemIndex,
    checkedItems,
    setCheckedItems,
    modifyingItem,
    setModifyingItem,
  } = props;
  const [changeItemPopupVisible, setChangeItemPopupVisible] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(-1);

  const cleanItems = items.map((item) => {
    item.purchasePrice = item.purchasePrice === 0 ? '' : item.purchasePrice;
    return item;
  });

  const [columns, setColumns] = useState<MUIDataTableColumnDef[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    let columns = [];
    const cachedColumns = localStorage.getItem('columns');

    if (cachedColumns) {
      const parsedColumns = JSON.parse(cachedColumns);

      for (const field of parsedColumns) {
        columns.push({
          name: field.name,
          label: itemFieldTranslation[field.name],
          options: {
            filter: true,
            sort: true,
            display: field.display,
          },
        });
      }
      setColumns(columns);
    } else {
      const displayedFields = mandatoryFields;
      const hiddenFields = [
        'id',
        'status',
        'service',
        'originLocation',
        'currentLocation',
        'room',
        'contact',
        'previousOwner',
        'currentOwner',
        'orderNumber',
        'color',
        'serialNumber',
        'maintenanceDate',
        'comments',
        'lastModifiedDate',
        'lastModifiedBy',
      ];

      for (const field of displayedFields) {
        columns.push({
          name: field,
          label: itemFieldTranslation[field],
          options: {
            filter: true,
            sort: true,
          },
        });
      }

      for (const field of hiddenFields) {
        columns.push({
          name: field,
          label: itemFieldTranslation[field],
          options: {
            filter: true,
            sort: true,
            display: false,
          },
        });
      }
      setColumns(columns);
    }
  }, []);

  const changeItemIndex = (index: number) => {
    if (index !== itemIndex) {
      setItemIndex(index);
    } else {
      setItemIndex(-1);
    }
  };

  const handleRowClick = (
    _rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => {
    const index = rowMeta.dataIndex;
    if (modifyingItem) {
      // Prompt user for confirmation, since it may lose all modifications
      setClickedIndex(rowMeta.dataIndex);
      setChangeItemPopupVisible(true);
    } else {
      changeItemIndex(index);
    }
  };

  const options = {
    elevation: 1,
    rowsPerPage,
    rowsPerPageOptions: [5, 10, 20, 50],
    selectableRows: 'multiple' as SelectableRows,
    selectableRowsHeader: true,
    fixedHeader: true,
    onRowClick: handleRowClick,
    setRowProps: (_row: any[], dataIndex: number, _rowIdx: number) => {
      if (itemIndex === dataIndex) {
        return {
          style: {
            background: 'var(--transparent-white)',
            borderWidth: '5px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'var(--blue)',
          },
        };
      } else if (items[dataIndex].status === underCreation) {
        return {
          style: {
            background: 'var(--transparent-blue)',
          },
        };
      }
      return {
        style: {
          background: 'transparent',
        },
      };
    },
    textLabels: datatableLabels(NO_MATCH_STRING),
    print: false,
    filterType: 'checkbox' as FilterType,
    rowsSelected: checkedItems,
    onRowSelectionChange: (
      _currentRowsSelected: any[],
      _allRowsSelected: any[],
      rowsSelected?: any[]
    ) => {
      setCheckedItems(rowsSelected ? rowsSelected : []);
    },
    onTableChange: (action: string, state: MUIDataTableState) => {
      if (action === 'viewColumnsChange') {
        if (state.columns.length > 0) {
          localStorage.setItem('columns', JSON.stringify(state.columns));
        }

        setColumns(state.columns);
      } else if (action === 'changeRowsPerPage') {
        setRowsPerPage(state.rowsPerPage);
      }
    },
    downloadOptions: {
      filename: 'inventaire.csv',
    },
    onDownload: (
      buildHead: (columns: any) => string,
      buildBody: (data: any) => string,
      columns: any,
      data: any
    ) => {
      return '\uFEFF' + buildHead(columns) + buildBody(data);
    },
    customSearch: (searchQuery: string, currentRow: any[], columns: any[]) => {
      // Search even in hidden columns
      return columns.some((col, i) => {
        if (col.searchable) {
          const fieldValue = currentRow[i];
          if (
            fieldValue &&
            fieldValue
              .toString()
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) >= 0
          ) {
            return true;
          }
        }
        return false;
      });
    },
  };

  return (
    <div>
      <MUIDataTable
        title={''}
        data={cleanItems}
        columns={columns}
        options={options}
      />
      {/* Popup visible if an item is been modified and the user tries to change item */}
      <Popup
        open={changeItemPopupVisible}
        onClose={() => setChangeItemPopupVisible(false)}
        text={ONGOING_UPDATE_WARNING}
        onConfirm={() => {
          setModifyingItem(false);
          changeItemIndex(clickedIndex);
          setChangeItemPopupVisible(false);
        }}
        onUndo={() => setChangeItemPopupVisible(false)}
      />
    </div>
  );
}
