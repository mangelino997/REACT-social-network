import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, logoutUser } from '../redux/actions/userActions';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// Material
import { Avatar, CircularProgress, createStyles, makeStyles, Paper, Theme, withStyles } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
// Days JS
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import { MyButton } from '../util/MyButton';

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }),
)(Badge);
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        large: {
            width: theme.spacing(24),
            height: theme.spacing(24),
        },
    }),
);
const Profile = () => {

    const classes = useStyles();
    // useSelector es un Hook que nos permite extraer datos del store de Redux 
    const loadingUser = useSelector((store: any) => store.user.loading);
    const authenticated = useSelector((store: any) => store.user.authenticated);
    const userCredentials = useSelector((store: any) => store.user.credentials);
    // necessary for the Reducer
    const dispatch = useDispatch();

    // handle image change
    const handleImageChange = (event: any) => {
        const image = event.target.files[0]; // la posicion 0 tiene el primer archivo cargado
        const formData: any = new FormData();
        formData.append('image', image, image.name); // el append nos pide 3 argumentos
        dispatch(uploadImage(formData));
    }

    // handle edit picture
    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput?.click();
    }

    // handle logout user
    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        !loadingUser ?
            authenticated ?
                <Fragment>
                    <Paper className="classes.paper">
                        <div className="card-profile">
                            <div className="wrapper-image">
                                <StyledBadge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar src={userCredentials.imageUrl}
                                        alt="profile" className={classes.large} />
                                </StyledBadge>

                                <input type="file" id="imageInput" hidden={true}
                                    onChange={handleImageChange} />
                                <MyButton onClick={handleEditPicture} tip="Edit profile picture">
                                    <EditIcon color="primary" />
                                </MyButton>
                            </div>
                            <div className="profile-details">
                                <MuiLink
                                    component={Link} to={`/users/${userCredentials.handle}`}
                                    variant="h5">
                                    @{userCredentials.handle}
                                </MuiLink>
                                <hr />
                                {userCredentials.bio &&
                                    <Typography>
                                        {userCredentials.bio}
                                    </Typography>}
                                <hr />
                                {userCredentials.location &&
                                    <Fragment>
                                        <LocationOn />
                                        <span> {userCredentials.location}</span>
                                    </Fragment>}
                                <hr />
                                {userCredentials.website &&
                                    <Fragment>
                                        <LinkIcon color="primary" />
                                        <a
                                            href={userCredentials.website}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {' '}{userCredentials.website}
                                        </a>
                                    </Fragment>

                                }
                                <hr />
                                <CalendarToday />
                                {' '}<span>Joined {dayjs(userCredentials.createdAt).format('MMM YYYY')}</span>
                                <hr />
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <MyButton onClick={handleLogout} tip="Logout">
                                        <KeyboardReturn color="primary" />
                                    </MyButton>
                                    <EditDetails />
                                </div>
                            </div>
                        </div>
                    </Paper>
                </Fragment>
                : <Fragment>
                    <Paper className="py-4">
                        <Typography variant="body2" align="center">
                            No profile found, please login again
                        </Typography>
                        <div className="no-profile-found py-1">
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                component={Link}
                                className="button-no-profile"
                                to="/login"
                            >Login</Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                component={Link}
                                className="button-no-profile"
                                to="/signup"
                            > Signup</Button>
                        </div>
                    </Paper>
                </Fragment>
            : <Fragment>
                <CircularProgress />
            </Fragment>
    )
}

export default Profile;
