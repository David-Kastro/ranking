import React, {Component} from 'react';
import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";
import { Creators as AvaliationsActions } from "../../store/ducks/_Avaliations";

import getAvaliationsByProfessor from '../../services/Avaliations/getAvaliationsByProfessor';

import ProfessorDetails from './ProfessorDetails';
import Avaliations from './Avaliations';
import AvaliationDialog from './AvaliationDialog';

class Professor extends Component {

    state = {
        showAvaliationDialog: false,
        renderAvaliationDialog: false,
    }

    async componentDidMount() {
        const { 
            LoadAvaliations, 
            SetAvaliations,
            SetCurrentProfessor,
            auth
        }              = this.props;
        const { uid }  = this.props.match.params;

        LoadAvaliations();

        const getAvaliations  = await getAvaliationsByProfessor( uid );

        await SetAvaliations( getAvaliations, auth.user.uid );
        await SetCurrentProfessor( uid );

        this.setState({
            renderAvaliationDialog: true,
        })
    }

    openAvaliation() {
        const { currentProfessor } = this.props.professors;

        if( !currentProfessor ) {
            return;
        }
        
        this.setState({
            showAvaliationDialog: true
        })
    }

    closeAvaliation() {
        this.setState({
            showAvaliationDialog: false
        })
    }

    render() {

        const { showAvaliationDialog }   = this.state;
        const { renderAvaliationDialog } = this.state;

        return (
            <>
                <Grid container style={{flexGrow: 1}} direction="row">

                    <Grid item xs={12}>

                        <Grid container style={{flexGrow: 1}} direction="row">
                            <Grid item xs={7}>
                                <ProfessorDetails openAvaliation={() => this.openAvaliation()} />
                            </Grid>

                            <Grid item xs={5}>
                                <Avaliations openAvaliation={() => this.openAvaliation()} />
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>

                {renderAvaliationDialog ? <AvaliationDialog show={showAvaliationDialog} close={() => this.closeAvaliation()} /> : null}
            </>
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