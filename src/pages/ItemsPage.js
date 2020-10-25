import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { useQuery } from 'react-query';

import { useLocation } from 'react-router-dom';

import { getItems } from '../api/items';

import CustomCard from '../components/CustomCard';
import ItemsMap from '../components/ItemsMap';
import ItemsTable from '../components/ItemsTable';

const useStyles = makeStyles((theme) => ({
  infoCardRoot: {
    minWidth: 300,
    height: '90vh',
    marginLeft: 16,
    marginRight: 16,
    borderRadius: theme.borderRadius,
  },
  infoCardTitle: {
    fontSize: 18,
  },
  infoCardText: {
    fontSize: 14,
  },
}));

/**
 * @param {object} props
 * @param {object[]} props.items
 * @param {number} props.index
 */
function InfoCard({ items, index }) {
  const classes = useStyles();
  if (index !== -1) {
    const { type, battery, status, latitude, longitude } = items[index];

    return (
      <CustomCard className={classes.infoCardRoot}>
        <Typography className={classes.infoCardTitle} gutterBottom>
          Détails de l'objet
        </Typography>
        <Typography className={classes.infoCardText}>{type}</Typography>
        <Typography className={classes.infoCardText}>
          Niveau de la batterie: {battery}
        </Typography>
        <Typography className={classes.infoCardText}>{status}</Typography>
        <Typography className={classes.infoCardText}>
          Position: ({latitude}, {longitude})
        </Typography>
      </CustomCard>
    );
  } else {
    return (
      <CustomCard className={classes.infoCardRoot}>
        <Typography className={classes.infoCardTitle} gutterBottom>
          Choisir un objet pour avoir plus d'information
        </Typography>
      </CustomCard>
    );
  }
}

export default function ItemsPage() {
  const { id } = useLocation();

  const [itemToShowIndex, setItemToShowIndex] = useState(-1);
  const [items, setItems] = useState([]);

  const { data } = useQuery('items', getItems);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      const itemIndex = items.findIndex((item) => item.id === parseInt(id));
      setItemToShowIndex(itemIndex);
    }
  }, [id, items]);

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      wrap={'nowrap'}
    >
      <ItemsTable items={items} onItemClick={setItemToShowIndex} />
      <InfoCard items={items} index={itemToShowIndex} />
      <ItemsMap items={items} index={itemToShowIndex} />
    </Grid>
  );
}
