import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grow from '@material-ui/core/Grow';
import './style.css';

import firebase from '../../services/firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as MsgActions } from "../../store/ducks/_Menssage";

const GoogleProvider   = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider();

class SignIn extends Component {


	state = {
		email: '',
		password: '',
		passwordVisible: false,	
	}

	componentDidMount() {

		this.props.StartLoading();

		firebase.auth().onAuthStateChanged( user => {

			if( user ) {
				this.props.SigninSuccess( user );
				this.props.history.push('/');
			} else {
				this.props.UnsetLoadingOnly();
			}
			
		})

	}

	SignInWithProvider( Provider ) {

		firebase.auth().signInWithPopup( Provider )
			.then( result => {
				console.log(result.user)
			})
			.catch( error => {

				const { code, email } = error;

				if( code === 'auth/account-exists-with-different-credential' ) {
					this.props.SetMsg({
						title: `O E-mail "${email}" já está cadastrado!`,
						msg: `Já existe uma conta google cadastrada com o mesmo E-mail! Deseja logar com sua conta Google?`,
						closeText: 'Cancelar',
						actionText: 'Logar com google',
						color: 'primary',
						actionHandler: () => {
							this.SignInWithGoogle();
							this.props.HideMsg();
						}
					});
				}
				console.log( code );
			});

	}

	SignInWithGoogle() {
		this.SignInWithProvider( GoogleProvider );
	}

	SignInWithFacebook() {
		this.SignInWithProvider( FacebookProvider );
	}

	render() {
		
		const { load } = this.props;

		return (

			<Grid container style={{flexGrow: 1, minHeight: '100vh'}} direction="column" align="center" justify="center">
				<Grow in={load.isLoadingFinished}>
					<Card className="form">
						<CardContent>
							<Grid container style={{flexGrow: 1}} spacing={3}>
								<Grid item xs={12}>
									<TextField
										id="email"
										label="Digite seu E-mail..."
										value={this.state.email}
										fullWidth
        								onChange={(event) => this.setState({email: event.target.value})}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="password"
										label="Digite sua Senha..."
										value={this.state.password}
										type={this.state.passwordVisible ? 'text' : 'password'}
										fullWidth
        								onChange={(event) => this.setState({password: event.target.value})}
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
								<Grid item xs={12}>
									<Grid container style={{display: 'flex', width: '100%', height: 100}} direction="column" justify="space-around">
										<Button onClick={() => this.SignInWithGoogle()} style={{backgroundColor: 'white'}} variant="contained" fullWidth>
											<img alt="" style={{width: 26, marginRight: 20}} src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></img>
											<span style={{textTransform: 'initial', color: '#595959'}}>Fazer Login com Google</span>
										</Button>
										<Button onClick={() => this.SignInWithFacebook()} style={{backgroundColor: '#3f51b5'}} variant="contained" fullWidth>
											<img alt="" style={{width: 26, marginRight: 20}} src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"/>
											<span style={{textTransform: 'initial', color: 'white'}}>Fazer Login com Facebook</span>
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grow>
				<Grow in={load.isLoadingFinished}>
					<Typography variant="body1" style={{color: '#666666', marginTop: 10}}>
						Ainda não possui cadastro? 
						<Link style={{margin: 10, cursor: 'pointer'}} color="secondary">
							Inscreva-se aqui!
						</Link>
					</Typography>
				</Grow>
			</Grid>

		);
	}
}

const mapStateToProps = state => ({
  auth: state.authReducers,
  load: state.loadingReducers,
  msg: state.msgReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ...AuthActions,
    ...LoadingActions,
    ...MsgActions,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);