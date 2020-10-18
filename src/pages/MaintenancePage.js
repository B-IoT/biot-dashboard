import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SearchBar from 'material-ui-search-bar';

import { PieChart, Pie, Tooltip, Cell, BarChart } from 'recharts';

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
      >
        <PieChart width={350} height={350}>
          <Pie data={typeSummaries} dataKey="count" nameKey="type" label>
            {typeSummaries.map((summary) => (
              <Cell fill={summary.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <ItemsCard title="Maintenance du matériel" items={items1} />
        <ItemsCard title="Matériel endommagé" items={items2} />
      </Grid>
    </Grid>
  );
}
