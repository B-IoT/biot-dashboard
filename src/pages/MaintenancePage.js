import React from 'react';
import { useTheme } from '@material-ui/core/styles';
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

  const items2 = [
    {
      type: 'X',
      id: 1,
      battery: 50,
      status: 'Available',
      latitude: 6.6,
      longitude: 46.5,
    },
    {
      type: 'Y',
      id: 2,
      battery: 30,
      status: 'Available',
      latitude: 6.6,
      longitude: 46.4,
    },
  ];

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
