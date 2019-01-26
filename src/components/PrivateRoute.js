import React from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...routeProps }) => {
	const { authedUser } = routeProps;
	// if render method was already passed, then use it, otherwise render the component
	const render = routeProps.render || (props => <Component {...props} />);
	const redirect = props => (
		<Redirect
			to={{ pathname: "/login", state: { from: props.location } }}
		/>
	);

	return (
		<Route
			{...routeProps}
			render={props => (authedUser.id ? render(props) : redirect(props))}
		/>
	);
};

const mapStateToProps = ({ authedUser }) => ({
	authedUser
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
