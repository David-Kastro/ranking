import React, {Component} from 'react';
import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";

class Professor extends Component {

    render() {

        return (
            <Grid container style={{flexGrow: 1}} direction="row">

                <Grid item sm={12} md={12}>
                    página do professor: {this.props.match.params.uid}
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
)(Professor);