import React, {Component} from 'react';
import { Grid, Grow, CardHeader, LinearProgress, Fade, Card, Avatar, Typography, Button, CardContent, Divider, CircularProgress } from '@material-ui/core';
import PieChartIcon from '@material-ui/icons/PieChart';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";
import { Creators as AvaliationsActions } from "../../store/ducks/_Avaliations";

import Chart from './Chart';

class ProfessorDetails extends Component {

    state = {
        loadChart: false,
    }

    componentDidMount() {
        setTimeout(() => {this.setState({
            loadChart: true
        })}, 2000)
    }

    render() {
        const { currentProfessor }     = this.props.professors;
        const { loading, avaliations } = this.props.avaliations;
        const { openAvaliation }       = this.props;

        return (
            <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                
                <Grow in={true} timeout={500}>

                    <Card style={{width: 600, height: 600, marginTop: 10}}>
                        <Fade in={loading}>
                            <LinearProgress color="primary" />
                        </Fade>
                        {
                            loading
                                ? (null)
                                : (
                                    <>
                                        {
                                            currentProfessor
                                                ? (
                                                    <Grow in={true} timeout={500}>
                                                        <>
                                                            <CardHeader
                                                                avatar={
                                                                    <>
                                                                        {  
                                                                            currentProfessor.photoURL
                                                                                ? (<Avatar alt={currentProfessor.displayName} src={currentProfessor.photoURL} style={{width: 60, height: 60}} />)
                                                                                : (
                                                                                    <Avatar alt={currentProfessor.displayName} style={{width: 60, height: 60}}>
                                                                                        <span style={{fontSize: 30}}>{currentProfessor.displayName.charAt(0)}</span>
                                                                                    </Avatar>
                                                                                )
                                                                        }
                                                                    </>
                                                                }
                                                                action={
                                                                    <Button variant="outlined" color="primary" onClick={() => openAvaliation()} >Avaliar Este Professor</Button>
                                                                }
                                                                title={
                                                                    <Typography variant="body1" color="textSecondary">{currentProfessor.displayName}</Typography>
                                                                }
                                                            />
                                                            <CardContent>
                                                                    <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                                                                        <Grid item xs={12} style={{marginTop: 10, marginBottom: 10}}>
                                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                                {currentProfessor.bio}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12} style={{marginTop: 10, width: '100%'}}>
                                                                            <Grid container style={{flexGrow: 1}} direction="row" justify="space-evenly" alignItems="center">
                                                                                <Grid item xs={4}>
                                                                                    <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                                                                                        <Typography variant="subtitle2">Avaliações</Typography>
                                                                                        <Typography variant="h6" color="primary">{avaliations.length}</Typography>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid item xs={4}>
                                                                                    <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                                                                                        <Typography variant="subtitle2">Avaliação</Typography>
                                                                                        <Typography variant="h6" color="primary">{(currentProfessor.avaliacao).toFixed(1)}</Typography>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid item xs={4}>
                                                                                    <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                                                                                        <Typography variant="subtitle2">Ranking</Typography>
                                                                                        <Typography variant="h6" color="primary">{currentProfessor.rank}</Typography>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} style={{marginTop: 40, width: '100%'}}>
                                                                            <Divider></Divider>
                                                                            <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                                                                                <div style={{backgroundColor: 'white', marginTop: -15}}>
                                                                                    <PieChartIcon color="disabled" style={{width: 30, height: 30, paddingRight: 5, paddingLeft: 5}} />
                                                                                </div>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} style={{width: '100%'}}>
                                                                            <Grid container style={{flexGrow: 1, minHeight: 300}} direction="column" justify="center" alignItems="center">
                                                                                
                                                                                {this.state.loadChart 
                                                                                    ? (
                                                                                        
                                                                                        <Chart avaliations={avaliations} />
                                                                                        
                                                                                    ) 
                                                                                    : <CircularProgress color="primary"></CircularProgress>}
                                                                        
                                                                            </Grid>
                                                                        </Grid>

                                                                    </Grid>
                                                            </CardContent>
                                                        </>
                                                    </Grow>
                                                )
                                                : (
                                                    <Grow in={true} timeout={500}>
                                                        <Grid container style={{flexGrow: 1, height: 600}} direction="column" justify="center" alignItems="center">
                                                            <Typography variant="h5" component="p" color="textSecondary">Não foi possível obter dados desse professor</Typography>
                                                        </Grid>
                                                    </Grow>
                                                )
                                        }
                                    </>
                                )
                        }
                    </Card>

                </Grow>
                
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