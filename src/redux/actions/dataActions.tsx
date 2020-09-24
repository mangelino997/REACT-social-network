import React from 'react'
import {
    SET_SCREAM,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    SET_SCREAMS,
    LOADING_UI, 
    STOP_LOADING_UI,
    DELETE_SCREAM
} from '../types';
import axios from 'axios';

// get all screams
export const getScreams = () =>
    (dispatch: any) => {
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
    dispatch({ type: LOADING_UI });
    axios
        .get(`/scream/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
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
export const unlikeScream = (screamId: string) =>
    (dispatch: any) => {
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

    // delete scream
    export const deleteScream = (screamId: string) => (dispatch: any) => {
        axios.delete(`/scream/${screamId}`)
        .then(() =>{
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            })
        })
        .catch((err: any) => console.log(err))
    }