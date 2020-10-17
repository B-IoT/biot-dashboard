import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import ItemsMap from '../components/ItemsMap';

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
  // TODO if item is undefined, take it from React Query cache
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

/**
 * @param {object} props
 * @param {object} props.item the item described in the page
 */
export default function ItemPage( { item }) {
  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      <InfoCard item={item} />
      <ItemsMap items={[item]} />
    </Grid>
  );
}
