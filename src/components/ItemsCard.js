import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import CustomCard from './CustomCard';
import ItemsList from './ItemsList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 350,
    borderRadius: theme.borderRadius,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
}));

/**
 * @param {object} props
 * @param {string} props.title the title to display for the card
 * @param {object[]} props.items the items to display
 */
export default function ItemsCard({ title, items }) {
  const classes = useStyles();
  return (
    <CustomCard className={classes.root}>
      <Typography className={classes.title} gutterBottom>
        {title}
      </Typography>
      <ItemsList items={items} />
    </CustomCard>
  );
}
