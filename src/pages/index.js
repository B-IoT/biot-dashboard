import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import MenuDrawer from "../components/MenuDrawer";
import TopBar from "../components/TopBar";

import ItemsPage from "./ItemsPage";
import HomePage from "./HomePage";
import AddItemPage from "./AddItemPage";
import MaintenancePage from "./MaintenancePage";

import { drawerWidth } from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://biot2.webflow.io">
        BIoT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function MainSwitch() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <TopBar isMenuDrawerOpen={open} onMenuButtonClick={handleDrawerOpen} />
      <MenuDrawer isOpen={open} handleDrawerClose={handleDrawerClose} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path="/maintenance">
            <MaintenancePage />
          </Route>

          <Route path="/items/add">
            <AddItemPage />
          </Route>

          <Route path="/items">
            <ItemsPage />
          </Route>

          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
}
