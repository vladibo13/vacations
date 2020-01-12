import React, { useState, useEffect } from 'react';
import mainAxios from '../../axios/mainAxios';
import { useDispatch, useSelector } from 'react-redux';
import { getVacations } from '../../redux/actions/vacationsAction';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import momemt from 'moment';
import Moment from 'react-moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

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
			const { data } = await mainAxios.post('/follow/switchChecker', { userID: user.id, vacationID: id });
			console.log(data);
			if (data.length === 1 && !checked) setChecked(true);
		};
		initReq();
	}, []);
	const classes = useStyles();
	const user = useSelector((state: any) => state.auth.user);

	const toggleChecked = () => {
		//if checked delete from followers
		// if not checked add to followers
		console.log(id);
		console.log(user);
		setChecked((prev: boolean) => !prev);
	};
	const { id, destination, from_date, to_date, picture, description, all_followers, cost, isSelected } = props;
	const [ checked, setChecked ] = useState(false);
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
						<FavoriteBorderIcon />
					</IconButton>
					<IconButton aria-label="share">
						{cost}
						<LocalAtmIcon />
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
				From: <Moment format="YYYY/MM/DD HH:mm">{from}</Moment>
			</div>
			<div>
				To: <Moment format="YYYY/MM/DD HH:mm">{to}</Moment>
			</div>
		</React.Fragment>
	);
}

export default VacMainItem;
