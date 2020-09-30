import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import iconGlobe from '../images/globo-max.png';
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';
// redux staff
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

type NewUser = {
    email: string,
    password: string,
    confirmPassword: string,
    handle: string
};

const Signup = () => {

    var loading: boolean = false;
    const [errorGeneral, setErrorGeneral] = useState<any>({});
    const { register, handleSubmit, errors, setError, getValues, clearErrors } = useForm<NewUser>();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data: NewUser) => {
        // loading = true;
        dispatch(signupUser(data, history));
    }

    // check both passwords
    const checkPassword = (e: any) => {
        if (e !== getValues("password")) {
            setError("confirmPassword", {
                type: "manual"
            })
        }
        else {
            clearErrors("confirmPassword")
        };
    }

    // useSelector es un Hook que extrae datos del store de Redux 
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
                        <h1 className="title-login mb-3 font-weight-normal">Sign Up</h1>
                    </div>
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
                            <input name="email" type="email"
                            placeholder="username@gmail.com"
                                pattern=".+@gmail.com"
                                title="your email must be @gmail"
                                className="form-control"
                                ref={register({
                                    required: true,
                                    maxLength: 20
                                })} />
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
                            {errors.password && <span className="text-danger text-small d-block">
                                Password is required
                                </span>}<br />
                            <input name="confirmPassword" type="password"
                                className="form-control" placeholder="repeat password"
                                onBlur={(e) => checkPassword(e.target.value)}
                                ref={register({
                                    required: true,
                                    minLength: 7,
                                    maxLength: 15
                                })} />
                            {errors.confirmPassword &&
                                <span className="text-danger text-small d-block">
                                    Password not match
                                </span>}<br />
                            <input name="handle" type="text"
                                placeholder="username" className="form-control"
                                ref={register({
                                    required: true,
                                    maxLength: 15
                                })} />
                            {errors.handle && <span className="text-danger text-small d-block">
                                Username is required
                                </span>}<br />
                            {errorGeneral && <span className="text-danger text-small d-block">
                                {errorGeneral.general}
                            </span>}

                            <div className="row">
                                <div className="col-md-4">
                                    <button className="btn btn-primary btn-login"
                                        type="submit">Sign up
                                        {loading && (<CircularProgress size={30} />)}
                                    </button>
                                </div>
                                <div className="col-md-8">
                                    <span>Have an account? </span>
                                    <Link to="/login" className="signin-login"> Login here</Link>
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
export default Signup;