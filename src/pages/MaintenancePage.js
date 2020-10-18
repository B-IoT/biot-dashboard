import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SearchBar from 'material-ui-search-bar';

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import ItemsCard from '../components/ItemsCard';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    width: '90%',
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(0.8),
  },
  addButton: {
    height: theme.spacing(6), // same as search bar
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(0.8),
  },
}));

export default function MaintenancePage() {
  const theme = useTheme();
  const classes = useStyles();

  const [query, setQuery] = useState('');

  const items = [
    {
      type: 'X',
      service: 'Bloc 1',
      id: 1,
      battery: 50,
      status: 'Available',
      latitude: 6.6,
      longitude: 46.5,
    },
    {
      type: 'Y',
      id: 2,
      service: 'Bloc 2',
      battery: 30,
      status: 'Available',
      latitude: 6.6,
      longitude: 46.4,
    },
  ];

  const services = [
    { name: 'Bloc 1', available: 75, needMaintenance: 20, unavailable: 5 },
    { name: 'Bloc 2', available: 75, needMaintenance: 15, unavailable: 10 },
  ];

  const dataForTimeSeries = [
    { nbItemsDamaged: 30, nbItemsRepaired: 20, date: '18/10' },
    { nbItemsDamaged: 20, nbItemsRepaired: 40, date: '20/10' },
    { nbItemsDamaged: 5, nbItemsRepaired: 55, date: '24/10' },
  ];

  const typeSummaries = [
    { type: 'Indisponible', count: 50, color: theme.items.unavailable },
    { type: 'Disponible', count: 100, color: theme.items.available },
    { type: 'A maintenir', count: 20, color: theme.palette.secondary.main },
  ];

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <SearchBar
          placeholder="Rechercher"
          className={classes.searchBar}
          value={query}
          onChange={(newQuery) => setQuery(newQuery)}
          onRequestSearch={() => console.log(query)} // TODO check if query not empty as well
        />
        <Button
          variant="contained"
          className={classes.addButton}
          color="primary"
          startIcon={<AddIcon />}
        >
          Ajouter
        </Button>
      </Grid>

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ marginBottom: 32 }}
      >
        <PieChart width={350} height={350}>
          <Pie data={typeSummaries} dataKey="count" nameKey="type" label>
            {typeSummaries.map((summary) => (
              <Cell fill={summary.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <ItemsCard title="Maintenance du matériel" items={items} />
        <BarChart width={350} height={350} data={services} layout="vertical">
          <XAxis type="number" hide={true} domain={[0, 100]} />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar
            dataKey="available"
            fill={theme.items.available}
            layout="vertical"
            label
          />
          <Bar
            dataKey="unavailable"
            fill={theme.items.unavailable}
            layout="vertical"
            label
          />
          <Bar
            dataKey="needMaintenance"
            fill={theme.palette.secondary.main}
            layout="vertical"
            label
          />
        </BarChart>
      </Grid>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={dataForTimeSeries} margin={{left: 0, right: 20}}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="nbItemsDamaged"
            stroke={theme.items.unavailable}
          />
          <Line
            type="monotone"
            dataKey="nbItemsRepaired"
            stroke={theme.items.available}
          />
        </LineChart>
      </ResponsiveContainer>
    </Grid>
  );
}
