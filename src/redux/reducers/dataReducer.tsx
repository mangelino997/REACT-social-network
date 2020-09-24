import React from 'react';
import { SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, SET_SCREAMS, DELETE_SCREAM } from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}
export const dataReducer = (state: any = initialState, action: any) => {
    console.log(action.type);
    // depend the action, do something
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            // find index of the scream
            let index = state.screams.findIndex(
                (scream: any) => scream.screamId === action.payload.screamId
            );
            state.screams[index] = action.payload;
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload;
            }
            return {
                ...state
            };

        case DELETE_SCREAM:
            let indexDelete = state.screams.findIndex(
                (scream: any) => scream.screamId === action.payload
            );
            state.screams.splice(indexDelete, 1);
            return {
                ...state
            }

        default:
            return state;
    }
}
