import React from 'react'
import { Redirect, useHistory } from 'react-router'
import { Route } from 'react-router-dom';

let id = localStorage.getItem('id')
let rol = localStorage.getItem('admin')
const PrivateRoute = ({ component: Component, role, ...rest }) => (

	<	Route {...rest} render={(props) => (
		 rol == true && role.role == 'admin' 
		?	<Component {...props} /> 
		:	<Redirect to={{ 
			pathname: '/', 
			state: { from: props.location } 
		}} />
	)} />
)

export default PrivateRoute;