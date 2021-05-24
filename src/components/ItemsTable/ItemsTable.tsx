import { useState } from 'react';
import MUIDataTable, { FilterType, SelectableRows } from 'mui-datatables';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { datatableLabels } from '../../utils/items';
import { ItemsTableProps } from './ItemsTable.props';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  selectedRow: {
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.primary.main,
  },
}));

/**
 * Interactive and editable item table.
 */
export default function ItemsTable(props: ItemsTableProps) {
  const { items, onItemClick, defaultItemClickedId } = props;
  const [itemClickedId, setItemClickedId] = useState(defaultItemClickedId);
  const classes = useStyles();
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
        elevation4: {
          boxShadow: 'none',
        },
        elevation2: {
          boxShadow: 'none',
          backdropFilter: 'blur(25px) brightness(110%)',
          borderRadius: '15px',
        },
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
        root: {
          backgroundColor: 'none',
          backdropFilter: 'blur(25px) brightness(110%)',
          borderRadius: '15px',
          boxShadow: 'none',
        },
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
    }
  ];

  const handleRowClick = (rowData: string[], rowMeta: { dataIndex: number; rowIndex: number }) => {
    onItemClick(rowMeta.dataIndex);
    setItemClickedId(parseInt(rowData[0]));
  };

  const noMatchString = 'Aucun objet correspondant trouvé';

  const options = {
    elevation: 1,
    rowsPerPage: 20,
    rowsPerPageOptions: [5, 10, 20, 40],
    selectableRows: 'none' as SelectableRows,
    selectableRowsHeader: false,
    onRowClick: handleRowClick,
    setRowProps: (row: any[]) => {
      return {
        className: clsx({
          [classes.selectedRow]: row[0] === itemClickedId,
        }),
      };
    },
    textLabels: datatableLabels(noMatchString),
    print: false,
    filterType: 'checkbox' as FilterType,
  };

  // TODO: customize text labels to use French

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

ItemsTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemClick: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  defaultItemClickedId: PropTypes.number.isRequired,
};