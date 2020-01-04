import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const VacHome: React.FC = (props: any) => {
	const user = useSelector((state: any) => state.auth.user);
	return (
		<div>
			{isAuthClient()}
			<h1>Hello From Vacation Home</h1>

			<h2>Welcome Back {`${user.firstname} - ${user.lastname}`}</h2>
		</div>
	);
};
function isAuthClient() {
	if (!localStorage.getItem('token')) return <Redirect to="/login" />;
}
export default VacHome;
