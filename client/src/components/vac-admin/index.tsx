import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVacations } from '../../redux/actions/vacationsAction';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import VacAdminItem from '../vac-admin-item';
import VacModal from '../vac-modal';
import { IVacation } from '../../types/index';
import VacLoader from '../vac-loader';
import VacError from '../vac-error';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		cardGrid: {
			paddingTop: theme.spacing(8),
			paddingBottom: theme.spacing(8)
		},
		heading: {
			marginBottom: '3rem',
			letterSpacing: '5px',
			fontWeight: 300
		}
	})
);

const VacAdmin: React.FC<IVacation> = () => {
	useEffect(() => {
		const initReq = async () => {
			await dispatch(getVacations());
		};
		initReq();
	}, []);
	const dispatch = useDispatch();
	const vacations = useSelector((state: any) => state.vacation.vacations);
	const isLoading = useSelector((state: any) => state.vacation.isLoading);
	const errorMsg = useSelector((state: any) => state.error.msg);
	const errorStatus = useSelector((state: any) => state.error.status);
	const classes = useStyles();

	if (errorMsg) return <VacError errorMsg={errorMsg} errorStatus={errorStatus} />;
	if (isLoading) return <VacLoader />;
	return (
		<div>
			{/* {user.role !== admin && <Redirect to="/login" />} */}

			<Container className={classes.cardGrid} maxWidth="lg">
				<Typography className={classes.heading} variant="h3" component="h3" gutterBottom align="center">
					Welcome Back Admin
				</Typography>
				<VacModal getVacations={getVacations} />
				<h5>Add Vacation</h5>
				<Grid container spacing={4}>
					{vacations.map((vac: IVacation) => (
						<VacAdminItem getVacations={getVacations} key={vac.id} {...vac} />
					))}
				</Grid>
			</Container>
		</div>
	);
};

export default VacAdmin;
