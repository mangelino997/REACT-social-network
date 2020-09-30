import { POST_SCREAM } from '../types';
import {
    SET_SCREAM,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    SET_SCREAMS,
    DELETE_SCREAM,
    SUBMIT_COMMENT
} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}
export const dataReducer = (state: any = initialState, action: any) => {
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
                screams: action.payload
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            // find index of the scream
            let index = state.screams.findIndex(
                (scream: any) => scream.screamId === action.payload.screamId
            );
            state.screams[index] = action.payload;
            // is for update likes scream dialog
            if (state.scream.screamId === action.payload.screamId) {
                // state.scream = action.payload; // con esta linea me pierde los comentarios en el dialog
                state.scream = {
                    ...state.scream,
                    likeCount: action.payload.likeCount
                }
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
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SUBMIT_COMMENT:
            // find index of the scream
            let indexComment = state.screams.findIndex(
                (scream: any) => scream.screamId === action.payload.screamId
            );
            // update commentCount in screams 
            state.screams[indexComment] = {
                ...state.screams[indexComment],
                commentCount: (state.scream.commentCount + 1)
            } 
            // update scream
            state.scream = {
                ...state.scream,
                commentCount: (state.scream.commentCount + 1),
                comments: [
                    action.payload,
                    ...state.scream.comments
                ]
            };
            return {
                ...state
            };
        default:
            return state;
    }
}
