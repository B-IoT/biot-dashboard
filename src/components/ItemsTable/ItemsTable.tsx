import { useState, useEffect } from 'react';
import MUIDataTable, { FilterType, SelectableRows } from 'mui-datatables';

import { datatableLabels, itemFieldTranslation } from '../../utils/items';
import { ItemsTableProps } from './ItemsTable.props';

/**
 * Interactive and editable item table.
 */
export default function ItemsTable(props: ItemsTableProps) {
  const { items, itemIndex, setItemIndex } = props;

  const cleanItems = items.map(item => {
    item.purchasePrice = item.purchasePrice === 0 ? '' : item.purchasePrice;
    return item
  })
  const [rowIndex, setRowIndex] = useState(-1);

  let columns = []
  const displayedFields = ['category', 'brand', 'model', 'supplier', 'service', 'purchaseDate', 'purchasePrice'];
  const hiddenFields = ['itemID', 'originLocation', 'currentLocation',
    'room', 'contact', 'previousOwner', 'currentOwner', 'orderNumber', 'color',
    'serialNumber', 'maintenanceDate', 'comments', 'lastModifiedDate', 'lastModifiedBy'];

  for (const field of displayedFields) {
    columns.push({
      name: field,
      label: itemFieldTranslation[field],
      options: {
        filter: true,
        sort: true,
      },
    })
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
    })
  }

  const handleRowClick = (_rowData: string[], rowMeta: { dataIndex: number; rowIndex: number }) => {
    if (rowMeta.rowIndex !== rowIndex) {
      setItemIndex(rowMeta.dataIndex);
      setRowIndex(rowMeta.rowIndex);
    } else {
      setItemIndex(-1);
    }
  };

  const noMatchString = 'Aucun objet correspondant trouvé';

  const options = {
    elevation: 1,
    rowsPerPage: 20,
    rowsPerPageOptions: [5, 10, 20, 50],
    selectableRows: 'none' as SelectableRows,
    selectableRowsHeader: false,
    onRowClick: handleRowClick,
    setRowProps: (_row: any[], _dataIndex: number, row: number) => {
      if (rowIndex === row)
        return {
          style: {
            background: 'var(--transparent-white)',
            borderWidth: '5px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'var(--blue)',
          },
        };
      else return {};
    },
    onColumnSortChange: () => {
      setItemIndex(-1);
    },
    textLabels: datatableLabels(noMatchString),
    print: false,
    filterType: 'checkbox' as FilterType,
  };

  useEffect(() => {
    if (itemIndex === -1) setRowIndex(-1);
  }, [itemIndex])

  return (
    <MUIDataTable
      title={''}
      data={cleanItems}
      columns={columns}
      options={options}
    />
  );
}