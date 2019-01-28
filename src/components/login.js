import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { setAuthedUser } from "../actions/shared";
import UserSummary from "../components/userSummary";
import "./login.scss";

class Login extends Component {
	state = {
		selectedUserId: "",
		showError: false,
		isAuthorized: false
	};

	handleSubmit = e => {
		e.preventDefault();
		const { selectedUserId } = this.state;
		if (!selectedUserId || selectedUserId === "") {
			this.setState({ showError: true });
			return;
		}
		this.props.setAuthedUser(this.state.selectedUserId);
		this.setState(prevState => ({ ...prevState, isAuthorized: true }));
	};

	handleChange = e => {
		this.setState({ selectedUserId: e.target.value, showError: false });
	};

	render() {
		const { from } = this.props.location.state || {
			from: { pathname: "/" }
		};

		const user = this.props.users[this.state.selectedUserId];

		if (this.state.isAuthorized) {
			return <Redirect to={from} />;
		}

		let users = Object.keys(this.props.users).map(
			uid => this.props.users[uid]
		);

		return (
			<div className="login">
				<h1 className="login_title">Login</h1>
				<UserSummary user={user} />
				<form onSubmit={this.handleSubmit}>
					{this.state.showError && (
						<span className="validation_error">
							You should select a user
						</span>
					)}
					<div className="login_select-wrapper">
						<select
							value={this.state.selectedUserId}
							onChange={this.handleChange}
							className="login_select"
						>
							<option key="empty" />
							{users.map(user => (
								<option key={user.id} value={user.id}>
									{user.name}
								</option>
							))}
						</select>
					</div>
					<button className="login_submit">Login</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = ({ authedUser, users }) => ({
	authedUser,
	users
});

const mapDispatcToProps = dispatch => {
	return bindActionCreators({ setAuthedUser }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatcToProps
)(Login);
