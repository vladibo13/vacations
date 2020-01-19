import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { prependOnceListener } from 'cluster';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../types';
import { logoutUser } from '../../redux/actions/authAction';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		title: {
			flexGrow: 1
		},
		link: {
			color: 'white',
			textDecoration: 'none'
		}
	})
);

const VacNavbar: React.FC = () => {
	const classes = useStyles();
	const user = useSelector((state: any) => state.auth.user);
	const dispatch = useDispatch();
	const redirectToRegister = () => {
		localStorage.removeItem('token');
		dispatch(logoutUser());
	};
	const loginOrProfile = (user: IUser) => {
		if (!user)
			return (
				<React.Fragment>
					<Button color="inherit">
						<Link className={classes.link} to="/register">
							Register
						</Link>
					</Button>
					<Button color="inherit">
						<Link className={classes.link} to="/login">
							Login
						</Link>
					</Button>
				</React.Fragment>
			);
		if (user.role === 'member')
			return (
				<React.Fragment>
					<Button color="inherit">
						<Link className={classes.link} to="/main">
							Main
						</Link>
					</Button>
					<Button onClick={redirectToRegister} color="inherit">
						<Link className={classes.link} to="/register">
							Log Out
						</Link>
					</Button>
				</React.Fragment>
			);
		if (user.role === 'admin')
			return (
				<React.Fragment>
					<Button color="inherit">
						<Link className={classes.link} to="/admin">
							Admin
						</Link>
					</Button>
					<Button color="inherit">
						<Link className={classes.link} to="/chart">
							Chart
						</Link>
					</Button>
					<Button onClick={redirectToRegister} color="inherit">
						<Link className={classes.link} to="/register">
							Log Out
						</Link>
					</Button>
				</React.Fragment>
			);
	};
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Vacations App
					</Typography>
					{loginOrProfile(user)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default VacNavbar;
