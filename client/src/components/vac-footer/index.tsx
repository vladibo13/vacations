import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { indigo } from '@material-ui/core/colors';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '2vh'
	},
	footer: {
		padding: theme.spacing(0, 0),
		marginTop: 'auto',
		backgroundColor: indigo[500],
		color: '#fff'
	},
	iconGrid: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	iconColor: {
		color: '#fff'
	}
}));

const VacFooter: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<footer className={classes.footer}>
				<Container maxWidth="sm">
					<div className={classes.iconGrid}>
						<IconButton className={classes.iconColor}>
							<Link href="https://github.com/vladibo13" className={classes.iconColor}>
								<GitHubIcon />
							</Link>
						</IconButton>
						<IconButton className={classes.iconColor}>
							<Link
								href="https://www.linkedin.com/in/vladimir-bozhkov-171a2a170/"
								className={classes.iconColor}
							>
								<LinkedInIcon />
							</Link>
						</IconButton>
						<IconButton className={classes.iconColor}>
							<Link href="https://vladibo13.github.io/portfolio/" className={classes.iconColor}>
								<LanguageIcon />
							</Link>
						</IconButton>
					</div>
				</Container>
			</footer>
		</div>
	);
};

export default VacFooter;
