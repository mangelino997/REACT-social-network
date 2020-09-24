import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER
} from '../types'
import axios from 'axios';

// loginUser() seria un Middleware, es un punto medio entre las acciones que ejecuta el
// usuario y el Reducer (donde se cambia de estado) 

export const loginUser = (userData: any, history: any) =>
    (dispatch: any) => {
        dispatch({ type: LOADING_UI });
        axios.post('/login', userData)
            .then((res: any) => {
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push('/'); // go to homepage
            })
            .catch((error: any) => {
                dispatch({
                    type: SET_ERRORS,
                    payload: error.response.data
                });
            });
    }

// controla el sign up
export const signupUser = (newUserData: any, history: any) =>
    (dispatch: any) => {
        dispatch({ type: LOADING_UI });
        axios.post('/signup', newUserData)
            .then((res: any) => {
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push('/'); // go to homepage
            })
            .catch((error: any) => {
                dispatch({
                    type: SET_ERRORS,
                    payload: error.response.data
                });
            });
    }

export const logoutUser = () => (dispatch: any) => {
    console.log("logout");
    localStorage.removeItem("Token");
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

// set token header (codigo que se repite en login y signup)
const setAuthorizationHeader = (token: string) => {
    localStorage.setItem('Token', `Bearer ${token}`);
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token');
};
// obtiene los datos del usuario logueado
export const getUserData = () => (dispatch: any) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user')
        .then((res: any) => {
            console.log(res.data);
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((error: any) => console.log(error))
}

// upload image profile user
export const uploadImage = (formData: any) => (dispatch: any) => {
    console.log("entra");
    dispatch({ type: LOADING_USER });
    axios.post('/user/img', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((error: any) => console.log(error));
}

// user edit
export const editUserDetails = (userDetail: any) => (dispatch: any) => {
    dispatch({type: LOADING_USER});
    axios.post('/user/', userDetail)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => console.log(err));
}