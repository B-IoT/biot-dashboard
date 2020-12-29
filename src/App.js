import CssBaseline from "@material-ui/core/CssBaseline";
import { ReactQueryDevtools } from "react-query-devtools";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/orange";

import MainSwitch from "./pages";

const queryCache = new QueryCache();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
  items: {
    available: "#00c853",
    unavailable: "#d50000",
  },
  borderRadius: 16,
  maintenanceTitleTextSize: 18,
});

const useStyles = makeStyles((theme) => ({
  snackbar: {
    borderRadius: theme.borderRadius,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} className={classes.snackbar}>
          <BrowserRouter>
            <MainSwitch />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  );
}
