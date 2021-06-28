import { useState, useEffect } from 'react';
import MUIDataTable, {
  FilterType,
  MUIDataTableColumnDef,
  SelectableRows,
  MUIDataTableState,
} from 'mui-datatables';

import { datatableLabels, itemFieldTranslation, underCreation } from '../../utils/items';
import { ItemsTableProps } from './ItemsTable.props';

/**
 * Interactive and editable item table.
 */
export default function ItemsTable(props: ItemsTableProps) {
  const { items, itemIndex, setItemIndex } = props;

  const cleanItems = items.map((item) => {
    item.purchasePrice = item.purchasePrice === 0 ? '' : item.purchasePrice;
    return item;
  });
  const [rowIndex, setRowIndex] = useState(-1);
  const [columns, setColumns] = useState<MUIDataTableColumnDef[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    let columns = [];
    const displayedFields = [
      'id',
      'category',
      'brand',
      'model',
      'purchaseDate',
      'purchasePrice',
    ];
    const hiddenFields = [
      'status',
      'service',
      'supplier',
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
  }, []);

  const handleRowClick = (
    _rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => {
    if (rowMeta.rowIndex !== rowIndex) {
      setItemIndex(rowMeta.dataIndex);
      setRowIndex(rowMeta.rowIndex);
    } else {
      setItemIndex(-1);
    }
  };

  const noMatchString = 'Aucun objet trouvé';

  const options = {
    elevation: 1,
    rowsPerPage,
    rowsPerPageOptions: [5, 10, 20, 50],
    selectableRows: 'none' as SelectableRows,
    selectableRowsHeader: false,
    onRowClick: handleRowClick,
    setRowProps: (_row: any[], dataIndex: number, rowIdx: number) => {
      if (rowIndex === rowIdx)
        return {
          style: {
            background: 'var(--transparent-white)',
            borderWidth: '5px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'var(--blue)',
          },
        };
      else if (items[dataIndex].status === underCreation) {
        return {
          style: {
            background: 'var(--transparent-blue)',
          },
        };
      }
      return {};
    },
    onColumnSortChange: () => {
      setItemIndex(-1);
    },
    textLabels: datatableLabels(noMatchString),
    print: false,
    filterType: 'checkbox' as FilterType,
    onTableChange: (action: string, state: MUIDataTableState) => {
      if (action === 'viewColumnsChange') {
        setColumns(state.columns);
      } else if (action === 'changeRowsPerPage') {
        setRowsPerPage(state.rowsPerPage);
      }
    },
  };

  useEffect(() => {
    if (itemIndex === -1) setRowIndex(-1);
  }, [itemIndex]);

  return (
    <MUIDataTable
      title={''}
      data={cleanItems}
      columns={columns}
      options={options}
    />
  );
}
