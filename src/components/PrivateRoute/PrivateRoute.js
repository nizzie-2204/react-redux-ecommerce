import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const user = useSelector((state) => state.user.user);

	return (
		<Route
			{...rest}
			render={(props) => {
				return user ? <Component {...props} /> : <Redirect to="/" />;
			}}
		/>
	);
};

export default PrivateRoute;
