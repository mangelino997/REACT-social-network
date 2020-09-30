import React from 'react'
import { useForm } from 'react-hook-form';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { submitComment } from '../redux/actions/dataActions';
// Material
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

type Inputs = {
    body: string
};

const CommentForm = ({ screamId }: any) => {

    // comment form
    const { reset, register, handleSubmit } = useForm<Inputs>();
    // necessary for the Reducer
    const dispatch = useDispatch();
    const UI = useSelector((store: any) => store.UI);
    const authenticated = useSelector((store: any) => store.user.authenticated);

    // handle onSubmit
    const onSubmit = (newComment: Inputs) => {
        dispatch(submitComment(screamId, newComment));
        reset();
    };

    // comment form markup
    const commentForm = authenticated ? (
        <div style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea rows={2} name="body"
                    placeholder="Comment on scream"
                    className="form-control"
                    maxLength={100}
                    ref={register({
                        required: true,
                        maxLength: 100
                    })} />
                {UI.errors?.comment && (<span className="text-danger text-small d-block">
                    {UI.errors?.comment}</span>)}
                {/* <Button
                    type="submit"
                    color="primary"
                    className=""
                >
                    Submit
          </Button> */}
                <div className="py-1">
                    <button className="btn btn-login btn-primary "
                        type="submit" >Submit
                </button>
                </div>
            </form>
            <hr className="visible-separator" />
        </div>
    ) : null;
    return commentForm;
}
export default CommentForm
