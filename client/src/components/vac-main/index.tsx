import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVacationsFiltred } from '../../redux/actions/vacationsAction';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import VacMainItem from '../vac-main-item';
import { IVacation } from '../../types/index';
import VacLoader from '../vac-loader';
import Typography from '@material-ui/core/Typography';
import VacError from '../vac-error';
import ReplayIcon from '@material-ui/icons/Replay';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			minHeight: '82vh'
		},
		card: {
			maxWidth: 500
		},
		media: {
			height: 0,
			paddingTop: '56.25%' // 16:9
		},
		cardGrid: {
			paddingTop: theme.spacing(8),
			paddingBottom: theme.spacing(8)
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest
			})
		},
		expandOpen: {
			transform: 'rotate(180deg)'
		},
		avatar: {
			backgroundColor: red[500]
		},
		heading: {
			marginBottom: '3rem',
			letterSpacing: '5px',
			fontWeight: 300
		}
	})
);

const VacMain: React.FC = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const vacations = useSelector((state: any) => state.vacation.vacations);
	const isLoading = useSelector((state: any) => state.vacation.isLoading);
	const user = useSelector((state: any) => state.auth.user);
	const errorMsg = useSelector((state: any) => state.error.msg);
	const errorStatus = useSelector((state: any) => state.error.status);

	useEffect(() => {
		const initReq = async () => {
			dispatch(getVacationsFiltred(user.id));
		};
		initReq();
	}, []);

	const updateVacations = async () => {
		dispatch(getVacationsFiltred(user.id));
	};

	if (errorMsg) return <VacError errorMsg={errorMsg} errorStatus={errorStatus} />;
	if (isLoading) return <VacLoader />;
	return (
		<Container className={classes.cardGrid} maxWidth="lg">
			<Fab onClick={updateVacations}>
				<ReplayIcon />
			</Fab>

			<Typography className={classes.heading} variant="h4" component="h4" gutterBottom align="center">
				Welcome To Vacation User: {user.firstname} {user.lastname}
			</Typography>
			<Grid container spacing={4}>
				{vacations.sort((x: any, y: any): number => y.isSelected - x.isSelected).map((vac: IVacation) => {
					return <VacMainItem getVacations={getVacationsFiltred} key={vac.id} {...vac} />;
				})}
			</Grid>
		</Container>
	);
};

export default VacMain;
