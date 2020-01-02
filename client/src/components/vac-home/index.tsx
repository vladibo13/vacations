import React from 'react';
import { Redirect } from 'react-router-dom';

const VacHome: React.FC = (props: any) => {
	return (
		<div>
			{isAuthClient()}
			<h1>Hello From Vacation Home</h1>
		</div>
	);
};
function isAuthClient() {
	if (!localStorage.getItem('token')) return <Redirect to="/login" />;
}
export default VacHome;
