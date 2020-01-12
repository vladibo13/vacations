import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import mainAxios from '../../axios/mainAxios';
import { getChart } from '../../redux/actions/chartAction';
import { useDispatch, useSelector } from 'react-redux';

const VacChart: React.FC = (props: any) => {
	const [ destinations, setDestinations ] = useState([]);
	const [ followers, setFollowers ] = useState([]);
	const vacationsData = useSelector((state: any) => state.chart.vacationsData);
	const followersData = useSelector((state: any) => state.chart.followersData);
	const dispatch = useDispatch();
	useEffect(() => {
		const initReq = async () => {
			// const result = await mainAxios.get('/chart');
			// setDestinations(result.data.destinations);
			// setFollowers(result.data.followers);
			// console.log(result);
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
	if (vacationsData.length === 0 || followersData.length === 0) return <div>Loading...</div>;
	return (
		<div>
			<h1>Vacation Chart Data</h1>
			<div>
				<h2>Chart Based On Vacations and Followers</h2>
				<Bar
					data={data}
					width={100}
					height={300}
					options={{
						maintainAspectRatio: false
					}}
				/>
			</div>
		</div>
	);
};

export default VacChart;
