import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  table: {
    borderRadius: theme.borderRadius,
    maxHeight: 600,
    maxWidth: 600,
  },
}));

/**
 * @param {object} props
 * @param {object[]} props.items the items to display
 */
export default function ItemsMaintenanceTable({ items }) {
  const classes = useStyles();
  const history = useHistory();

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
    const destination = `/item/${item.id}`; // the first element is the id
    history.push({
      pathname: destination, 
      item: item
    });
  };

  const options = {
    filterType: 'checkbox',
    elevation: 2,
    tableBodyMaxHeight: 300,
    download: false,
    print: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: 'none',
    selectableRowsHeader: false,
    onRowClick: handleRowClick,
  };

  // TODO: customize text labels to use French

  return (
    <MUIDataTable
      className={classes.table}
      title={'Maintenance du matériel'}
      data={items}
      columns={columns}
      options={options}
    />
  );
}
