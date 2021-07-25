import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
	const user = useSelector((state) => state.user.user);

	return (
		<Route
			{...rest}
			render={(props) => {
				return user && restricted ? (
					<Redirect to="/" />
				) : (
					<Component {...props} />
				);
			}}
		/>
	);
};

export default PublicRoute;
