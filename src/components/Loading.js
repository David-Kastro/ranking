import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { Bars } from 'svg-loaders-react';
import './style.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../store/ducks/Authentication";

class Loading extends Component {

    state = {
        loading: true,
        className: null,
    }

    componentDidUpdate() {

        const { auth } = this.props;
        console.log( auth.loading )

        if( this.state.loading === auth.loading ) {
            return;
        }

        if( auth.loading ) {
            this.setState({ loading: true })
        }

        if( !auth.loading ) {
            setTimeout(() => this.setState({ loading: false }), 2000);
        }
    }

    render() {

        const { loading } = this.state;
        const { auth }    = this.props;

        return(
            <>
            { loading 
                ? (
                    <Grid 
                        container 
                        style={{flexGrow: 1, minHeight: '100vh', backgroundColor: 'white', position: "absolute", overflow: 'hidden', zIndex: 9}} 
                        direction="column"
                        align="center" 
                        justify="center"
                        
                    >
                        <Bars className="loading-bars" fill="#ff4d4d" />
                    </Grid>
                )
                : null
            }
            </>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.authReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);