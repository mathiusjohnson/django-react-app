import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as H from "history";

export interface RouteComponentProps<P> {
  match: match<P>;
  location: H.Location;
  history: H.History;
  staticContext?: any;
}

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}
interface AppRouteProps {
    component: () => JSX.Element;
    path: string;
    isPrivate: boolean;
    key: string;
}

// interface ComponentProps { 
//     history: History<unknown>; 
//     location: Location<unknown>; 
//     match: match<{ [x: string]: string; }>; 
//     staticContext?: StaticContext; 
// }


const AppRoute: React.FC<AppRouteProps> = ({ component: Component, path, isPrivate, ...rest }) => {
    
	return (
		<Route
			exact path={path}
			render={() =>
				isPrivate === null ? (
					<Redirect to={{ pathname: '/login' }} />
				) : (
					<Component
						  />
				)
			}
			{...rest}
		/>
	);
	
};

export default AppRoute;
