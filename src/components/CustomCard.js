import React from 'react';
import { Card as MaterialCard } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

export default function CustomCard(props) {
  return (
    <MaterialCard className={props.className}>
      <CardContent>{props.children}</CardContent>
    </MaterialCard>
  );
}
