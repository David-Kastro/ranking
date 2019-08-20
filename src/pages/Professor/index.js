import React, {Component} from 'react';
import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";
import { Creators as AvaliationsActions } from "../../store/ducks/_Avaliations";

import getAvaliationsByProfessor from '../../services/Avaliations/getAvaliationsByProfessor'

import ProfessorDetails from './ProfessorDetails';
import Avaliations from './Avaliations';

class Professor extends Component {

    state = {
        professor: false,
    }

    async componentDidMount() {
        const { 
            LoadAvaliations, 
            SetAvaliations
        }              = this.props;
        const { uid }  = this.props.match.params;

        LoadAvaliations();

        const getAvaliations  = await getAvaliationsByProfessor( uid );

        SetAvaliations( getAvaliations );
    }

    render() {

        return (
            <Grid container style={{flexGrow: 1}} direction="row">

                <Grid item xs={12}>

                    <Grid container style={{flexGrow: 1}} direction="row">
                        <Grid item xs={7}>
                            <ProfessorDetails />
                        </Grid>

                        <Grid item xs={5}>
                            <Avaliations />
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.authReducers,
    load: state.loadingReducers,
    professors: state.professorsReducers,
    avaliations: state.avaliationsReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ...AuthActions,
    ...LoadingActions,
    ...ProfessorsActions,
    ...AvaliationsActions,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Professor);