import React, {Component} from 'react';
import { Grid, Typography } from '@material-ui/core';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";

import getUsersByRole from '../../services/Users/getUsersByRole';

import TopBar from './TopBar';
import Professors from './Professors';
import SearchBar from './SearchBar';

class Main extends Component {

  async componentDidMount() {
    
    this.props.LoadProfessors();

    const professors = await getUsersByRole( 'professor' );
    this.props.SetProfessors( professors );

  }

  render() {

    return (
      <Grid container style={{flexGrow: 1}} direction="row">

        <Grid item xs={12}>
          <TopBar />
        </Grid>

        <Grid item sm={12} md={12}>
          <SearchBar />
        </Grid>

        <Grid item sm={12} md={12}>
          <Professors />
        </Grid>

      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducers,
  load: state.loadingReducers,
  professors: state.professorsReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ...AuthActions,
    ...LoadingActions,
    ...ProfessorsActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);