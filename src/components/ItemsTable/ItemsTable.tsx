import { useState } from 'react';
import MUIDataTable, { FilterType, SelectableRows } from 'mui-datatables';

import { datatableLabels } from '../../utils/items';
import { ItemsTableProps } from './ItemsTable.props';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const glassStyle = {
  WebkitBackdropFilter: 'blur(25px) brightness(110%)',
  backdropFilter: 'blur(25px) brightness(110%)',
  borderRadius: '15px',
  boxShadow: '0 0 20px var(--box-shadow)',
}

/**
 * Interactive and editable item table.
 */
export default function ItemsTable(props: ItemsTableProps) {
  const { items, onItemClick } = props;
  const [itemIndex, setItemIndex] = useState(-1);
  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: 'none',
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: 'none',
        },
        elevation1: {
          boxShadow: 'none',
        },
        elevation2: glassStyle,
        elevation4: {
          boxShadow: 'none',
        },
        elevation8: glassStyle,
      },
      MuiTableCell: {
        root: {
          borderBottom: 'none',
          fontFamily: '\'Axiforma-Regular\', Helvetica, Arial, serif',
        },
      },
      MUIDataTableHeadCell: {
        fixedHeader: {
          backgroundColor: 'none',
        },
      },
      MUIDataTableSelectCell: {
        headerCell: {
          backgroundColor: 'none',
        },
      },
      MuiButton: {
        root: {
          fontFamily: '\'Axiforma-Bold\', Helvetica, Arial, serif',
          color: 'var(--blue)',
        },
      },
      MUIDataTableFilter: {
        root: {
          backgroundColor: 'none',
        },
      },
      MUIDataTableToolbarSelect: {
        root: glassStyle,
      },
    },
  });

  const columns = [
    {
      name: 'category',
      label: 'Catégorie',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'service',
      label: 'Service',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'itemID',
      label: 'Code',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'brand',
      label: 'Marque',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'model',
      label: 'Modèle',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'supplier',
      label: 'Fournisseur',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'supplier',
      label: 'Fournisseur',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'purchaseDate',
      label: 'Date d\'achat',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'purchasePrice',
      label: 'Prix d\'achat',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'originLocation',
      label: 'Localisation d\'origine',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: 'currentLocation',
      label: 'Localisation actuelle',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: 'room',
      label: 'Chambre',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: 'contact',
      label: 'Contact',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: 'owner',
      label: 'Propriétaire',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
  ];

  const handleRowClick = (_rowData: string[], rowMeta: { dataIndex: number; rowIndex: number }) => {
    if (rowMeta.rowIndex != itemIndex) {
      onItemClick(rowMeta.rowIndex);
      setItemIndex(rowMeta.rowIndex);
    } else {
      onItemClick(-1);
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
    setRowProps: (_row: any[], _dataIndex: number, rowIndex: number) => {
      if (rowIndex == itemIndex)
        return {
          style: {
            background: 'var(--transparent-white)',
            borderWidth: '5px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'var(--blue)',
          },
        };
      else return {}
    },
    textLabels: datatableLabels(noMatchString),
    print: false,
    filterType: 'checkbox' as FilterType,
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={''}
        data={items}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
}