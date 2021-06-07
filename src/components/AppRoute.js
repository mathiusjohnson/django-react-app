import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const AppRoutes = ({ component: Component, path, isPrivate, props, state, createService, deleteService, ...rest }) => {
	return (
		<Route
			exact path={path}
			render={(props) =>
				isPrivate === null ? (
					<Redirect to={{ pathname: '/login' }} />
				) : (
					<Component 
						{...props}  />
				)
			}
			{...rest}
		/>
	);
	
};

export default AppRoutes;
