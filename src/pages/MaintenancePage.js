import React, { useState, useEffect } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import SearchBar from 'material-ui-search-bar';

import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { getItems } from '../api/items';

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

import ItemsMaintenanceTable from '../components/ItemsMaintenanceTable';
import CustomCard from '../components/CustomCard';
import { useQuery } from 'react-query';
import { getServicesStatus, getStatusSummaries } from '../utils/statistics';

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
  chartCard: {
    borderRadius: theme.borderRadius,
    alignItems: 'center',
  },
  bottomChartCard: {
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  bottomCard: {
    width: 300,
    height: theme.spacing(10),
    borderRadius: theme.borderRadius,
    margin: theme.spacing(1),
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomCardText: {
    textAlign: 'center',
  },
}));

/**
 * @param {object} props
 * @param {object[]} props.data
 * @param {string} props.title
 */
function StatusPieChart({ data, title }) {
  const classes = useStyles();

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <CustomCard className={classes.chartCard}>
      <Typography className={classes.cardTitle} variant="subtitle1">
        {title}
      </Typography>
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((summary) => (
            <Cell fill={summary.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </CustomCard>
  );
}

/**
 * @param {object} props
 * @param {object[]} props.data
 * @param {string} props.title
 */
function ServicesBarChart({ data, title }) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <CustomCard className={classes.chartCard}>
      <Typography className={classes.cardTitle} variant="subtitle1">
        {title}
      </Typography>
      <BarChart width={350} height={350} data={data} layout="vertical">
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
    </CustomCard>
  );
}

/**
 * @param {object} props
 * @param {object[]} props.data
 * @param {string} props.title
 */
function StatusLineChart({ data, title }) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <CustomCard className={classes.bottomChartCard}>
      <Typography className={classes.cardTitle} variant="subtitle1">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ left: 0, right: 20 }}>
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
    </CustomCard>
  );
}

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string | number} props.value
 * @param {string} props.color
 */
function BottomCard({ title, value, color }) {
  const classes = useStyles();

  return (
    <CustomCard className={classes.bottomCard}>
      <Typography className={classes.cardTitle} variant="subtitle1">
        {title}
      </Typography>
      <Typography className={classes.bottomCardText} style={{ color }}>
        {value}
      </Typography>
    </CustomCard>
  );
}

export default function MaintenancePage() {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);

  const { data } = useQuery('items', getItems);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  const dataForTimeSeries = [
    { nbItemsDamaged: 30, nbItemsRepaired: 20, date: '18/10' },
    { nbItemsDamaged: 20, nbItemsRepaired: 40, date: '20/10' },
    { nbItemsDamaged: 5, nbItemsRepaired: 55, date: '24/10' },
    { nbItemsDamaged: 7, nbItemsRepaired: 53, date: '25/10' },
    { nbItemsDamaged: 10, nbItemsRepaired: 50, date: '27/10' },
    { nbItemsDamaged: 12, nbItemsRepaired: 48, date: '30/10' },
  ];

  const statusSummaries = getStatusSummaries(items, theme);
  const servicesStatus = getServicesStatus(items);

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
        wrap={'nowrap'}
      >
        <SearchBar
          placeholder="Rechercher"
          className={classes.searchBar}
          value={query}
          onChange={(newQuery) => setQuery(newQuery)}
          onRequestSearch={() => {
            if (query) {
              const destination = `/items`;
              history.push({ pathname: destination, searchText: query });
            }
          }} // TODO check if query not empty as well
        />
        <Button
          variant="contained"
          className={classes.addButton}
          color="primary"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/items/add"
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
        wrap={'nowrap'}
      >
        <StatusPieChart data={statusSummaries} title="État du materiel" />
        <ItemsMaintenanceTable items={items} />
        <ServicesBarChart data={servicesStatus} title="État des services" />
      </Grid>

      <StatusLineChart
        data={dataForTimeSeries}
        title="Évolution de la maintenance"
      />

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ marginTop: 32 }}
      >
        <BottomCard
          title="Moyenne abimés par jour"
          value={40}
          color={theme.items.unavailable}
        />
        <BottomCard
          title="Moyenne réparés par jour"
          value={30}
          color={theme.items.available}
        />
        <BottomCard
          title="Prévision"
          value="Risque d'accumulation"
          color={theme.items.unavailable}
        />
        {/* TODO: change value and color based on unavailable > available for last card */}
      </Grid>
    </Grid>
  );
}
