import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { useQueryCache } from 'react-query';

import { useLocation } from 'react-router-dom';

import ItemsMap from '../components/ItemsMap';
import ItemsTable from '../components/ItemsTable';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: '90vh',
    borderRadius: theme.borderRadius,
  },
  title: {
    fontSize: 18,
  },
  text: {
    fontSize: 14,
  },
}));

/**
 * @param {object} props
 * @param {object} props.item the item described in the page
 */
function InfoCard({ item }) {
  const classes = useStyles();
  const { type, battery, status, latitude, longitude } = item;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Materiel
        </Typography>
        <Typography className={classes.text}>{type}</Typography>
        <Typography className={classes.text}>
          Niveau de la batterie: {battery}
        </Typography>
        <Typography className={classes.text}>{status}</Typography>
        <Typography className={classes.text}>
          Position: ({latitude}, {longitude})
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function ItemsPage() {
  const { id } = useLocation();
  console.log(id);

  const [itemToShowIndex, setItemToShowIndex] = useState(-1);
  const queryCache = useQueryCache();
  const items = queryCache.getQueryData('items');

  // if (typeof id !== 'undefined') { TODO:
  //   const itemIndex = items.findIndex((item) => item.id === parseInt(id));
  //   setItemToShowIndex(itemIndex);
  // }

  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      <ItemsTable items={items} onItemClick={setItemToShowIndex} />
      {itemToShowIndex !== -1 && <InfoCard item={items[itemToShowIndex]} />}
      {/*  */}
      {/* <ItemsMap items={items} /> */}
    </Grid>
  );
}
