import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';

const useStyles = makeStyles((theme) => ({
  table: {
    borderRadius: theme.borderRadius,
  },
}));

export default function ItemsMaintenanceTable({ items }) {
  const classes = useStyles();
  const columns = ['Name', 'Company', 'City', 'State'];

  const data = [
    ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
    ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
    ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
    ['James Houston', 'Test Corp', 'Dallas', 'TX'],
  ];

  const options = {
    filterType: 'checkbox',
    elevation: 2,
    tableBodyMaxHeight: 300,
  };

  return (
    <MUIDataTable
      className={classes.table}
      title={'Maintenance'}
      data={data}
      columns={columns}
      options={options}
    />
  );
}
