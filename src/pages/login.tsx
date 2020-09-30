import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import iconGlobe from '../images/globo-max.png';
import { Link, useHistory } from "react-router-dom";
//import CircularProgress from '@material-ui/core/CircularProgress';
// redux staff
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

type Inputs = {
    email: string,
    password: string
};
const Login = () => {

    // var loading: boolean = false;
    const [errorGeneral, setErrorGeneral] = useState<any>({});
    const { register, handleSubmit, errors } = useForm<Inputs>();
    // necesarios para los Reducer
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data: Inputs) => {
        //loading = true;
        dispatch(loginUser(data, history));
    }
 
    // useSelector es un Hook que nos permite extraer datos del store de Redux 
    //utilizando una función selectora, seria como el componentWillReceiveProps (sin hooks)
    const p = useSelector((store: any) => store.UI);
    
    // handle change errors
    useEffect(() => {
        if(p.errors?.general){
            setErrorGeneral(p.errors)
        }
    }, [p])
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
                                type="submit" >Login
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