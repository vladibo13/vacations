import React, { useState, useEffect } from 'react';
import mainAxios from '../axios/mainAxios';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../redux/actions/authAction';

export const withAuth = (WrappedComponent: any) => {
	return function(props: any) {
		const [ isLoading, setIsLoadingStatus ] = useState<boolean>(true);
		// //redux state
		// const isLoading = useSelector((state: any) => state.auth.isLoading);
		const status = useSelector((state: any) => state.auth.status);
		// //redux dispatch
		const dispatch = useDispatch();
		useEffect(() => {
			const verify = async () => {
				try {
					await dispatch(verifyUser());
					// const result = await mainAxios.get('/auth/verify');
					// const { status } = result.data;
					// setStatus(status);
					setIsLoadingStatus(false);
					console.log(status);
				} catch (ex) {
					setIsLoadingStatus(true);
				}
			};
			verify();
		}, []);
		if (isLoading) return <div>Loading...</div>;
		if (!status) return <Redirect to="/login" />;
		return <WrappedComponent {...props} />;
		//redux implementations
		// if(status) return <div></div>
	};
};
