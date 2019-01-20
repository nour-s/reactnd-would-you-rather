import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAuthedUser } from "../actions/shared";
import "./login.scss";

class Login extends Component {
	state = {
		selectedUser: "",
		showError: false
	};

	handleSubmit = e => {
		e.preventDefault();
		const { selectedUser } = this.state;
		if (!selectedUser || selectedUser === "") {
			this.setState({ showError: true });
			return;
		}
		this.props.setAuthedUser(this.state.selectedUser);
		this.props.history.push(`/`);
	};

	handleChange = e => {
		this.setState({ selectedUser: e.target.value, showError: false });
	};

	render() {
		let users = Object.keys(this.props.users).map(
			uid => this.props.users[uid]
		);

		return (
			<form onSubmit={this.handleSubmit}>
				{this.state.showError && (
					<span className="validation_error">
						You should select a user
					</span>
				)}
				<select
					value={this.state.selectedUser}
					onChange={this.handleChange}
				>
					<option key="empty" />
					{users.map(user => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>
				<button>Login</button>
			</form>
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
