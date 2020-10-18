import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Card from './Card';
import ItemsList from './ItemsList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 350,
    borderRadius: theme.borderRadius,
  },
  title: {
    fontSize: 22,
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
    <Card className={classes.root}>
      <Typography className={classes.title} gutterBottom>
        {title}
      </Typography>
      <ItemsList items={items} />
    </Card>
  );
}
