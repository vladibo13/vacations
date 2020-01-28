import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: '85vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},
		loader: {
			marginTop: theme.spacing(40)
		}
	})
);

const VacLoader: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress className={classes.loader} size="8rem" />
		</div>
	);
};

export default VacLoader;
