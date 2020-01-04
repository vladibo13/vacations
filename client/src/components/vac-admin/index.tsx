import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVacations } from '../../redux/actions/vacationsAction';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import useCustomForm from '../../hooks/useCustomHook';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import mainAxios from '../../axios/mainAxios';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Modal from '@material-ui/core/Modal';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			position: 'absolute',
			width: 400,
			backgroundColor: theme.palette.background.paper,
			border: '1px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3)
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(1)
		},
		submit: {
			margin: theme.spacing(3, 0, 2)
		}
	})
);

const VacAdmin: React.FC = (props: any) => {
	// const { id, destination, from_date, to_date, picture, description, all_followers, cost } = props;
	const dispatch = useDispatch();
	const vacations = useSelector((state: any) => state.vacation.vacations);
	useEffect(() => {
		const initReq = async () => {
			await dispatch(getVacations());
		};
		initReq();
	}, []);
	const classes = useStyles();
	const [ modalStyle ] = React.useState(getModalStyle);
	const [ open, setOpen ] = React.useState(false);
	const initialState = {
		destination: '',
		from_date: '',
		to_date: '',
		picture: '',
		description: '',
		all_followers: 0,
		cost: 0
	};
	const [ formData, setFormData ] = useCustomForm(initialState);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = async () => {
		const result = await mainAxios.post('/vacations', { ...formData });
		console.log(formData);
		console.log(result);
		setOpen(false);
	};
	const handleCloseNoData = () => {
		setOpen(false);
	};

	const handleDelete = async (id: any) => {
		const result = mainAxios.delete('/vacations', { data: { id } });
		window.location.reload();
	};
	const handleLogIn = async () => {};

	if (vacations.length === 0) return <p>Loading...</p>;
	return (
		<div>
			<div>
				<button type="button" onClick={handleOpen}>
					Add Vacation
				</button>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={open}
					onClose={handleCloseNoData}
				>
					<div style={modalStyle} className={classes.paper}>
						<h1>Add Vacation</h1>
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="description"
								label="Description"
								type="text"
								id="description"
								autoComplete="description"
								onChange={setFormData}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="destination"
								label="Destination"
								name="destination"
								autoComplete="destination"
								autoFocus
								onChange={setFormData}
								type="text"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="picture"
								label="Picture URL"
								type="text"
								id="picture"
								autoComplete="picture"
								onChange={setFormData}
							/>

							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="from_date"
								label="From Date"
								type="text"
								id="from_date"
								autoComplete="from_date"
								onChange={setFormData}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="to_date"
								label="To Date"
								type="text"
								id="to_date"
								autoComplete="to_date"
								onChange={setFormData}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="cost"
								label="Cost"
								type="text"
								id="cost"
								autoComplete="cost"
								onChange={setFormData}
							/>

							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="all_followers"
								label="All Followers"
								type="text"
								id="all_followers"
								autoComplete="all_followers"
								onChange={setFormData}
							/>

							<Button
								onClick={handleClose}
								type="button"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Add Vacation
							</Button>
						</form>
					</div>
				</Modal>
			</div>
			<h1>Hello From Vacation Admin</h1>
			{/* <h2>{JSON.stringify(vacations)}</h2> */}
			{vacations.map((vac: any) => {
				return (
					<Paper elevation={3}>
						<Button onClick={() => handleDelete(vac.id)}>
							<HighlightOffIcon />
						</Button>
						<h3>{vac.description}</h3>
					</Paper>
				);
			})}
		</div>
	);
};
export default VacAdmin;
