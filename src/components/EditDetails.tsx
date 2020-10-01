import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
// Components
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { MyButton } from '../util/MyButton';

let detail = {
    bio: '',
    website: '',
    location: ''
}
type InputsTypes = {
    bio?: string;
    website?: string;
    location?: string
};
const EditDetails = () => {

    const [open, setOpen] = useState(false);
    const [userDetail, setUSerDetail] = useState(detail);
    const { register, handleSubmit, reset } = useForm<InputsTypes>();
    // useSelector es un Hook que nos permite extraer datos del store de Redux 
    const userCredentials = useSelector((store: any) => store.user.credentials);
    // necessary for the Reducer
    const dispatch = useDispatch();

    // handle onsubmit
    const onSubmit = (data: InputsTypes) => {
        dispatch(editUserDetails(data));
    }

    // handle changes
    const changeStateUser = () => {
        setUSerDetail({
            bio: userCredentials.bio ? userCredentials.bio : '',
            website: userCredentials.website ? userCredentials.website : '',
            location: userCredentials.location ? userCredentials.location : ''
        });
    }

    // close dialog
    const handleClose = () => {
        reset();
        setOpen(false);
    }

    // open dialog edit details
    const handleOpen = () => {
        setOpen(true);
    }

    useEffect(() => {
        changeStateUser();
    }, [userCredentials])
    return (
        <Fragment>
            <MyButton onClick={handleOpen} tip="Edit details">
                <EditIcon color="primary" />
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle >Edit your Details</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
                        <textarea rows={3} name="bio"
                            placeholder="A short bio about yourself"
                            className="form-control"
                            defaultValue={userDetail.bio}
                            ref={register({
                                maxLength: 200
                            })} /><br />
                        <input name="website" type="text"
                            className="form-control"
                            placeholder="Your website"
                            defaultValue={userDetail.website}
                            ref={register({
                                maxLength: 40
                            })} /><br />
                        <input name="location" type="text"
                            className="form-control"
                            placeholder="Where you live"
                            defaultValue={userDetail.location}
                            ref={register({
                                maxLength: 40
                            })} />
                        <DialogActions>
                            <button onClick={handleClose}
                            type="button"
                                className="btn btn-link ">
                                Cancel
                            </button>
                            <button type="submit"
                                className="btn btn-login btn-primary " >
                                Save
                            </button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
export default EditDetails;