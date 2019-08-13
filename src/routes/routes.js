import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Main from "../pages/Main";
import SignIn from "../pages/SignIn";

import PrivateRoute from "./PrivateRoute"
import history from "./history";

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <PrivateRoute exact path="/" component={Main} />
      <PrivateRoute exact path="/Home" component={Main} />
      <Route exact path="/Login" component={SignIn} />
      <Redirect to="/Home" />
    </Switch>
  </ConnectedRouter>
);

export default Routes;