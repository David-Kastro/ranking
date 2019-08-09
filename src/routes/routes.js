import React, {Component} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import firebase from '../services/firebase';

import Main from "../pages/Main";
import SignIn from "../pages/SignIn";

import history from "./history";

class PrivateRoute extends Component {

  state = {
    loading         : true,
    isAuthenticated : false,
  }

  componentDidMount() {

    this._removeFirebaseListener = firebase.auth().onAuthStateChanged( user => {

      if( user ) {

        this.setState({ isAuthenticated: true, loading: false });

      } else {

        this.setState({ loading: false });

      }
      
    })

  }

  componentWillUnmount() {
    this._removeFirebaseListener();
  }

  render() {

    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={ props => {

          if( this.state.loading ) {

            return (<h1>Carregando...</h1>)

          } else {

            return this.state.isAuthenticated 
              ? (<Component {...props} />) 
              : (<Redirect to={{ pathname: "/Login", state: { from: props.location } }} />)
          }
        }}
      />
    )
  }
}

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