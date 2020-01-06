import React, { useEffect, useState } from 'react';

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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Modal from '@material-ui/core/Modal';
import VacAdminItem from '../vac-admin-item';
//modal position
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
		},
		icon: {
			marginRight: theme.spacing(2)
		},
		heroContent: {
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(8, 0, 6)
		},
		heroButtons: {
			marginTop: theme.spacing(4)
		},
		cardGrid: {
			paddingTop: theme.spacing(8),
			paddingBottom: theme.spacing(8)
		},
		card: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		},
		cardMedia: {
			paddingTop: '56.25%' // 16:9
		},
		cardContent: {
			flexGrow: 1
		},
		footer: {
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(6)
		}
	})
);

interface IProps {
	id: number;
	destination: string;
	from_date: string;
	to_date: string;
	picture: string;
	description: string;
	all_followers: number;
	cost: number;
}

const VacAdmin: React.FC<IProps> = () => {
	useEffect(() => {
		const initReq = async () => {
			await dispatch(getVacations());
			console.log(vacations);
		};
		initReq();
	}, []);

	//redux hooks
	const dispatch = useDispatch();
	const vacations = useSelector((state: any) => state.vacation.vacations);
	//styling hooks
	const classes = useStyles();
	//modal styling
	const [ modalStyle ] = useState(getModalStyle);

	const [ open, setOpen ] = useState(false);
	const [ openEdit, setOpenEdit ] = useState(false);
	const [ editing, setEditing ] = useState<IProps>({
		id: 0,
		destination: '',
		from_date: '',
		to_date: '',
		picture: '',
		description: '',
		all_followers: 0,
		cost: 0
	});
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
	const handleOpenEdit = (vac: IProps) => {
		setEditing(vac);
		setOpenEdit(true);
		console.log(vac);
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

	const handleEditCloseNoData = () => {
		setOpenEdit(false);
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
				<Fab onClick={handleOpen} color="primary" aria-label="add">
					<AddIcon />
				</Fab>
				{/* add vacation modal */}
				<Modal
					aria-labelledby="add-vacation-modal-title"
					aria-describedby="add-vacation-modal-description"
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
				{/* edit vacation modal */}
				<Modal
					aria-labelledby="edit-modal-title"
					aria-describedby="edit-modal-description"
					open={openEdit}
					onClose={handleEditCloseNoData}
				>
					<div style={modalStyle} className={classes.paper}>
						<h1>Edit Vacation</h1>
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
								value={editing.description}
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
								value={editing.destination}
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
								value={editing.picture}
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
								value={editing.from_date}
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
								value={editing.to_date}
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
								value={editing.cost}
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
								value={editing.all_followers}
							/>

							<Button
								onClick={handleClose}
								type="button"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Edit Vacation
							</Button>
						</form>
					</div>
				</Modal>
			</div>
			<h1>Hello From Vacation Admin</h1>
			<VacAdminItem />
			{/* <h2>{JSON.stringify(vacations)}</h2> */}
			<Container className={classes.cardGrid} maxWidth="lg">
				<Fab onClick={handleOpen} color="primary" aria-label="add">
					<AddIcon />
				</Fab>
				{/* <button onClick={handleOpenEdit}>Edit Vacation</button> */}
				<h5>Add Vacation</h5>
				{/* End hero unit */}
				<Grid container spacing={4}>
					{vacations.map((vac: IProps) => (
						<Grid item key={vac.id} xs={12} sm={6} md={4}>
							<Card className={classes.card}>
								<CardMedia className={classes.cardMedia} image={vac.picture} title="Image title" />
								<CardContent className={classes.cardContent}>
									<Typography gutterBottom variant="h5" component="h2">
										{vac.destination}
									</Typography>
									<Typography>{vac.description}</Typography>
								</CardContent>
								<CardActions>
									<Button
										onClick={() => handleDelete(vac.id)}
										type="button"
										size="large"
										color="primary"
									>
										<DeleteIcon />
									</Button>
									<Button onClick={() => handleOpenEdit(vac)} size="small" color="primary">
										<EditIcon />
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
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
