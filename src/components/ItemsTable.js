import React, { useState } from 'react';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';

import { datatableLabels } from '../utils/constants';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  table: {
    borderRadius: theme.borderRadius,
    height: '78vh',
  },
  selectedRow: {
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.primary.main,
  },
}));

/**
 * @param {object} props
 * @param {object[]} props.items the items to display
 * @param {function} props.onItemClick callback when an item is clicked
 * @param {string} props.searchText the text to use for initializing the table search. Might be undefined
 * @param {number} props.defaultItemClickedId the default item clicked id
 */
export default function ItemsTable({ items, onItemClick, searchText, defaultItemClickedId }) {
  const classes = useStyles();
  const [itemClickedId, setItemClickedId] = useState(defaultItemClickedId);

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableToolbar: {
          titleText: {
            fontWeight: 'bold',
          },
        },
      },
    });

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'type',
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
      name: 'battery',
      label: 'Batterie',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'latitude',
      label: 'Latitude',
      options: {
        filter: false,
        sort: true,
        display: false,
      },
    },
    {
      name: 'longitude',
      label: 'Longitude',
      options: {
        filter: false,
        sort: true,
        display: false,
      },
    },
  ];

  const handleRowClick = (rowData, { dataIndex, rowIndex }) => {
    onItemClick(dataIndex);
    setItemClickedId(rowData[0]);
  };

  const noMatchString = 'Désolé, aucun objet correspondant trouvé';

  const options = {
    filterType: 'checkbox',
    elevation: 1,
    rowsPerPage: 20,
    rowsPerPageOptions: [5, 10, 20, 40],
    selectableRows: 'none',
    selectableRowsHeader: false,
    searchText: searchText,
    onRowClick: handleRowClick,
    setRowProps: (rowData, dataIndex, rowIndex) => {
      return {
        className: clsx({
          [classes.selectedRow]: rowData[0] === itemClickedId,
        }),
      };
    },
    textLabels: datatableLabels(noMatchString),
  };

  // TODO: customize text labels to use French

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        className={classes.table}
        title={'Objets'}
        data={items}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
}
