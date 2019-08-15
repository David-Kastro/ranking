import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
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
import SignUpDialog from './SignUpDialog';
import logo from '../../assets/img/uniranking.png';
import styles from './styles';

import getUserByDocument from '../../services/Users/getUserByDocument';
import setUser from '../../services/Users/setUser';
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
		name: '',
		passwordVisible: false,	
		SignUp: false,
	}

	_SignInEmailInput = React.createRef();

	SignInEmailInputFocus(email) {
		this.setState({email});
		this._SignInEmailInput.current.focus();
	}


	componentDidMount() {

		this.props.StartLoading();

		this._removeFirebaseListener = firebase.auth().onAuthStateChanged( async user => {

			if( user ) {
				
				try {

					const name = this.state.name 
						? this.state.name
						: user.email;

					const displayName = user.displayName
						? user.displayName
						: name;

					if( !user.displayName ) {

						await user.updateProfile({ displayName: displayName })

					}

					const getUser  = await getUserByDocument( user.uid );
					const userData = getUser
						? getUser
						: {
                            displayName: displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                            perfil: 'aluno'
                          }
					
                    if( !getUser ) {

						await setUser( user.uid, userData );

					}
					
					this.props.StartLoading();
					this.props.SigninSuccess( {uid: user.uid, ...userData} );
					this.props.history.push('/');
                    
                } catch(err) {

					console.log(err); // Handle
					this.props.UnsetLoadingOnly();
					
                }

			} else {

				this.props.UnsetLoadingOnly();

			}
			
		})

	}

	componentWillUnmount() {
        this._removeFirebaseListener();
    }

	SignInWithProvider( Provider ) {

		this.props.SigninLoading();
		
		firebase
			.auth()
			.signInWithPopup( Provider )
			.catch( error => {

				const { code, email } = error;
				this.props.SigninError();

				if( code === 'auth/account-exists-with-different-credential' ) {
					this.setGoogleAlreadyExistsMsg( email );
				}

				console.log( code ); //Handle
			});

	}

	setField( field, value ) {
        this.setState({
            [field]: value,
        })
    }

	SignInWithEmailAndPassword() {

		const { email, password } = this.state;

		this.props.SigninLoading();

		firebase
			.auth()
			.fetchSignInMethodsForEmail( email )
			.then( result => {
			
				if( result[0] && result[0] !== 'password' ) {

					result[0] === 'google.com' 	 && this.setGoogleAlreadyExistsMsg( email );
					result[0] === 'facebook.com' && this.setFacebookAlreadyExistsMsg( email );

				} else {

					firebase
						.auth()
						.signInWithEmailAndPassword( email, password )
						.catch( err => {
							this.props.SigninError();
							console.log( err ); //Handle
						});
				}
			})
			.catch(err => {
				this.props.SigninError();
				console.log(err) // Handle
			})
	}

	SignInWithGoogle() {
		this.SignInWithProvider( GoogleProvider );
	}

	SignInWithFacebook() {
		this.SignInWithProvider( FacebookProvider );
	}

	setGoogleAlreadyExistsMsg( email ) {
		this.props.SigninError();
		this.props.SetMsg({
			title: `O E-mail "${email}" já está cadastrado!`,
			msg: `Já existe uma conta do google cadastrada com o mesmo E-mail! Deseja logar com sua conta Google?`,
			closeText: 'Cancelar',
			actionText: 'Logar com google',
			color: 'secondary',
			actionHandler: () => {
				this.SignInWithGoogle();
				this.props.HideMsg();
			}
		});
	}

	setFacebookAlreadyExistsMsg( email ) {
		this.props.SigninError();
		this.props.SetMsg({
			title: `O E-mail "${email}" já está cadastrado!`,
			msg: `Já existe uma conta do facebook cadastrada com o mesmo E-mail! Deseja logar com sua conta Facebook?`,
			closeText: 'Cancelar',
			actionText: 'Logar com Facebook',
			color: 'secondary',
			actionHandler: () => {
				this.SignInWithFacebook();
				this.props.HideMsg();
			}
		});
	}

	setEmailAlreadyExistsMsg( email ) {
		this.props.SigninError();
		this.props.SetMsg({
			title: `O E-mail "${email}" já está cadastrado!`,
			msg: `Já existe uma conta cadastrada com o mesmo E-mail! Deseja logar com essa conta?`,
			closeText: 'Cancelar',
			actionText: 'Fazer Login',
			color: 'secondary',
			actionHandler: () => {
				this.SignInEmailInputFocus( email );
				this.props.HideMsg();
			}
		});
	}

	render() {
		
		const { load, auth } = this.props;

		return (

			<Grid container style={styles.container} direction="column" align="center" justify="center">

				<Fade in={load.isLoadingFinished} timeout={{enter: 1000}}>
					<div>
						<img src={logo} style={styles.logo} alt="UniRanking"/>

						<Typography style={styles.welcome} color="primary" variant="subtitle1" component="h1" gutterBottom>
							Seja bem vindo ao novo sistema de avaliação da Uniplan-DF!
						</Typography>

						<Typography style={styles.instructions} variant="body2">
							Faça login para ir à tela principal!
						</Typography>
					</div>
				</Fade>

				<Grow in={load.isLoadingFinished}>
					<Card style={styles.form}>

						<Fade in={auth.loading}>
							<LinearProgress color="primary" />
						</Fade>

						<CardContent>
							<Grid container style={{flexGrow: 1}} spacing={3}>
								<Grid item xs={12}>
									<TextField
										ref={this._SignInEmailInput}
										id="email"
										label="Digite seu E-mail..."
										value={this.state.email}
										type="email"
										fullWidth
        								onChange={(event) => this.setField('email', event.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="password"
										label="Digite sua Senha..."
										value={this.state.password}
										type={this.state.passwordVisible ? 'text' : 'password'}
										fullWidth
        								onChange={(event) => this.setField('password', event.target.value)}
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
									<Button disabled={auth.loading} onClick={() => this.SignInWithEmailAndPassword()} variant="contained" fullWidth color="primary" style={{textTransform: 'none'}}>
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
					<Typography variant="body2" style={styles.signUp}>
						Ainda não possui cadastro? 
						<Link style={styles.link} color="primary" onClick={() => this.setState({SignUp: true})}>
							Inscreva-se aqui!
						</Link>
					</Typography>
				</Grow>
				<SignUpDialog 
					show={this.state.SignUp} 
					close={() => this.setState({SignUp: false})} 
					nameValue={this.state.name}
					setName={(value) => this.setState({name: value})}
					firebase={firebase} 
					setGoogleAlreadyExistsMsg={(email) => this.setGoogleAlreadyExistsMsg(email)}
					setFacebookAlreadyExistsMsg={(email) => this.setFacebookAlreadyExistsMsg(email)}
					setEmailAlreadyExistsMsg={(email) => this.setEmailAlreadyExistsMsg(email)}
				/>
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