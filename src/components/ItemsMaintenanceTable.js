import React from 'react';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
  useTheme,
} from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { datatableLabels } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
  table: {
    borderRadius: theme.borderRadius,
    width: 450,
    maxHeight: 600,
    maxWidth: 600,
    height: 438,
    marginLeft: 8,
    marginRight: 8,
  },
}));

/**
 * @param {object} props
 * @param {object[]} props.items the items to display
 */
export default function ItemsMaintenanceTable({ items }) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableToolbar: {
          titleText: {
            fontWeight: 'bold',
            fontSize: theme.maintenanceTitleTextSize,
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
    const item = {
      id: rowData[0],
      type: rowData[1],
      service: rowData[2],
      battery: rowData[3],
      status: rowData[4],
      latitude: rowData[5],
      longitude: rowData[6],
    };
    const destination = `/items`;
    history.push({ pathname: destination, id: item.id });
  };

  let noMatchString = 'Désolé, aucun objet correspondant trouvé';
  if (items.length === 0) {
    noMatchString = 'Tous les objets sont disponibles';
  }

  const options = {
    filterType: 'checkbox',
    elevation: 1,
    download: false,
    print: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: 'none',
    selectableRowsHeader: false,
    onRowClick: handleRowClick,
    textLabels: datatableLabels(noMatchString),
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        className={classes.table}
        title={'Matériel indisponible'}
        data={items}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
}

ItemsMaintenanceTable.propTypes = {
  items: PropTypes.array.isRequired,
};
