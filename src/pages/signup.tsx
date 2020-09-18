import React, { Fragment, useState } from 'react';
import iconGlobe from '../images/globo-max.png';
import { useForm  } from "react-hook-form";
import axios from 'axios';
import { Redirect, Link, useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

type NewUser = {
    email: string,
    password: string,
    confirmPassword: string,
    handle: string
};

const Signup = () => {

    var loading: boolean = false;
    let history = useHistory();
    const [errorGeneral, setErrorGeneral] = useState<any>({});
    const { register, handleSubmit, errors, setError, getValues, clearErrors  } = useForm<NewUser>();
    const onSubmit = async (data: NewUser) => {
        console.log(data);
        loading = true;
        try {
            
             let res = await axios.post('/signup', data);
             console.log(res);
             localStorage.setItem('Token',`Bearer ${res.data.token}` );
            // console.log(res);
            setTimeout(() => {
                loading = false;
                history.push('/login'); // go to homepage
            }, 1200)
        } catch (error) {
            console.log(error.response.data); //data.general | data.email | data.password

            setErrorGeneral(error.response.data);
        }
    }

    // check both passwords
    const checkPassword = (e: any) => {
        console.log(e, getValues("password"));
        if (e !== getValues("password")) {
            setError("confirmPassword", {
                type: "manual"
            })
        }
        else {
            clearErrors("confirmPassword")
        };
    }
    return (
        <Fragment>
            <div className="row">
                <div className="col"></div>
                <div className="col-md-6">
                    <div className="text-center py-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
                            <img className="mb-4" src={iconGlobe} alt="" width="72" height="72" />
                            <h1 className="h3 mb-3 font-weight-normal">Welcome</h1>
                            <input name="email" type="email"
                                placeholder="Email" className="form-control"
                                ref={register({
                                    required: true,
                                    maxLength: 20
                                })} /><br />
                            {errors.email && <span className="text-danger text-small d-block">
                                Email is required
                                </span>}
                            <input name="password" type="password"
                                className="form-control" placeholder="Password"
                                ref={register({
                                    required: true,
                                    minLength: 7,
                                    maxLength: 15
                                })} /><br />
                            {errors.password && <span className="text-danger text-small d-block">
                                Password is required
                                </span>}
                            <input name="confirmPassword" type="password"
                                className="form-control" placeholder="confirmPassword"
                                onBlur={(e) => checkPassword(e.target.value)}
                                ref={register({
                                    required: true,
                                    minLength: 7,
                                    maxLength: 15
                                })} /><br />
                            {errors.confirmPassword && <span className="text-danger text-small d-block">
                                Password not match
                                </span>}
                            <input name="handle" type="text"
                                placeholder="Handle" className="form-control"
                                ref={register({
                                    required: true,
                                    maxLength: 15
                                })} /><br />
                            {errors.handle && <span className="text-danger text-small d-block">
                                Handle is required
                                </span>}
                            <br />
                            {errorGeneral && <span className="text-danger text-small d-block">
                                {errorGeneral.general}
                            </span>}
                            <button className="btn btn-lg btn-primary btn-sm"
                                type="submit">Sign up
                                {loading && (<CircularProgress size={30} />)}
                            </button><br />
                            <span>Have an account?</span><br />
                            <Link to="/signup">Login here</Link>
                        </form>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </Fragment>
    )
}
export default Signup;