import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import mainAxios from '../../axios/mainAxios';
import { getChart } from '../../redux/actions/chartAction';
import { useDispatch, useSelector } from 'react-redux';
import VacLoader from '../vac-loader';
import VacError from '../vac-error';

const VacChart: React.FC = (props: any) => {
	const [ destinations, setDestinations ] = useState([]);
	const [ followers, setFollowers ] = useState([]);
	const vacationsData = useSelector((state: any) => state.chart.vacationsData);
	const followersData = useSelector((state: any) => state.chart.followersData);
	const errorMsg = useSelector((state: any) => state.error.msg);
	const errorStatus = useSelector((state: any) => state.error.status);
	const dispatch = useDispatch();
	useEffect(() => {
		const initReq = async () => {
			await dispatch(getChart());
		};
		initReq();
	}, []);

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
	if (errorMsg) return <VacError errorMsg={errorMsg} errorStatus={errorStatus} />;
	if (!vacationsData || !followersData) return <VacLoader />;
	return (
		<div>
			<h1>Vacation Chart Data</h1>
			<div>
				<h2>Chart Based On Vacations and Followers</h2>
				<Bar
					data={data}
					width={100}
					height={530}
					options={{
						maintainAspectRatio: false
					}}
				/>
			</div>
		</div>
	);
};

export default VacChart;
