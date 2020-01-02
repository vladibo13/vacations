import React, { useState, useEffect } from 'react';
import mainAxios from '../axios/mainAxios';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../redux/actions/authAction';

export const withAuth = (WrappedComponent: any) => {
	return function(props: any) {
		// const [ status, setStatus ] = useState<string>('loading');
		// //redux state
		// const isLoading = useSelector((state: any) => state.auth.isLoading);
		const status = useSelector((state: any) => state.auth.status);
		// //redux dispatch
		const dispatch = useDispatch();
		useEffect(() => {
			const verify = async () => {
				await dispatch(verifyUser());
				// const result = await mainAxios.get('/auth/verify');
				// const { status } = result.data;
				// setStatus(status);
				// console.log(status);
			};
			verify();
		}, []);
		if (status === 'loading') return <div>Loading...</div>;
		if (!status) return <Redirect to="/login" />;
		return <WrappedComponent {...props} />;
		//redux implementations
		// if(status) return <div></div>
	};
};
