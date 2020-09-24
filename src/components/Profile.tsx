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
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
// Days JS
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import { MyButton } from '../util/MyButton';

const Profile = () => {

    // useSelector es un Hook que nos permite extraer datos del store de Redux 
    const loadingUser = useSelector((store: any) => store.user.loading);
    const authenticated = useSelector((store: any) => store.user.authenticated);
    const userCredentials = useSelector((store: any) => store.user.credentials);
    // necesarios para los Reducer
    const dispatch = useDispatch();

    // handle image change
    const handleImageChange = (event: any) => {

        const image = event.target.files[0];
        console.log(image);
        const formData: any = new FormData();
        formData.append('image', image, image.name); // el append nos pide 3 argumentos

        dispatch(uploadImage(formData));
    }

    // handle edit picture
    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        console.log("esxd");
        fileInput?.click();
    }

    // handle logout user
    const handleLogout = () => {
        dispatch(logoutUser());
    }

    // 
    // useEffect(()=>{

    // }, [userCredentials])
    return (
        !loadingUser ?
            authenticated ?
                <Fragment>
                    <Paper className="classes.paper">
                        <div className="classes.profile">
                            <div className="wrapper-image">
                                <img src={userCredentials.imageUrl} alt="profile"
                                    className="profile-image" />
                                <input type="file" id="imageInput" hidden={true}
                                    onChange={handleImageChange} />
                                <MyButton onClick={handleEditPicture} tip="Edit profile picture">
                                    <EditIcon color="primary" />
                                </MyButton>
                            </div>
                            <hr />
                            <div className="profile-details">
                                <MuiLink
                                    component={Link} to={`/users/${userCredentials.handle}`}
                                    variant="h5">
                                    @{userCredentials.handle}
                                </MuiLink>
                                <br />
                                {userCredentials.bio &&
                                    <Typography>
                                        {userCredentials.bio}
                                    </Typography>}

                                {userCredentials.location &&
                                    <Fragment>
                                        <LocationOn />
                                        <span> {userCredentials.location}</span>
                                        <br />
                                    </Fragment>}
                                {userCredentials.website &&
                                    <Fragment>
                                        <LinkIcon />
                                        <a href={userCredentials.website} target="_blank" rel="Website user logged">
                                            {' '}{userCredentials.website}
                                        </a>
                                    </Fragment>
                                }<br />
                                <CalendarToday />
                                {' '}<span>Joined {dayjs(userCredentials.createdAt).format('MMM YYYY')}</span>
                                <br />
                                <MyButton onClick={handleLogout} tip="Logout">
                                    <KeyboardReturn color="primary" />
                                </MyButton>
                                <EditDetails />
                            </div>
                        </div>
                    </Paper>
                </Fragment>
                : <Fragment>
                    <Paper className="classes.paper">
                        <Typography variant="body2" align="center">
                            No profile found, please login again
                        </Typography>
                        <div className="classes.buttons">
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/login"
                            >Login</Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                component={Link}
                                to="/signup"
                            > Signup</Button>
                        </div>
                    </Paper>
                </Fragment>
            : <Fragment>
                <p>loading..</p>
            </Fragment>
    )
}

export default Profile;
