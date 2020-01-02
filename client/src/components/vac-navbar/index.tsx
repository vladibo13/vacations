import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { prependOnceListener } from 'cluster';

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
		}
	})
);

const VacNavbar: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Vacations App
					</Typography>
					<Button color="inherit">
						<Link style={{ color: 'white' }} to="/register">
							Register
						</Link>
					</Button>
					<Button color="inherit">
						<Link style={{ color: 'white' }} to="/login">
							Login
						</Link>
					</Button>
					<Button color="inherit">
						<Link style={{ color: 'white' }} to="/">
							Home
						</Link>
					</Button>
					<Button color="inherit">
						<Link style={{ color: 'white' }} to="/admin">
							Admin
						</Link>
					</Button>
					<Button onClick={redirectToRegister} color="inherit">
						Log Out
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

function redirectToRegister() {
	localStorage.removeItem('token');
	return <Link to="/register" />;
}

export default VacNavbar;
