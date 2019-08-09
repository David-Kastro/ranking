import React, {Component} from 'react';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../services/firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

const GoogleProvider   = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider();

class Main extends Component {

  state = {
    isAuthenticated:  false
  }

  _uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {

        if( user ) {
            this.props.history.push('/');
        }
        
    })
  }

  render() {
    
    const { auth } = this.props;

    return (
        <div style={{display: 'flex', justifyContent: 'center', height: 600, alignItems: 'center', flexDirection: 'column'}}>
            {/* <StyledFirebaseAuth
                uiConfig={this._uiConfig} 
                firebaseAuth={firebase.auth()}
            /> */}
            
            <button onClick={() => {
                firebase.auth().signInWithPopup(GoogleProvider).then( result => {
                    console.log(result.user)
                  }).catch( error => {
                    console.log(error)
                  });
            }}>Google</button>

            <button onClick={() => {
                firebase.auth().signInWithPopup(FacebookProvider).then( result => {
                    console.log(result.user)
                  }).catch( error => {
                    console.log(error)
                  });
            }}>Facebook</button>
            
        </div>
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