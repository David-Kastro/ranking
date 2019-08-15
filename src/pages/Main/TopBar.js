import React, {Component} from 'react';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {Typography, Grid, Avatar, IconButton, Fade} from '@material-ui/core';


import firebase from '../../services/firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";

class TopBar extends Component {

  async SignOut() {

    try {
  
      await firebase.auth().signOut()
  
    } catch( err ) {
  
      console.log( err ); // Handle
  
    }
    
  }

  render() {
    const { auth, load } = this.props;

    return (
        <Fade in={load.isLoadingFinished}>
          <Grid container style={{paddingRight: 50, paddingLeft: 50}} direction="row" justify="flex-end" alignItems="center">
            <Grid item>
              {
                auth.user.photoURL
                  ? (<Avatar alt={auth.user.displayName} src={auth.user.photoURL} style={{margin: 10, width: 30, height: 30}} />)
                  : (
                    <Avatar alt={auth.user.displayName} style={{margin: 10, width: 30, height: 30}}>
                      <PersonIcon />
                    </Avatar>
                  )
              }
            </Grid>
              
            <Grid item style={{marginRight: 10}}>
              <Typography variant="body2" style={{color: '#595959'}}>{auth.user.displayName}</Typography>
            </Grid>
            <Grid item style={{marginTop: -3, marginRight: 10}}>
              |
            </Grid>
            <Grid item>
              <IconButton aria-label="SignOut" size="small" color="primary" onClick={() => this.SignOut()}>
                <PowerSettingsNewIcon />
              </IconButton>
            </Grid>

          </Grid>
        </Fade>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducers,
  load: state.loadingReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ...AuthActions,
    ...LoadingActions,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);