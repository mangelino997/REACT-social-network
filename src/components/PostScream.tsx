import React, { Fragment, useEffect, useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
// Material
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from 'react-hook-form';
import { MyButton } from '../util/MyButton';
import { postScream } from '../redux/actions/dataActions';

type Inputs = {
    body: string
};

const PostScream = () => {

    const [open, setOpen] = useState(false);
    const { register, handleSubmit, errors } = useForm<Inputs>();
    // necesarios para los Reducer
    const dispatch = useDispatch();
    //select UI 
    const UI = useSelector((store: any) => store.UI);
    const loading = useSelector((store: any) => store.UI.loading);

    // handle open Dialog
    const handleOpen = () => {
        setOpen(true);
    }
    // handle close Dialog
    const handleClose = () => {
        setOpen(false);
        
    }
    // handle onsubmit
    const onSubmit = (newPost: Inputs) => {
        dispatch(postScream(newPost));
        setOpen(false);
    }

    return (
        <Fragment>
            <MyButton onClick={handleOpen} tip="Post a Scream">
                <AddCircleIcon color="primary"></AddCircleIcon>
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle> Post a new Screams</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
                        <textarea rows={3} name="body"
                            placeholder="Scream at your fellow"
                            className="form-control"
                            ref={register({
                                required: true,
                                maxLength: 200
                            })} /><br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="submit-button"
                            disabled={loading}
                        >Submit
                            {loading && (
                                <CircularProgress
                                    className="progress-spiner"
                                    size={30}
                                />
                            )}
                        </Button>
                        <MyButton
                            tip="Close"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </MyButton>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default PostScream
