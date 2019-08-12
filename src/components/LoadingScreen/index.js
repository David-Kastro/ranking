import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { Bars } from 'svg-loaders-react';
import './style.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as LoadingActions } from "../../store/ducks/_Loading";

class LoadingScreen extends Component {

    state = {
        loading: true,
    }

    componentDidUpdate() {

        const { load } = this.props;

        if( this.state.loading === load.isLoading ) {
            return;
        }

        if( load.isLoading ) {
            this.setState({ loading: true });
        }

        if( !load.isLoading ) {
            setTimeout(() => {
                this.setState({ loading: false });
                this.props.FinishLoading();
            }, 2000);
        }
    }

    render() {

        const { loading } = this.state;

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
    load: state.loadingReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators(LoadingActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingScreen);