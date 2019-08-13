import React, {Component} from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as MsgActions } from "../../store/ducks/_Menssage";

class SignUpDialog extends Component {

    state = {
        name: '',
        email: '',
		password: '',
		passwordVisible: false,	
        showDialog: false,
        formIsValid: null,
    }

    checkFormIsValid() {
        this.setState({
            formIsValid: !!this.state.name && !!this.state.email && !!this.state.password,
        })
    }

    setField( field, value ) {
        this.setState({
            [field]: value,
        })
    }

    closeDialog() {

        this.setState({
            name: '',
            email: '',
            password: '',
            passwordVisible: false,	
            showDialog: false,
            formIsValid: null,
        });

        this.props.close();

    }

    SignUpWithEmailAndPassword() {

        const { email, password, name } = this.state;

        const {
            firebase,
            setGoogleAlreadyExistsMsg,
            setFacebookAlreadyExistsMsg,
            setEmailAlreadyExistsMsg,
        } = this.props;

		this.props.SigninLoading();

		firebase
			.auth()
			.fetchSignInMethodsForEmail( email )
			.then( result => {
			
				if( result[0] ) {

					result[0] === 'google.com' 	 && setGoogleAlreadyExistsMsg( email );
					result[0] === 'facebook.com' && setFacebookAlreadyExistsMsg( email );
                    result[0] === 'password'     && setEmailAlreadyExistsMsg( email );

                    this.closeDialog();

				} else {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword( email, password )
                        .then( ({ user }) => {
                            
                            user
                                .updateProfile({
                                    displayName: name
                                })
                                .catch( err => {
                                    console.log( err ); // Handle
                                })

                        })
                        .catch( err => {
                            console.log(err); // Handle
                        });
				}
			})
			.catch( err => {

				this.props.SigninError();
                console.log(err) // Handle
                
			})
	}

    render() {

        const { show, auth } = this.props;

        return (
            <Dialog
                open = {show}
                maxWidth = "xs"
                
            > 
                <Fade in={auth.loading}>
                    <LinearProgress color="primary" />
                </Fade>  

                <DialogActions style={{justifyContent: 'flex-start'}}>
                    <Button color="primary" onClick={() => this.closeDialog()}>
                        <ArrowBackIcon style={{margin: 10}} />
                        Voltar
                    </Button>  
                </DialogActions>
                
                <DialogContent>
                    
                    <Grid container style={{flexGrow: 1}}>
                        <Grid item xs={12} style={{marginBottom: 30}}>
                            <TextField
                                id="name"
                                label="Nome*"
                                type="text"
                                value={this.state.name}
                                fullWidth
                                onChange={(event) => this.setField('name', event.target.value)}
                                onKeyUp={() => this.checkFormIsValid()}
                            />
                        </Grid>
                        <Grid item xs={12} style={{marginBottom: 30}}>
                            <TextField
                                id="signup_email"
                                label="E-mail*"
                                type="email"
                                value={this.state.email}
                                fullWidth
                                onChange={(event) => this.setField('email', event.target.value)}
                                onKeyUp={() => this.checkFormIsValid()}
                            />
                        </Grid>
                        <Grid item xs={12} style={{marginBottom: 20}}>
                            <TextField
                                id="signup_password"
                                label="Senha*"
                                value={this.state.password}
                                type={this.state.passwordVisible ? 'text' : 'password'}
                                fullWidth
                                onChange={(event) => this.setField('password', event.target.value)}
                                onKeyUp={() => this.checkFormIsValid()}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                aria-label="toggle password visibility"
                                                onClick={() => this.setState({passwordVisible: !this.state.passwordVisible})}
                                                onMouseDown={(event) => event.preventDefault()}
                                            >
                                                {this.state.passwordVisible ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grow in={!this.state.formIsValid && this.state.formIsValid !== null}>
                            <Grid item xs={12} style={{marginBottom: 10}}>
                                <Typography variant="caption" color="primary">Por favor, preencha todos os campos com *</Typography>
                            </Grid>
                        </Grow>
                        <Grid item xs={12} style={{marginTop: 10, marginBottom: 10}}>
                            <Button 
                                disabled={!this.state.formIsValid || auth.loading} 
                                variant="contained" 
                                fullWidth 
                                color="primary" 
                                style={{textTransform: 'none'}}
                                onClick={() => this.SignUpWithEmailAndPassword()}
                            >
                                Cadastrar-se
                            </Button>
                        </Grid>
                    </Grid>
                    
                </DialogContent>
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducers,
    msg: state.msgReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ...AuthActions,
    ...MsgActions,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpDialog);