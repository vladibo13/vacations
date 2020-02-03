import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authAction';
import useCustomForm from '../../hooks/useCustomHook';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '80vh'
	},
	paper: {
		marginTop: theme.spacing(8),
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
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

const VacRegister: React.FC = (props: any) => {
	const errorMsg = useSelector((state: any) => state.error.msg);
	const errorStatus = useSelector((state: any) => state.error.status);
	const initialState = { firstname: '', lastname: '', email: '', password: '' };
	const [ formData, setFormData ] = useCustomForm(initialState);

	const dispatch = useDispatch();
	const classes = useStyles();

	const handleRegister = async () => {
		await dispatch(registerUser(formData, props.history));
	};
	return (
		<Container className={classes.root} component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={setFormData}
								autoComplete="fname"
								name="firstname"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={setFormData}
								variant="outlined"
								required
								fullWidth
								id="lastname"
								label="Last Name"
								name="lastname"
								autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={setFormData}
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={setFormData}
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</Grid>
					</Grid>
					<Typography color="error">
						{errorMsg} - {errorStatus}
					</Typography>
					<Button
						onClick={handleRegister}
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Log in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default VacRegister;
