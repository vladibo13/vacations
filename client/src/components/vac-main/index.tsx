import React, { useEffect } from 'react';
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
import VacMainItem from '../vac-main-item';

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

const VacMain: React.FC = (props: any) => {
	useEffect(() => {
		const initReq = async () => {
			await dispatch(getVacations());
		};
		initReq();
	}, []);

	const classes = useStyles();
	const vacations = useSelector((state: any) => state.vacation.vacations);
	const status = useSelector((state: any) => state.auth.status);
	const dispatch = useDispatch();
	const [ state, setState ] = React.useState({
		checkedA: true,
		checkedB: true
	});
	const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [name]: event.target.checked });
	};

	console.log(vacations);
	if (vacations.length === 0) return <p>Loading...</p>;
	return (
		<Container className={classes.cardGrid} maxWidth="lg">
			<VacMainItem />
			<Switch
				checked={state.checkedA}
				onChange={handleChange('checkedA')}
				value="checkedA"
				inputProps={{ 'aria-label': 'secondary checkbox' }}
			/>
			<Switch
				checked={state.checkedB}
				onChange={handleChange('checkedB')}
				value="checkedB"
				color="primary"
				inputProps={{ 'aria-label': 'primary checkbox' }}
			/>
			<Grid container spacing={4}>
				{vacations.map((vac: any) => {
					return (
						<Grid item key={vac.id} xs={12} sm={6} md={4}>
							<Card className={classes.card}>
								<CardHeader
									avatar={
										<Avatar aria-label="recipe" className={classes.avatar}>
											R
										</Avatar>
									}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title={vac.destination}
									subheader={`${vac.from_date} - ${vac.to_date}`}
								/>
								<CardMedia className={classes.media} image={vac.picture} title="Paella dish" />
								<CardContent>
									<Typography variant="body2" color="textSecondary" component="p">
										{vac.description}
									</Typography>
								</CardContent>
								<CardActions disableSpacing>
									<IconButton aria-label="add to favorites">
										<FavoriteIcon />
										{vac.all_followers}
									</IconButton>
									<IconButton aria-label="share">
										<ShareIcon />
										{vac.cost}$
									</IconButton>
								</CardActions>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};

export default VacMain;
