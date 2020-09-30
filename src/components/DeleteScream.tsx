import React, { useState, Fragment } from 'react'
// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
// Redux
import { deleteScream } from '../redux/actions/dataActions';
import { MyButton } from '../util/MyButton';
import { useDispatch } from 'react-redux';

const DeletScream = ({screamId}: any) => {

    // state
    const [open, setOpen] = useState(false);
    // open dialog
    const handleOpen = () => {
        setOpen(true);
    }

    // close dialog
    const handleClose = () => {
        setOpen(false);
    }

    // necessary for the Reducer
    const dispatch = useDispatch();
    
    // handle delete scream
    const deleteCurrentScream = () => {
        dispatch(deleteScream(screamId));
        setOpen(false);
    }

    return (
        <Fragment>
            <MyButton
                tip="Delete scream"
                onClick={handleOpen}
            >
                <DeleteOutline color="secondary"></DeleteOutline>
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this scream ?
          </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteCurrentScream} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default DeletScream
