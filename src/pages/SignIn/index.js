import React, {Component} from 'react';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../services/firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess: () => false
  }
};

class Main extends Component {

  state = {
    isAuthenticated:  false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {

        if( user ) {
          this.props.history.push('/');
        }
        
      })
  }

  render() {
    
    const { auth }            = this.props;

    return (
        <StyledFirebaseAuth
            uiConfig={uiConfig} 
            firebaseAuth={firebase.auth()}
        />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);