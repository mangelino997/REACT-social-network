import React, { Component } from 'react'
import { Redirect, Route } from "react-router-dom";
interface Props {
  component: any,
  authenticated: boolean,
  [rest: string]: any // All other props
}
const AuthRoute = ({ component: Component, authenticated, rest }: Props) => (
  <Route
    {...rest}
    component={(props: any) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
  />

)


export default AuthRoute;
