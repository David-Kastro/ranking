import React, {Component} from 'react';
import { Grid, Button, Zoom } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";

import getUsersByRole from '../../services/Users/getUsersByRole';

import Professors from './Professors';

class Main extends Component {

  async componentDidMount() {
    
    this.props.LoadProfessors();

    const professors = await getUsersByRole( 'professor' );
    this.props.SetProfessors( professors );

  }

  goToProfessor( professor_uid ) {
    this.props.history.push(`/Professor/${professor_uid}`)
  }

  render() {

    const {professors} = this.props;

    return (
      <Grid container style={{flexGrow: 1}} direction="row">

        <Grid item sm={12} md={12} style={{marginTop: 10}}>
          <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
            <Zoom in={!professors.loading}>
              <Button
                variant="contained"
                color="primary"
                aria-label="tune"
                style={{marginBottom: -15}}
              >
                <TuneIcon style={{marginRight: 5}} />
                Filtrar
              </Button>
            </Zoom>
          </Grid>
        </Grid>

        <Grid item sm={12} md={12}>
          <Professors goToProfessor={(professor_uid) => this.goToProfessor(professor_uid)} />
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