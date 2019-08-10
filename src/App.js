import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import Routes from "./routes/routes";

import Loading from './components/Loading';

const App = () => (
  <Provider store={store}>
    <Loading />
    <Routes />
  </Provider>
);

export default App;
