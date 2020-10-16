import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

import ItemsCard from '../components/ItemsCard';

export default function MaintenancePage() {
  const theme = useTheme();

  const items1 = [
    { type: 'Weelchair' },
    { type: 'Oxygen' },
    { type: 'Oxygen' },
    { type: 'Oxygen' },
    { type: 'Oxygen' },
    { type: 'Oxygen' },
    { type: 'Oxygen' },
    { type: 'Oxygen' },
    { type: 'Oxygen' },
    { type: 'Oxygen' },
  ];
  const items2 = [{ type: 'X' }, { type: 'Y' }];

  const typeSummaries = [
    { type: 'Indisponible', count: 50, color: theme.items.unavailable },
    { type: 'Disponible', count: 100, color: theme.items.available },
    { type: 'A maintenir', count: 20, color: theme.palette.secondary.main },
  ];

  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      <PieChart width={350} height={350}>
        <Pie data={typeSummaries} dataKey="count" nameKey="type" label>
          {typeSummaries.map((summary) => (
            <Cell fill={summary.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <ItemsCard title="Matériel fonctionnant" items={items1} />
      <ItemsCard title="Matériel endommagé" items={items2} />
    </Grid>
  );
}
