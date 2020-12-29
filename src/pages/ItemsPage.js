import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import CustomCard from "../components/CustomCard";
import ItemsMap from "../components/ItemsMap";
import ItemsTable from "../components/ItemsTable";
import { getPrettyItems } from "../utils/items";
import { getItems } from "../api/items";

const useStyles = makeStyles((theme) => ({
  demoButton: {
    borderRadius: theme.borderRadius,
    marginLeft: 16,
  },
  dismissButton: {
    borderRadius: theme.borderRadius,
    textColor: "#ffff",
  },
  snackbar: {
    width: 350,
    height: 100,
  },
  infoCardRoot: {
    minWidth: 300,
    height: "78vh",
    marginLeft: 16,
    marginRight: 16,
    alignItems: "center",
    borderRadius: theme.borderRadius,
  },
  infoCardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
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
        <Typography className={classes.infoCardText}>
          Catégorie: {type}
        </Typography>
        <Typography className={classes.infoCardText}>
          Niveau de la batterie: {battery}%
        </Typography>
        <Typography className={classes.infoCardText}>
          Status: {status}
        </Typography>
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

InfoCard.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default function ItemsPage() {
  const classes = useStyles();
  const { id, searchText } = useLocation();

  const [itemToShowIndex, setItemToShowIndex] = useState(-1);
  const demoItems = getPrettyItems([
    {
      beaconId: "1",
      status: "available",
      battery: 94,
      latitude: 46.440896,
      longitude: 6.891924,
      lastSeen: "2020-10-26T08:54:14",
      type: "Oxygène",
      service: "Bloc 1",
      id: 1,
    },
    {
      beaconId: "2",
      status: "available",
      battery: 87,
      latitude: 46.44092,
      longitude: 6.891924,
      lastSeen: "2020-10-26T08:54:14",
      type: "Lit",
      service: "Bloc 1",
      id: 2,
    },
    {
      beaconId: "3",
      status: "available",
      battery: 56,
      latitude: 46.44089,
      longitude: 6.891944,
      lastSeen: "2020-10-26T08:54:14",
      type: "ECG",
      service: "Bloc 1",
      id: 3,
    },
    {
      beaconId: "4",
      status: "needMaintenance",
      battery: 20,
      latitude: 46.44099,
      longitude: 6.891984,
      lastSeen: "2020-10-26T08:54:14",
      type: "Oxygène",
      service: "Bloc 1",
      id: 4,
    },
    {
      beaconId: "5",
      status: "unavailable",
      battery: 0,
      latitude: 46.44079,
      longitude: 6.891984,
      lastSeen: "2020-10-26T08:54:14",
      type: "ECG",
      service: "Bloc 2",
      id: 5,
    },
    {
      beaconId: "6",
      status: "available",
      battery: 12,
      latitude: 46.44089,
      longitude: 6.891684,
      lastSeen: "2020-10-26T08:54:14",
      type: "Lit",
      service: "Bloc 2",
      id: 6,
    },
    {
      beaconId: "7",
      status: "available",
      battery: 12,
      latitude: 46.440898,
      longitude: 6.892268,
      lastSeen: "2020-10-26T08:54:14",
      type: "Lit",
      service: "Bloc 2",
      id: 7,
    },
    {
      beaconId: "8",
      status: "needMaintenance",
      battery: 20,
      latitude: 46.441019,
      longitude: 6.891783,
      lastSeen: "2020-10-26T08:54:14",
      type: "Lit",
      service: "Bloc 2",
      id: 8,
    },
    {
      beaconId: "9",
      status: "available",
      battery: 73,
      latitude: 46.440754,
      longitude: 6.892197,
      lastSeen: "2020-10-26T08:54:14",
      type: "Lit",
      service: "Bloc 2",
      id: 9,
    },
  ]);

  const [items, setItems] = useState(demoItems);

  // const { data } = useQuery('items', getItems); TODO: decomment after demo

  // useEffect(() => {
  //   if (data) {
  //     setItems(data);
  //   }
  // }, [data]);

  useEffect(() => {
    if (id) {
      const itemIndex = items.findIndex((item) => item.id === parseInt(id));
      setItemToShowIndex(itemIndex);
    }
  }, [id, items]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      wrap={"nowrap"}
    >
      <ItemsTable
        items={items}
        searchText={searchText}
        onItemClick={setItemToShowIndex}
        defaultItemClickedId={id}
      />
      <InfoCard items={items} index={itemToShowIndex} />
      <ItemsMap items={items} index={itemToShowIndex} />
      <Button
        variant="contained"
        className={classes.demoButton}
        color="primary"
        onClick={() => {
          const newLongitude = 6.891674;
          const newLatitude = 46.440711;
          const newItems = [...demoItems];
          newItems[2] = {
            ...newItems[2],
            latitude: newLatitude,
            longitude: newLongitude,
          };
          setItems(newItems);

          setItemToShowIndex(2);

          enqueueSnackbar("Attention, l'ECG 3 est sorti par la porte 2!", {
            className: classes.snackbar,
            variant: "warning",
            persist: true,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            action: (key) => (
              <Button
                color="inherit"
                className={classes.dismissButton}
                onClick={() => {
                  closeSnackbar(key);
                }}
              >
                Fermer
              </Button>
            ),
          });
        }}
      >
        Déplacer ECG avec id 3
      </Button>
    </Grid>
  );
}
