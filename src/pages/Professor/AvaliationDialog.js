import React, {Component} from 'react';

import {
    Button, 
    Dialog, 
    DialogContent, 
    DialogActions,
    Grid, 
    Avatar, 
    Typography, 
    FormGroup, 
    FormControlLabel, 
    Checkbox, 
    Container, 
    TextField,
    Fade,
    LinearProgress,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Rating from '@material-ui/lab/Rating';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";
import { Creators as AvaliationsActions } from "../../store/ducks/_Avaliations";

import setAvaliation from '../../services/Avaliations/setAvaliation';
import getAvaliationsByProfessor from '../../services/Avaliations/getAvaliationsByProfessor';
import getUsersByRole from '../../services/Users/getUsersByRole';

class AvaliationDialog extends Component {

    state = {
        avaliation: 1,
        comment: '',
        anonymous: false,
    }

    componentDidMount() {
        const { yourAvaliation } = this.props.avaliations;

        if ( !yourAvaliation ) {
            return;
        }

        this.setState({
            anonymous  : yourAvaliation.anonimo,
            comment    : yourAvaliation.comentario,
            avaliation : yourAvaliation.avaliacao,
        })
    }

    async _SetAvaliation() {

        const { 
            LoadAvaliations,
            SetAvaliations,
            SetProfessors,
            SetCurrentProfessor,
            avaliations,
            auth,
            professors
        } = this.props;

        const { anonymous, comment, avaliation } = this.state;

        LoadAvaliations();

        const usuarioInfo    = !anonymous
            ? { displayName: auth.user.displayName, photoURL: auth.user.photoURL}
            : { displayName: "Anônimo", photoURL: null };

        await setAvaliation({
            user_uid      : auth.user.uid,
            professor_uid : professors.currentProfessor.uid,
            anonimo       : anonymous,
            avaliacao     : avaliation,
            comentario    : comment,
            usuarioInfo,
        }, avaliations.yourAvaliation, avaliations.avaliations );

        const getAvaliations  = await getAvaliationsByProfessor( professors.currentProfessor.uid );
        const getProfessors   = await getUsersByRole( 'professor' );

        SetProfessors( getProfessors );
        SetAvaliations( getAvaliations, auth.user.uid );
        SetCurrentProfessor( professors.currentProfessor.uid );

        this.closeDialog();
    }

    setField( field, value ) {
        this.setState({
            [field]: value,
        })
    }

    setComment( value ) {
        
        if( value.length > 200 ) {
            return;
        }
        
        this.setField( 'comment', value )
    }

    closeDialog() {
        const { close } = this.props;
        close();
    }

    render() {
        const { show }             = this.props;
        const { currentProfessor } = this.props.professors;
        const { loading }          = this.props.avaliations;
        const { avaliation, comment, anonymous } = this.state;

        return (
            <Dialog
                open = {show}
                maxWidth = "sm"
            >
                <Fade in={loading}>
                    <LinearProgress color="primary" />
                </Fade>

                <DialogActions style={{justifyContent: 'flex-start'}}>
                    <Button color="primary" onClick={() => this.closeDialog()}>
                        <ArrowBackIcon style={{margin: 10}} />
                        Voltar
                    </Button>  
                </DialogActions>
                <DialogContent style={{height: 400}}>
                    <Grid container style={{flexGrow: 1, width: 500}} direction="column" justify="center" alignItems="center">
                        <Grid item xs={12}>
                            {  
                                currentProfessor.photoURL
                                    ? (<Avatar alt={currentProfessor.displayName} src={currentProfessor.photoURL} style={{width: 90, height: 90}} />)
                                    : (
                                        <Avatar alt={currentProfessor.displayName} style={{width: 90, height: 90}}>
                                            <span style={{fontSize: 50}}>{currentProfessor.displayName.charAt(0)}</span>
                                        </Avatar>
                                    )
                            }
                        </Grid>
                        <Grid item xs={12} style={{marginTop:20, marginBottom: 20}}>
                            
                            <Typography variant="body1" color="textSecondary">Deixe uma avaliação para {currentProfessor.displayName}!</Typography>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Rating
                                value={avaliation}
                                onChange={(event, value) => this.setField('avaliation', value)}
                                size="large"
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12} style={{marginTop:20, width: '100%'}}>
                            <TextField
                                id="comment"
                                label="Comentário"
                                helperText={`Deixe um comentário ou uma observação para este professor - ${comment.length}/200`}
                                variant="outlined"
                                multiline
                                fullWidth
                                rows="4"
                                rowsMax="6"
                                value={comment}
                                onChange={event => this.setComment( event.target.value )}
                                disabled={loading}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{justifyContent: 'flex-start'}}>
                    <Container>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox disabled={loading} color="primary" checked={anonymous} onChange={() => this.setField('anonymous', !anonymous)} value="checkedA" />
                                }
                                label={
                                    <Typography variant="body2" color="textSecondary">Deseja avaliar este professor como um usuário anônimo?</Typography>
                                }
                            />
                        </FormGroup>
                    </Container>
                </DialogActions>
                <DialogActions>
                    <Button onClick={() => this.closeDialog()} color="primary" disabled={loading}>
                        Cancelar
                    </Button>
                    <Button onClick={() => this._SetAvaliation()} color="primary" variant='contained' autoFocus disabled={loading}>
                        Salvar
                    </Button>
                </DialogActions>
                
            </Dialog>
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
)(AvaliationDialog);