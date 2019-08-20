import React, {Component} from 'react';
import { Grid, Paper, Typography, Grow, Avatar } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";
import { Creators as AvaliationsActions } from "../../store/ducks/_Avaliations";

class Avaliations extends Component {

    state = {
        iterations: [ 1, 2, 3 ],
    }

    ellipsisText( text, maxLenght ) {
        const result = ( ( text ).length > maxLenght ) 
            ? ( ( ( text ).substring( 0, maxLenght - 3 ) ) + '...' ) 
            : text;

        return result;
    }

    render() {

        const { iterations }  = this.state;
        const { avaliations } = this.props;

        return (
            <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
                <Grid container style={{flexGrow: 1, marginTop: 10, marginBottom: 10, paddingLeft: 60}} direction="row" alignItems="center">
                    <Typography style={{marginRight: 10, color: '#999999'}} variant="h6">#</Typography>
                    <Typography variant="h5" color="primary">Avaliações</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grow in={true}>
    
                        { avaliations.loading
                            ? (
                                <>
                                    {iterations.map( (val, index) => (
                                        <div key={val}>
                                            <Grow in={true} timeout={500 + (index * 200)}>
                                                <Card style={{width:500, margin: 10}}>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar style={{backgroundColor: '#e6e6e6'}} />
                                                        }
                                                        action={
                                                            <Grid container style={{flexGrow: 1}} direction="row" justify="flex-end" alignItems="center">
                                                                <Rating size="small" value={0} readOnly disabled />
                                                            </Grid>
                                                        }
                                                        title={
                                                            <span style={{color: '#e6e6e6', backgroundColor: "#e6e6e6"}}>eeeeeeeee eeeeeee</span>
                                                        }
                                                    />
                                                    <CardContent>
                                                        <Typography variant="body2" style={{color: '#e6e6e6', backgroundColor: "#e6e6e6"}} component="span">
                                                            eeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeee e eeeeeee e eeee e eeeeee eeeeee eee eeeeeeeeeeeeee
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grow>
                                        </div> 
                                    ))}
                                </>
                            )
                            : (
                                <>
                                { avaliations.empty
                                    ? (
                                        <Grow in={true}>
                                            <Paper style={{width:500, height: 100}}>
                                                <Grid container style={{flexGrow: 1, height:'100%'}} direction="column" justify="center" alignItems="center">
                                                    <Typography variant="body1" color="textSecondary">Nenhuma avaliação encontrada!</Typography>
                                                </Grid>
                                            </Paper>
                                        </Grow>
                                    )
                                    : (
                                        <>
                                            {avaliations.avaliations.map( (avaliation, index) => (
                                                <div key={avaliation.id}>
                                                    <Grow in={true} timeout={500 + (index * 200)}>
                                                        <Card style={{width:480, margin: 10}}>
                                                            <CardHeader
                                                                avatar={
                                                                    <>
                                                                        {avaliation.usuarioInfo.photoURL 
                                                                            ? (<Avatar alt={avaliation.usuarioInfo.displayName} src={avaliation.usuarioInfo.photoURL} />)
                                                                            : (<Avatar alt={avaliation.usuarioInfo.displayName}> A </Avatar>)
                                                                        }
                                                                    </>
                                                                }
                                                                action={
                                                                    <Grid container style={{flexGrow: 1}} direction="row" justify="flex-end" alignItems="center">
                                                                        <Typography variant="body1" color="textSecondary">{(+avaliation.avaliacao).toFixed(1)}</Typography>
                                                                        <Rating size="small" style={{marginLeft: 8}} value={+avaliation.avaliacao} readOnly />
                                                                    </Grid>
                                                                }
                                                                title={avaliation.usuarioInfo.displayName}
                                                                subheader={avaliation.criadoEm}
                                                            />
                                                            <CardContent>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    { avaliation.comentario ? this.ellipsisText(avaliation.comentario, 200) : ''}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grow>
                                                </div> 
                                            ))}
                                        </>
                                    )
                                }
                                </>
                            ) 
                        }
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
)(Avaliations);