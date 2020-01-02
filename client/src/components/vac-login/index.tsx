import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authAction';
import useCustomForm from '../../hooks/useCustomHook';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '85vh'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

const VacLogin: React.FC = (props: any) => {
	const initialState = { email: '', password: '' };
	//hooks
	const classes = useStyles();
	const [ formData, setFormData ] = useCustomForm(initialState);
	//redux state
	const msg = useSelector((state: any) => state.auth.msg);
	// const token = useSelector((state: any) => state.auth.token);
	const token = localStorage.getItem('token');
	//redux dispatch
	const dispatch = useDispatch();
	const handleLogIn = async () => {
		try {
			await dispatch(loginUser(formData));
			console.log(msg);
			// if (msg === 'redirect') {
			// 	props.history.push('/');
			// 	return;
			// }
		} catch (ex) {
			console.log(ex);
		}
		// if (localStorage.getItem('token')) {
		// 	return <Redirect to="/" />;
		// }
		// console.log(result);

		// console.log(token);
		// console.log(msg);
		// if (token && msg === 'redirect') {
		// 	props.history.push('/');
		// 	return;
		// }
	};
	// console.log(token);

	return (
		<Grid container component="main" className={classes.root}>
			{msg === 'redirect' && token && <Redirect to="/" />}
			{/* {isAuthClient()} */}
			<Grid item xs={false} sm={false} md={7} className={classes.image} />
			<Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={setFormData}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={setFormData}
						/>
						<Typography color="error">{msg}</Typography>
						<Button
							onClick={handleLogIn}
							type="button"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default VacLogin;
