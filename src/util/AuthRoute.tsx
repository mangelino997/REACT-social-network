import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom";
interface Props {
  component: any,
  [rest: string]: any // All other props
}
const AuthRoute = ({ component: Component, rest }: Props) => {

  // useSelector es un Hook que nos permite extraer datos del store de Redux 
  const authenticated = useSelector((store: any) => store.user.authenticated? true: false);

  return(
    <Route
      {...rest}
      component={(props: any) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
    />

  )
}


export default AuthRoute;
