import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import firebase from '../services/firebase';

import Main from "../pages/Main";
import SignIn from "../pages/SignIn";

import history from "./history";

const getCurrentUser = async () => {
  const user = await firebase.auth().currentUser;
  return user;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ props =>
      getCurrentUser() 
        ? (<Component {...props} />) 
        : (<Redirect to={{ pathname: "/Login", state: { from: props.location } }} />)
    }
  />
);

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <PrivateRoute exact path="/" component={Main} />
      <PrivateRoute path="/Home" component={Main} />
      <Route path="/Login" component={SignIn} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;