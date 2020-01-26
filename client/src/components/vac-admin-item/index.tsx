import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomHook';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import mainAxios from '../../axios/mainAxios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IVacation } from '../../types';
import Moment from 'react-moment';
import Modal from '@material-ui/core/Modal';
import VacModalAdmin from '../vac-modal-admin';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVacation } from '../../redux/actions/vacationsAction';
import moment from 'moment';

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
function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const VacAdminItem: React.FC<IVacation> = (props: IVacation) => {
	const { getVacations, destination, description, picture, cost, all_followers, id, from_date, to_date } = props;
	//init state for editing
	const initialState = {
		destination,
		from_date: moment(from_date).format('YYYY-MM-DD hh:mm:ss'),
		to_date: moment(to_date).format('YYYY-MM-DD hh:mm:ss'),
		picture,
		description,
		all_followers,
		cost,
		id
	};
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.auth.user);
	//modal
	const [ modalStyle ] = useState(getModalStyle);
	const [ openEdit, setOpenEdit ] = useState(false);
	const [ formData, setFormData ] = useCustomForm(initialState);

	//modal functions
	const handleClose = async () => {
		try {
			const data = await mainAxios.put('/vacations', { ...formData });
			await dispatch(getVacations());
		} catch (ex) {
			console.log(ex);
		}
		setOpenEdit(false);
	};

	const handleOpenEdit = (vac: IVacation) => {
		setOpenEdit(true);
	};
	const handleDelete = async (vacationID: number, userID: number) => {
		// const result = await mainAxios.delete('/vacations', { data: { id } });
		await dispatch(deleteVacation(vacationID, userID));
		await dispatch(getVacations());
		// dispatch(getVacations());
	};
	const handleEditCloseNoData = () => {
		setOpenEdit(false);
	};

	return (
		<React.Fragment>
			{/* <VacModalAdmin /> */}
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
							value={formData.description}
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
							value={formData.destination}
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
							value={formData.picture}
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
							value={formData.from_date}
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
							value={formData.to_date}
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
							value={formData.cost}
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
			<Grid item key={id} xs={12} sm={6} md={4}>
				<Card className={classes.card}>
					<CardMedia className={classes.cardMedia} image={picture} title="Image title" />
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom variant="h5" component="h2">
							{destination}
						</Typography>
						<Typography>{description}</Typography>
					</CardContent>
					<CardActions>
						<Button onClick={() => handleDelete(id, user.id)} type="button" size="large" color="primary">
							<DeleteIcon />
						</Button>
						<Button onClick={() => handleOpenEdit(props)} size="small" color="primary">
							<EditIcon />
						</Button>
					</CardActions>
				</Card>
			</Grid>
		</React.Fragment>
	);
};

export default VacAdminItem;
