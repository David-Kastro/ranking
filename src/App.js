import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { indigo } from '@material-ui/core/colors';
import { Provider } from "react-redux";

import store from "./store";
import Routes from "./routes/routes";

import LoadingScreen from './components/LoadingScreen';
import MsgDialog from './components/MsgDialog';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
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
