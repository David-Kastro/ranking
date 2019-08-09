import React, {Component} from 'react';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

import firebaseConfig from '../../config/firebase/firebaseConfig';

firebase.initializeApp(firebaseConfig);

class Main extends Component {

  render() {
    
    const { auth } = this.props;

    return (
      <div>
        <h1>Main</h1>
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