import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
// Material
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { MyButton } from '../util/MyButton';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// icon
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CloseIcon from '@material-ui/icons/Close';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { unlikeScream, likeScream } from '../redux/actions/dataActions';
import DeleteScream from './DeleteScream';
import { UnfoldMore } from '@material-ui/icons';
import MuiLink from '@material-ui/core/Link';
import LikeButton from './LikeButton';

const ScreamDialog = ({ scream }: any) => {

    // set state
    const [open, setOpen] = useState(false);
    const loading = useSelector((store: any) => store.UI.loading);
    const userCredentials = useSelector((store: any) => store.user.credentials);
    // handleOpen dialog
    const handleOpen = () => {
        setOpen(true);
    }

    // handleClose dialog
    const handleClose = () => {
        console.log("entra a close");
        setOpen(false);

    }

    // set dialog mark up
    const dialogMarkUp = loading ?
        (
            <CircularProgress size={200} />
        ) : (
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <img src={userCredentials.imageUrl} alt="Profile" className="profile-image" />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userCredentials.handle}`}
                    >
                        @{userCredentials.handle}
                    </Typography>
                    <hr className="invisible-separator" />
                    <Typography variant="body2" color="secondary">
                        {dayjs(userCredentials.createdAt).format('h:mm a, MMM DD YYYY')}
                    </Typography>
                    <hr className="invisible-separator" />
                    <Typography variant="body1" >
                        {scream.body}
                    </Typography>
                    <hr />
                    <LikeButton screamId={scream.screamId} />
                    {/* {likeButton} */}
                                Likes: {scream.likeCount}
                </Grid>
            </Grid>
        );
    return (
        <Fragment>
            <MyButton onClick={handleOpen} tip="Expand scream" >
                <UnfoldMore color="secondary" />
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm">

                <DialogContent className="dialog-content">
                    {dialogMarkUp}
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={(handleClose)}>
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ScreamDialog
