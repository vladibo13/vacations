import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVacations, addVacation } from '../../redux/actions/vacationsAction';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import VacAdminItem from '../vac-admin-item';
import VacModal from '../vac-modal';
import { IVacation } from '../../types/index';
import VacLoader from '../vac-loader';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		cardGrid: {
			paddingTop: theme.spacing(8),
			paddingBottom: theme.spacing(8)
		}
	})
);

const VacAdmin: React.FC<IVacation> = () => {
	useEffect(() => {
		const initReq = async () => {
			try {
				await dispatch(getVacations());
			} catch (ex) {
				console.log(ex);
			}
		};
		initReq();
	}, []);
	const dispatch = useDispatch();
	const vacations = useSelector((state: any) => state.vacation.vacations);
	const isLoading = useSelector((state: any) => state.vacation.isLoading);
	const classes = useStyles();

	if (isLoading) return <VacLoader />;
	return (
		<div>
			{/* {user.role !== admin && <Redirect to="/login" />} */}

			<Container className={classes.cardGrid} maxWidth="lg">
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
