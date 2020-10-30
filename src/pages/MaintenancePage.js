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
import {
  displayTextVersion,
  getPrettyItems,
  getServicesStatus,
  getStatusSummaries,
} from '../utils/items';

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
    display: 'flex',
    width: 450,
    height: 438,
    borderRadius: theme.borderRadius,
    justifyContent: 'center',
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
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: theme.maintenanceTitleTextSize,
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
      <PieChart
        width={350}
        height={350}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      >
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
        <Tooltip
          formatter={(value, name, props) => [value, displayTextVersion[name]]}
        />
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
      <BarChart
        width={350}
        height={350}
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
      >
        <XAxis type="number" hide={true} domain={[0, 100]} />
        <YAxis
          type="category"
          dataKey="name"
          label={{
            value: 'Service',
            angle: -90,
            position: 'insideLeft',
            offset: 10,
          }}
        />
        <Tooltip
          formatter={(value, name, props) => [
            `${value}%`,
            displayTextVersion[name],
          ]}
        />
        <Bar
          dataKey="available"
          fill={theme.items.available}
          layout="vertical"
          label={(obj) => `${obj.value}%`}
        />
        <Bar
          dataKey="unavailable"
          fill={theme.items.unavailable}
          layout="vertical"
          label={(obj) => `${obj.value}%`}
        />
        <Bar
          dataKey="needMaintenance"
          fill={theme.palette.secondary.main}
          layout="vertical"
          label={(obj) => `${obj.value}%`}
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

  const labels = {
    nbItemsDamaged: "Nombre d'objets endommagés",
    nbItemsRepaired: "Nombre d'objets réparés",
  };

  const renderColorfulLegendLabels = (value, entry) => {
    const { color } = entry;

    return <span style={{ color }}>{labels[value]}</span>;
  };

  return (
    <CustomCard className={classes.bottomChartCard}>
      <Typography className={classes.cardTitle} variant="subtitle1">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ left: 0, right: 20 }}>
          <XAxis
            dataKey="date"
            label={{
              value: 'Date',
              position: 'insideBottomRight',
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Nombre d'objets",
              angle: -90,
              position: 'insideLeft',
              offset: 10,
            }}
          />
          <Tooltip formatter={(value, name, props) => [value, labels[name]]} />
          <Legend formatter={renderColorfulLegendLabels} />
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
 * @param {object} props.style
 */
function BottomCard({ title, value, color, style }) {
  const classes = useStyles();

  return (
    <CustomCard className={classes.bottomCard} style={style}>
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
  // const [items, setItems] = useState([]); TODO: use after demo

  // const { data } = useQuery('items', getItems);

  // useEffect(() => {
  //   if (data) {
  //     setItems(data);
  //   }
  // }, [data]);

  const items = [
    {
      beaconId: '1',
      status: 'available',
      battery: 94,
      latitude: 46.5405405405405,
      longitude: 6.60114696411765,
      lastSeen: '2020-10-26T08:54:14',
      type: 'Oxygène',
      service: 'Bloc 1',
      id: 1,
    },
    {
      beaconId: '2',
      status: 'available',
      battery: 87,
      latitude: 46.5405405405405,
      longitude: 6.60114696411765,
      lastSeen: '2020-10-26T08:54:14',
      type: 'Lit',
      service: 'Bloc 1',
      id: 2,
    },
    {
      beaconId: '3',
      status: 'unavailable',
      battery: 0,
      latitude: 46.5405405405405,
      longitude: 6.60114696411765,
      lastSeen: '2020-10-26T08:54:14',
      type: 'ECG',
      service: 'Bloc 1',
      id: 3,
    },
    {
      beaconId: '4',
      status: 'needMaintenance',
      battery: 20,
      latitude: 46.5405405405405,
      longitude: 6.60114696411765,
      lastSeen: '2020-10-26T08:54:14',
      type: 'Oxygène',
      service: 'Bloc 1',
      id: 4,
    },
    {
      beaconId: '5',
      status: 'unavailable',
      battery: 0,
      latitude: 46.5405405405405,
      longitude: 6.60114696411765,
      lastSeen: '2020-10-26T08:54:14',
      type: 'ECG',
      service: 'Bloc 2',
      id: 5,
    },
    {
      beaconId: '6',
      status: 'available',
      battery: 12,
      latitude: 46.5405405405405,
      longitude: 6.60114696411765,
      lastSeen: '2020-10-26T08:54:14',
      type: 'Lit',
      service: 'Bloc 2',
      id: 6,
    },
    {
      beaconId: '7',
      status: 'available',
      battery: 12,
      latitude: 46.5405405405405,
      longitude: 6.60114696411765,
      lastSeen: '2020-10-26T08:54:14',
      type: 'Lit',
      service: 'Bloc 2',
      id: 7,
    },
    {
      beaconId: '8',
      status: 'needMaintenance',
      battery: 20,
      latitude: 46.5405405405405,
      longitude: 6.60114696411765,
      lastSeen: '2020-10-26T08:54:14',
      type: 'Lit',
      service: 'Bloc 2',
      id: 8,
    },
    {
      beaconId: '9',
      status: 'available',
      battery: 73,
      latitude: 46.5405405405405,
      longitude: 6.60114696411765,
      lastSeen: '2020-10-26T08:54:14',
      type: 'Lit',
      service: 'Bloc 2',
      id: 9,
    },
  ];

  // TODO: replace with actual data
  const dataForTimeSeries = [
    { nbItemsDamaged: 30, nbItemsRepaired: 20, date: '18/10' },
    { nbItemsDamaged: 20, nbItemsRepaired: 40, date: '20/10' },
    { nbItemsDamaged: 5, nbItemsRepaired: 55, date: '24/10' },
    { nbItemsDamaged: 7, nbItemsRepaired: 53, date: '25/10' },
    { nbItemsDamaged: 10, nbItemsRepaired: 50, date: '27/10' },
    { nbItemsDamaged: 12, nbItemsRepaired: 48, date: '30/10' },
  ];

  const prettyItems = getPrettyItems(items);
  const statusSummaries = getStatusSummaries(items, theme);
  const servicesStatus = getServicesStatus(items);

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      <Grid
        container
        direction="row"
        justify="space-between"
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
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: 16 }}
        wrap={'nowrap'}
      >
        <StatusPieChart data={statusSummaries} title="État du materiel" />
        <ItemsMaintenanceTable items={prettyItems} />
        <ServicesBarChart data={servicesStatus} title="État des services" />
      </Grid>

      <StatusLineChart
        data={dataForTimeSeries}
        title="Évolution de la maintenance au cours du temps"
      />

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ marginTop: 16 }}
        wrap={'nowrap'}
      >
        <BottomCard
          title="Moyenne abimés par jour"
          value={40}
          style={{ marginRight: 8 }}
          color={theme.items.unavailable}
        />
        <BottomCard
          title="Moyenne réparés par jour"
          value={30}
          style={{ marginLeft: 8, marginRight: 8 }}
          color={theme.items.available}
        />
        <BottomCard
          title="Matériel utilisé"
          value={'90%'}
          style={{ marginLeft: 8, marginRight: 8 }}
          color={theme.items.available}
        />
        <BottomCard
          title="Prévision"
          value="Risque d'accumulation"
          style={{ marginLeft: 8 }}
          color={theme.items.unavailable}
        />
        {/* TODO: change value and color based on unavailable > available for last card */}
      </Grid>
    </Grid>
  );
}
