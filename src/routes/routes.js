import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import SearchBar from '../components/SearchBar';

import Main from "../pages/Main";
import Professor from "../pages/Professor";
import SignIn from "../pages/SignIn";

import PrivateRoute from "./PrivateRoute"
import history from "./history";

const Routes = () => (
  <ConnectedRouter history={history}>
    
    <Route 
      render={({ location }) => (
        <>
        <SearchBar/>
        <Switch location={ location }>
          <PrivateRoute exact path="/" component={Main} />
          <PrivateRoute exact path="/Professor/:uid" component={Professor} />
          <Route exact path="/Login" component={SignIn} />
          <Redirect to="/" />
        </Switch>
        </>
      )} 
    />
    
  </ConnectedRouter>
);

export default Routes;