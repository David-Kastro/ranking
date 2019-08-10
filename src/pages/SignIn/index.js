import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './style.css';

import firebase from '../../services/firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/Authentication";

const GoogleProvider   = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider();

class SignIn extends Component {

  state = {
    loading: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {

        if( user ) {
            this.props.history.push('/');
        } else {
            this.props.UnsetLoading();
        }
        
    })

  }

  SignInWithProvider( Provider ) {

    firebase.auth().signInWithPopup( Provider )
        .then( result => {
            console.log(result.user)
        })
        .catch( error => {
            console.log(error)
        });

  }

  SignInWithGoogle() {
    this.SignInWithProvider( GoogleProvider );
  }

  SignInWithFacebook() {
    this.SignInWithProvider( FacebookProvider );
  }

  render() {
    
    const { auth } = this.props;

    return (

        <Grid container style={{flexGrow: 1, minHeight: '100vh'}} direction="column" align="center" justify="center">
            <Card className="form">    
                <Typography>teste</Typography>
            </Card>
        </Grid>

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
)(SignIn);