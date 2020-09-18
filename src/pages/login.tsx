import React, { Fragment, useState } from 'react';
import iconGlobe from '../images/globo-max.png';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Redirect, Link, useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

type Inputs = {
    email: string,
    password: string
};
const Login = () => {

    var loading: boolean = false;
    let history = useHistory();
    const [errorGeneral, setErrorGeneral] = useState<any>({});
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();

    const onSubmit = async (data: Inputs) => {
        loading = true;
        try {
             let res = await axios.post('login', data);
             localStorage.setItem('Token',`Bearer ${res.data.token}` );
            // console.log(res);
            setTimeout(() => {
                loading = false;
                history.push('/'); // go to homepage
            }, 1200)
        } catch (error) {
            console.log(error.response.data); //data.general | data.email | data.password

            setErrorGeneral(error.response.data);
        }
    }
    //console.log(watch("email")) // watch input value by passing the name of it
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
                                    maxLength: 15
                                })} /><br />
                            {errors.password && <span className="text-danger text-small d-block">
                                Password is required
                                </span>}
                            <br />
                            {errorGeneral && <span className="text-danger text-small d-block">
                                {errorGeneral.general}
                            </span>}
                            <button className="btn btn-lg btn-primary btn-sm" 
                            type="submit" disabled={loading}>Login
                                {loading && (<CircularProgress size={30}/>)}
                            </button><br />
                            <span>Don't have an account?</span><br />
                            <Link to="/signup">Sign in here</Link>
                        </form>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </Fragment>
    )
}
export default Login;