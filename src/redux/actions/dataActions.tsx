
import {
    SET_SCREAM,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    SET_SCREAMS,
    LOADING_UI,
    STOP_LOADING_UI,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_ERRORS,
    CLEAR_ERRORS,
    SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// get all screams
export const getScreams = () =>
    (dispatch: any) => {
        dispatch({ type: LOADING_DATA });
        axios.get("/screams")
            .then((res: any) => {
                dispatch({
                    type: SET_SCREAMS,
                    payload: res.data
                });
            })
            .catch((err: any) => {
                dispatch({
                    type: SET_SCREAMS,
                    payload: []
                });
            })
    }
// get a scream for id
export const getScream = (screamId: string) => (dispatch: any) => {
    //dispatch({ type: LOADING_UI });
    axios
        .get(`/scream/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
            //dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
};
// like a screams 
export const likeScream = (screamId: string) =>
    (dispatch: any) => {
        axios.get(`/scream/${screamId}/like`)
            .then((res: any) => {
                dispatch({
                    type: LIKE_SCREAM,
                    payload: res.data
                })
            })
            .catch((err: any) => {
                // dispatch({
                //     type: 
                // })
            })
    }
// unlike a screams
export const unlikeScream = (screamId: string) => (dispatch: any) => {
        axios.get(`/scream/${screamId}/unlike`)
            .then((res: any) => {
                dispatch({
                    type: UNLIKE_SCREAM,
                    payload: res.data
                })
            })
            .catch((err: any) => {
                // dispatch({
                //     type: 
                // })
            })
    };
// submit comment
export const submitComment = (screamId: any, commentData: any) => (dispatch: any) => {
    axios.post(`/scream/${screamId}/comment`, commentData)
        .then((res: any) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch((err: any) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}
// delete scream
export const deleteScream = (screamId: string) => (dispatch: any) => {
    dispatch({
        type: LOADING_UI
    })
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            })
            dispatch(clearErrors());
        })
        .catch((err: any) => console.log(err))
}
// get user data
export const getUserData = (userHanle: string) => (dispatch: any) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userHanle}`)
        .then((res: any) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            })
        })
        .catch((err: any) => {
            dispatch({
                type: SET_SCREAMS,
                payload: null
            })
        })
}
// post a scream
export const postScream = (newScream: any) => (dispatch: any) => {
    dispatch({
        type: LOADING_UI
    })
    axios.post('/scream', newScream)
        .then((res: any) => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err: any) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// clear errors
export const clearErrors = () => (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}