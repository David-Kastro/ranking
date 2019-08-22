import React, {Component} from 'react';
import debounce from 'lodash/debounce';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {Avatar, Tooltip, Zoom} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import firebase from '../../services/firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as MsgActions } from "../../store/ducks/_Menssage";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


class SearchBar extends Component {

    state = {
        anchorEl: null
    }

    async SignOut() {

        try {
      
          await firebase.auth().signOut()
      
        } catch( err ) {
      
          console.log( err ); // Handle
      
        }
        
    }

    Sair() {
      this.closeMenu();
      this.SignOut();
    }

    openMenu(event) {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    closeMenu() {
        this.setState({
            anchorEl: null
        })
    }

    searchProfessors = debounce( (search) => {

      const {professors, SetProfessors, history} = this.props;
      
      if( history.location.pathname !== '/' ) 
      {
        history.push('/');
      }
  
      setTimeout(() => {
  
        SetProfessors( professors.professors );
  
      }, 500)
  
    }, 500)
  
    onSearch( search ) {
      const {professors, LoadProfessors} = this.props;
  
      if( !professors.loading ) {
        LoadProfessors();
      }
  
      this.searchProfessors(search)
  
    }

    render() {
        const { auth, history } = this.props;
        const { pathname }      = this.props.history.location;

        return (
          <>
            {
              auth.isAuthenticated
                ? (
                    <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                      <Paper style={{display: 'flex', alignItems: 'center', width: 520, margin: 10}}>

                          {
                            pathname !== '/'
                              ? (
                                <Tooltip TransitionComponent={Zoom} title="Voltar ao Ranking">
                                    <IconButton style={{padding: 10}} aria-label="goBack" onClick={() => history.push('/')}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Tooltip>
                              )
                              : (
                                <Tooltip TransitionComponent={Zoom} title="Buscar Professor">
                                  <IconButton style={{padding: 10}} aria-label="search">
                                    <SearchIcon />
                                  </IconButton>
                                </Tooltip>
                              )
                          }
                          
                          <InputBase
                              style={{marginLeft: 8, flex: 1}}
                              placeholder="Buscar professor"
                              inputProps={{ 'aria-label': 'buscar professor' }}
                              onChange={(event) => this.onSearch( event.target.value )}
                          />
                          <Divider style={{width: 1, height: 28, margin: 4}} />
                          <div>
                              <Tooltip TransitionComponent={Zoom} title={auth.user.displayName}>
                                  <IconButton onClick={(event) => this.openMenu(event)} aria-label="thumb" size="small" style={{margin: 5}}>
                                      {
                                      auth.user.photoURL
                                          ? (<Avatar alt={auth.user.displayName} src={auth.user.photoURL} style={{width: 30, height: 30}} />)
                                          : (
                                          <Avatar alt={auth.user.displayName} style={{width: 30, height: 30}}>
                                              <PersonIcon />
                                          </Avatar>
                                          )
                                      }
                                  </IconButton>
                              </Tooltip>
                              <StyledMenu
                                  id="customized-menu"
                                  anchorEl={this.state.anchorEl}
                                  keepMounted
                                  open={Boolean(this.state.anchorEl)}
                                  onClose={() => this.closeMenu()}
                              >
                                  <StyledMenuItem onClick={() => this.Sair()}>
                                      <ListItemIcon>
                                          <PowerSettingsNewIcon />
                                      </ListItemIcon>
                                      <ListItemText primary="Sair" />
                                  </StyledMenuItem>
                              </StyledMenu>
                          </div>
                      </Paper>
      
                  </Grid>
                )
                : null
            }
          </>
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