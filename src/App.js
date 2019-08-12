import React from "react";
import { Provider } from "react-redux";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import store from "./store";
import Routes from "./routes/routes";

import LoadingScreen from './components/LoadingScreen';
import MsgDialog from './components/MsgDialog';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: defaultTheme.palette.secondary,
    secondary: defaultTheme.palette.primary,
  },
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LoadingScreen />
      <Routes />
      <MsgDialog />
    </ThemeProvider>
  </Provider>
);

export default App;
