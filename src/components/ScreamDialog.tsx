import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
// Material
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { MyButton } from '../util/MyButton';
// dayjs
import dayjs from 'dayjs';
// icon
import { UnfoldMore } from '@material-ui/icons';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import LikeButton from './LikeButton';
import Comments from './Comments';
import { getScream, clearErrors } from '../redux/actions/dataActions';
import ChatIcon from '@material-ui/icons/Chat';
import CommentForm from './CommentForm';

const ScreamDialog = (props: { scream: any, openDialog?: boolean }) => {

    const scream = props.scream;
    // set state open
    const [open, setOpen] = useState(false);
    const { userHandle, screamId } = scream;
    // set state windows url
    const [url, setUrl] = useState({
        oldPath: '',
        newPath: ''
    });
    // get data from store
    const loading = useSelector((store: any) => store.UI.loading);
    const userCredentials = useSelector((store: any) => store.user.credentials);
    // necessary for Reducer
    const dispatch = useDispatch();
    // necessary for URL
    const location = useLocation();
    // handleOpen dialog
    const handleOpen = () => {
        let oldPath = '/#' + location.pathname;
        const newPath = `/#/users/${userHandle}/scream/${screamId}`;

        // si son iguales es porque entro por las notificaciones, se modifica entonces
        if (oldPath === newPath) {
            oldPath = `/#/users/${userHandle}`;
        }
        window.history.pushState(null, '', newPath);
        setUrl({ oldPath, newPath });
        setOpen(true);
        dispatch(getScream(scream.screamId));
    }

    // handleClose dialog
    const handleClose = () => {
        let urlCorrect = url.oldPath;
        if (url.oldPath === '/#/')
            urlCorrect = '/';
        else
            urlCorrect = `/#/users/${userHandle}`;
        window.history.pushState(null, '', urlCorrect);
        setOpen(false);
        dispatch(clearErrors());
    }

    // open dialog depend of props.openDialog
    useEffect(() => {
        if (props.openDialog) {
            handleOpen();
        }
    }, [location])

    // set dialog mark up
    const dialogMarkUp = loading ?
        (
            <CircularProgress size={200} />
        ) : (

            <>
                {/* <div className="container container-margin"> */}
                <div className="row py-1">
                    <div className="col-md-5">
                        <img src={scream.userImage} alt="Profile" className="profile-image" />
                    </div>
                    <div className="col-md-7">
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
                        <div className="row">
                            <div className="col-md-5">
                                <LikeButton screamId={scream.screamId} />
                                Likes: {scream.likeCount}

                            </div>
                            <div className="col-md-7">
                                <MyButton tip="Comments">
                                    <ChatIcon color="secondary" />
                                </MyButton>
                            Comments: {scream.commentCount}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <CommentForm screamId={scream.screamId} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Comments id={scream.screamId} />
                    </div>
                </div>
            </>
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
