import React, {Component} from 'react';
import { Grid, Grow, Fade, LinearProgress, Card } from '@material-ui/core';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";
import { Creators as AvaliationsActions } from "../../store/ducks/_Avaliations";

class ProfessorDetails extends Component {

    render() {

        return (
            <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                <Grid item xs={5}>
                    <Grow in={true} timeout={500}>
                        <Card style={{width: 600, height: 600}}>
                            <Fade in={true}>
                                <LinearProgress color="primary" />
                            </Fade>
                        </Card>
                    </Grow>
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
)(ProfessorDetails);