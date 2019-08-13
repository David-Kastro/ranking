import React, {Component} from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../store/ducks/_Loading";

import firebase from '../services/firebase';

class PrivateRoute extends Component {

    state = {
        loading         : true,
        isAuthenticated : false,
    }
  
    componentDidMount() {
  
        this._removeFirebaseListener = firebase.auth().onAuthStateChanged( user => {

            if( !user ) {
        
                this.props.SignoutSuccess();
        
            } else {

                this.props.UnsetLoadingOnly();

            }
        
        })
  
    }
  
    componentWillUnmount() {
        this._removeFirebaseListener();
    }
  
    render() {
  
        const { component: Component, auth, load, ...rest } = this.props;
    
        return (
            <Route
                {...rest}
                render={ props => {
    
                    if( !load.isLoadingFinished ) {
        
                        return null;
        
                    } else {
        
                        return auth.isAuthenticated 
                            ? (<Component {...props} />) 
                            : (<Redirect to={{ pathname: "/Login", state: { from: props.location } }} />)
                    }
                }}
            />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducers,
    load: state.loadingReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ...AuthActions,
    ...LoadingActions
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute);