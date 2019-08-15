import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Rating from '@material-ui/lab/Rating';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as MsgActions } from "../../store/ducks/_Menssage";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";

import { Container, Badge } from '@material-ui/core';


class Professors extends Component {

    state = {
        iterations: [1,2,3,4,5]
    }

    ellipsisText( text, maxLenght ) {
        const result = ( ( text ).length > maxLenght ) 
            ? ( ( ( text ).substring( 0, maxLenght - 3 ) ) + '...' ) 
            : text;

        return result;
    }

    render() {
        const {professors, load} = this.props;
        const {iterations}       = this.state;

        return (

            <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                <Grid item xs={10}>
                    <Grow in={load.isLoadingFinished}>
                        <Card style={{width: 520}}>
                            <Fade in={professors.loading}>
                                <LinearProgress color="primary" />
                            </Fade>
                            <Fade in={!professors.loading}>
                                <Container>
                                    <Grid container style={{flexGrow: 1, marginTop: 10, marginBottom: 10}} direction="row" alignItems="center">
                                        <Typography style={{marginRight: 10, color: '#999999'}} variant="h6">#</Typography>
                                        <Typography variant="h5" color="primary">Ranking</Typography>
                                    </Grid>
                                    <Divider></Divider>
                                </Container>
                            </Fade>
                            <List>
                                { professors.professors.map( (professor, index) => (
                                    <div key={professor.uid}>
                                        <ListItem button={!professors.loading} alignItems="flex-start">

                                            <ListItemAvatar>
                                                <Badge badgeContent={`#${professor.rank}`} color={index > 0 ? "secondary" : "primary"}>
                                                {
                                                    professor.photoURL
                                                        ? (<Avatar alt={professor.displayName} src={professor.photoURL} />)
                                                        : (
                                                            <Avatar alt={professor.displayName}>
                                                                <PersonIcon />
                                                            </Avatar>
                                                        )
                                                }
                                                </Badge>
                                            </ListItemAvatar>
                                            
                                            <Grid container style={{flexGrow: 1}} direction="column">
                                                <ListItemText 
                                                    primary={professor.displayName} 
                                                    secondary={
                                                        <React.Fragment>
                                                            
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                            >
                                                                { this.ellipsisText('Professor(a) do curso de análise e desenvolvimento de sistemas.', 100)}
                                                            </Typography>
                                                            
                                                        </React.Fragment>
                                                    }
                                                />
                                                <Grid container style={{flexGrow: 1}} direction="row" justify="flex-end" alignItems="center">

                                                    <Typography variant="body1" style={{color: '#999999'}}>{`${professor.avaliacao.toFixed(1)}`}</Typography>

                                                    <Rating size="small" style={{marginLeft: 8}} value={professor.avaliacao} readOnly /> 

                                                </Grid> 
                                            </Grid>
                                            
                                        </ListItem>
                                        {index !== (professors.professors.length - 1) ? <Divider variant="inset" component="li" /> : null}
                                    </div> 
                                ))}

                                { professors.loading
                                        ? (
                                            <>
                                            {iterations.map( (val) => (
                                                <div key={val}>
                                                    <ListItem alignItems="flex-start">
                
                                                        <ListItemAvatar>
                                                            <Avatar />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={
                                                                <span style={{color: '#cccccc', backgroundColor: "#cccccc"}}>Brunch this weekend?</span>
                                                            }
                                                            secondary={
                                                                <React.Fragment>
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        style={{color: '#cccccc', backgroundColor: "#cccccc"}}
                                                                    >
                                                                        Ali Connors
                                                                    </Typography>
                                                                    <span style={{color: '#cccccc', backgroundColor: "#cccccc"}}>— I'll be in your neighborhood doing errands this…</span>
                                                                </React.Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                
                                                    {val < iterations.length ? <Divider variant="inset" component="li" /> : null}
                                                </div> 
                                            ))}
                                            </>
                                        )
                                        : (null) 
                                }
                            </List>
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
)(Professors);