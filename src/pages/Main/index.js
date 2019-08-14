import React, {Component} from 'react';

import firebase from '../../services/firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";

import getUsers from '../../services/Users/getUsers';
import Professors from './Professors';

const SignOut = async () => {

  try {

    await firebase.auth().signOut()

  } catch( err ) {

    console.log( err )

  }
  
}

class Main extends Component {

  async componentDidMount() {
    // const users = await getUsers();
    // console.log( users );
  }

  render() {

    return (
      <div style={{textAlign: 'center'}}>

        <h1>Logado</h1>
        <button onClick={() => SignOut()}>deslogar</button>

        {/* <Professors/> */}

      </div>

    );
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
)(Main);