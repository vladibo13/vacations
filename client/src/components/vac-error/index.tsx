import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
	root: {
		height: '82vh'
	},
	heading: {
		textAlign: 'center'
	}
}));

const VacError: React.FC<any> = (props: any) => {
	const classes = useStyles();
	const { errorMsg, errorStatus } = props;
	return (
		<Container className={classes.root} component="main" maxWidth="xs">
			<div>
				<h1 className={classes.heading}>
					{errorMsg} - {errorStatus}
				</h1>
			</div>
		</Container>
	);
};

export default VacError;
