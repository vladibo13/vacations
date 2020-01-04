import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import mainAxios from '../../axios/mainAxios';

const VacChart: React.FC = (props: any) => {
	const [ destinations, setDestinations ] = useState([]);
	const [ followers, setFollowers ] = useState([]);
	useEffect(() => {
		const initReq = async () => {
			const result = await mainAxios.get('/chart');
			setDestinations(result.data.destinations);
			setFollowers(result.data.followers);
			console.log(result);
		};
		initReq();
	}, []);
	const data = {
		labels: destinations,
		datasets: [
			{
				label: 'Destinations',
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: followers
			}
		]
	};
	if (destinations.length === 0 || followers.length === 0) return <div>Loading...</div>;
	return (
		<div>
			<h1>Hello From Vacation Chart</h1>
			<div>
				<h2>Bar Example (custom size)</h2>
				<Bar
					data={data}
					width={100}
					height={400}
					options={{
						maintainAspectRatio: false
					}}
				/>
			</div>
		</div>
	);
};

export default VacChart;
