import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import userNoImg from '../images/no-img.png';
import { Link, useHistory } from "react-router-dom";
//import CircularProgress from '@material-ui/core/CircularProgress';
// redux staff
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { CircularProgress } from '@material-ui/core';

type Inputs = {
    email: string,
    password: string
};
const Login = () => {

    let loading: boolean = false;
    const [errorGeneral, setErrorGeneral] = useState<any>({});
    const { register, handleSubmit, errors } = useForm<Inputs>();
    // necesarios para los Reducer
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data: Inputs) => {
        loading = true;
        dispatch(loginUser(data, history));
    }

    // useSelector es un Hook que nos permite extraer datos del store de Redux 
    //utilizando una función selectora, seria como el componentWillReceiveProps (sin hooks)
    const p = useSelector((store: any) => store.UI);

    // handle change errors
    useEffect(() => {
        if (p.errors?.general) {
            setErrorGeneral(p.errors)
        }
    }, [p])
    return (
        <Fragment>
            <div className="row">
                <div className="col"></div>
                <div className="col-md-6 card-login">
                    <div className="py-4 text-center">
                        <img className="mb-4" src={userNoImg} alt="" width="76" height="76" />
                        <h1 className="title-login mb-3 font-weight-normal">Welcome</h1>
                    </div>
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
                            <input name="email" type="text"
                                placeholder="your email" className="form-control"
                                pattern=".+@gmail.com"
                                title="your email must be @gmail"
                                ref={register({
                                    required: true,
                                    maxLength: 50
                                })} />
                                <small>Example: username@gmail.com</small>
                            {errors.email && <span className="text-danger text-small d-block">
                                Email is required
                                </span>}<br />
                            <input name="password" type="password"
                                className="form-control" placeholder="password"
                                ref={register({
                                    required: true,
                                    minLength: 7,
                                    maxLength: 15
                                })} />
                                <small>Must have at least 6 characters</small>
                            {errors.password && <span className="text-danger text-small d-block">
                                Password is required
                                </span>}
                            <br />
                            {errorGeneral && <span className="text-danger text-small d-block">
                                {errorGeneral.general}
                            </span>}
                            <div className="row">
                                <div className="col-md-3">
                                    <button className="btn btn-login btn-primary"
                                        type="submit" >Login
                                        {loading && (<CircularProgress color="secondary" size={30} />)}
                                    </button>
                                </div>
                                <div className="col-md-9">
                                    <span>Don't have an account? </span>
                                    <Link to="/signup" className="signin-login"> Sign in here</Link>
                                </div>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            
        </Fragment>
    )
}
export default Login;