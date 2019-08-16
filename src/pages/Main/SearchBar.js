import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as MsgActions } from "../../store/ducks/_Menssage";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";


class SearchBar extends Component {

    render() {
        const { onSearch } = this.props;

        return (

            <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                <Paper style={{display: 'flex', alignItems: 'center', width: 400, margin: 10}}>
                    <IconButton style={{padding: 10}} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        style={{marginLeft: 8, flex: 1}}
                        placeholder="Buscar professor"
                        inputProps={{ 'aria-label': 'buscar professor' }}
                        onChange={(event) => onSearch( event.target.value )}
                    />
                    <IconButton style={{padding: 10}} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider style={{width: 1, height: 28, margin: 4}} />
                    <IconButton color="primary" style={{padding: 10}} aria-label="filtrar">
                        <TuneIcon />
                    </IconButton>
                </Paper>
 
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.authReducers,
  load: state.loadingReducers,
  msg: state.msgReducers,
  professors: state.professorsReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ...AuthActions,
    ...LoadingActions,
    ...MsgActions,
    ...ProfessorsActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);