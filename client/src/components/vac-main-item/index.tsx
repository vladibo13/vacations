import React, { useState, useEffect } from 'react';
import mainAxios from '../../axios/mainAxios';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Moment from 'react-moment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { IVacation } from '../../types/index';
import { followVacService, deleteVacService } from '../../redux/service';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			maxWidth: 500
		},
		media: {
			height: 0,
			paddingTop: '56.25%' // 16:9
		},
		cardGrid: {
			paddingTop: theme.spacing(8),
			paddingBottom: theme.spacing(8)
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest
			})
		},
		expandOpen: {
			transform: 'rotate(180deg)'
		},
		avatar: {
			backgroundColor: red[500]
		}
	})
);
// user
const VacMainItem: React.FC = (props: any) => {
	useEffect(() => {
		const initReq = async () => {
			if (isSelected) setChecked(true);
		};
		initReq();
	}, []);

	const classes = useStyles();
	const {
		getVacations,
		id,
		destination,
		from_date,
		to_date,
		picture,
		description,
		all_followers,
		cost,
		isSelected
	} = props;
	const [ checked, setChecked ] = useState<boolean>(false);
	const user = useSelector((state: any) => state.auth.user);
	const dispatch = useDispatch();

	const toggleChecked = async () => {
		if (!checked) {
			await followVacService(user.id, id);
			await dispatch(getVacations(user.id));
		} else {
			await deleteVacService(user.id, id);
			await dispatch(getVacations(user.id));
		}
		setChecked((prev: boolean) => !prev);
	};

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							V
						</Avatar>
					}
					action={
						<Switch
							checked={checked}
							onChange={toggleChecked}
							color="primary"
							inputProps={{ 'aria-label': 'primary checkbox' }}
						/>
					}
					title={destination}
					subheader={formatDate(from_date, to_date)}
				/>
				<CardMedia className={classes.media} image={picture} title="Paella dish" />
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{description}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						{all_followers}
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						{cost}
						<MonetizationOnIcon />
					</IconButton>
				</CardActions>
			</Card>
		</Grid>
	);
};

function formatDate(from: string, to: string) {
	return (
		<React.Fragment>
			<div>
				From: <Moment format="YYYY-MM-DD HH:mm">{from}</Moment>
			</div>
			<div>
				To: <Moment format="YYYY-MM-DD HH:mm">{to}</Moment>
			</div>
		</React.Fragment>
	);
}

export default VacMainItem;
