import React, {Component} from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import SignUp from './SignUp';
import logo from '../../assets/img/uniranking.png';
import styles from './styles';

import firebase from '../../services/firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
import { Creators as MsgActions } from "../../store/ducks/_Menssage";

const GoogleProvider   = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider();

class SignInComponent extends Component {


	state = {
		email: '',
		password: '',
		passwordVisible: false,	
		SignUp: false,
	}

	componentDidMount() {

		this.props.StartLoading();

		this._removeFirebaseListener = firebase.auth().onAuthStateChanged( user => {

			if( user ) {

				this.props.StartLoading();
				this.props.SigninSuccess( user );
				this.props.history.push('/');

			} else {

				this.props.UnsetLoadingOnly();

			}
			
		})

	}

	componentWillUnmount() {
        this._removeFirebaseListener();
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
						color: 'secondary',
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

			<Grid container style={styles.container} direction="column" align="center" justify="center">

				<Fade in={load.isLoadingFinished} timeout={{enter: 1000}}>
					<div>
						<img src={logo} style={styles.logo} alt="UniRanking"/>

						<Typography style={styles.welcome} color="primary" variant="h6" component="h1" gutterBottom>
							Seja bem vindo ao novo sistema de avaliação da Uniplan-DF!
						</Typography>

						<Typography style={styles.instructions} variant="body2">
							Faça login para ir à tela principal!
						</Typography>
					</div>
				</Fade>

				<Grow in={load.isLoadingFinished}>
					<Card style={isWidthUp('sm', this.props.width) ? styles.form : styles.form_sm}>
						<CardContent>
							<Grid container style={{flexGrow: 1}} spacing={3}>
								<Grid item xs={12}>
									<TextField
										id="email"
										label="Digite seu E-mail..."
										value={this.state.email}
										type="email"
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
									<Button onClick={() => this.SignInWithEmail()} variant="contained" fullWidth color="primary" style={{textTransform: 'none'}}>
										Fazer Login
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Divider style={{marginTop: 10}} />
									
										<Typography
											color="textSecondary"
											display="block"
											variant="caption"
											style={{marginTop: -12}}
										>
											<span style={{backgroundColor:'white', padding: 10}}>OU</span>
										</Typography>
									
								</Grid>
								<Grid item xs={12}>
									<Grid container style={styles.socialContainer} direction="column" justify="space-around">
										<Button onClick={() => this.SignInWithGoogle()} style={styles.googleButton} variant="contained" fullWidth>
											<img alt="" style={styles.socialIcon} src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></img>
											Fazer Login com Google
										</Button>
										<Button onClick={() => this.SignInWithFacebook()} style={styles.facebookButton} variant="contained" fullWidth>
											<img alt="" style={styles.socialIcon} src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"/>
											Fazer Login com Facebook
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grow>
				<Grow in={load.isLoadingFinished}>
					<Typography variant="body1" style={styles.signUp}>
						Ainda não possui cadastro? 
						<Link style={styles.link} color="primary" onClick={() => this.setState({SignUp: true})}>
							Inscreva-se aqui!
						</Link>
					</Typography>
				</Grow>
				<SignUp show={this.state.SignUp} close={() => this.setState({SignUp: false})} />
			</Grid>

		);
	}
}

const SignIn = withWidth()(SignInComponent);

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