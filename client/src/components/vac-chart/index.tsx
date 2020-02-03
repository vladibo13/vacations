import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getChart } from '../../redux/actions/chartAction';
import { useDispatch, useSelector } from 'react-redux';
import VacLoader from '../vac-loader';
import VacError from '../vac-error';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '5rem 0'
	}
}));

const VacChart: React.FC = (props: any) => {
	useEffect(() => {
		const initReq = async () => {
			await dispatch(getChart());
		};
		initReq();
	}, []);

	const vacationsData = useSelector((state: any) => state.chart.vacationsData);
	const followersData = useSelector((state: any) => state.chart.followersData);
	const errorMsg = useSelector((state: any) => state.error.msg);
	const errorStatus = useSelector((state: any) => state.error.status);
	const dispatch = useDispatch();

	const data = {
		labels: vacationsData,
		datasets: [
			{
				label: 'Destinations',
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: followersData
			}
		]
	};
	const classes = useStyles();
	if (errorMsg) return <VacError errorMsg={errorMsg} errorStatus={errorStatus} />;
	if (!vacationsData || !followersData) return <VacLoader />;
	return (
		<div className={classes.root}>
			<Typography variant="h3" component="h3" gutterBottom align="center">
				Chart Page
			</Typography>
			<Typography variant="h6" component="h6" gutterBottom align="center">
				Data Based On Vacations and Followers
			</Typography>
			<Bar
				data={data}
				width={100}
				height={230}
				options={{
					maintainAspectRatio: false
				}}
			/>
		</div>
	);
};

export default VacChart;
