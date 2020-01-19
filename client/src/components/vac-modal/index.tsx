import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getVacations, addVacation } from '../../redux/actions/vacationsAction';
import useCustomForm from '../../hooks/useCustomHook';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
			width: 600,
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

const VacModal: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [ open, setOpen ] = useState(false);
	const [ modalStyle ] = useState(getModalStyle);
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
	const handleClose = async () => {
		try {
			const result = await dispatch(addVacation(formData));
			// await dispatch(getVacations());
			console.log(result);

			setOpen(false);
		} catch (ex) {
			console.log(ex);
		}
	};
	const handleCloseNoData = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<React.Fragment>
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
							multiline={true}
							name="description"
							label="Description"
							type="text"
							id="description"
							autoComplete="description"
							onChange={setFormData}
							rows={4}
							rowsMax={7}
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
			<Fab onClick={handleOpen} color="primary" aria-label="add">
				<AddIcon />
			</Fab>
		</React.Fragment>
	);
};

export default VacModal;
