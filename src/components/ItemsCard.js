import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

export default function ItemsCard({ title, items }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {title}
        </Typography>
        <ItemsList items={items} />
      </CardContent>
    </Card>
  );
}
