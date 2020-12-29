import { useQuery } from "react-query";

import { getItems, getItem } from "../api/items";
import biot from "../images/biot.png";
import healthcare from "../images/healthcare.png";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "78vh",
    display: "flex",
    marginBottom: theme.spacing(1),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function HomePage() {
  // const initialItems = [
  //   {
  //     type: 'X',
  //     service: 'Bloc 1',
  //     id: 1,
  //     battery: 50,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.5,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Z',
  //     id: 2,
  //     service: 'Bloc 1',
  //     battery: 100,
  //     status: 'Disponible',
  //     latitude: 6.5668,
  //     longitude: 46.5191,
  //   },
  // ];

  // const { data: items } = useQuery('items', getItems, {
  //   initialData: initialItems,
  // });

  const classes = useStyles();
  const { data } = useQuery("items", getItems);

  // const { data: item, error, isError } = useQuery(['item', 2], getItem);

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
      wrap={"nowrap"}
    >
      <img src={biot} alt="BIoT" width="350" height="350" />
      <img src={healthcare} alt="Healthcare" width="660" height="250" />
    </Grid>
  );
}
