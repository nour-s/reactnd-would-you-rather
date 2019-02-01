import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PollList from "../components/Poll/pollList";
import Poll from "../components/Poll/poll";
import LeaderBoard from "../components/LeaderBoard/leaderBoard";
import CreatePoll from "../components/Poll/createPoll";
import PrivateRoute from "../components/PrivateRoute";
import Nav from "./Nav";
import Login from "../components/login";
import UserSummary from "./userSummary";
import NotFound from "./NotFound";

export class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	handleLogoutClick = e => {
		this.props.dispatch({ type: "SET_AUTHED_USER" });
	};

	userProfile = user => {
		if (!user) return null;
		return (
			<div className="header_user">
				<UserSummary user={user} />
				<button
					className="header_logout"
					onClick={this.handleLogoutClick}
				>
					Logout
				</button>
			</div>
		);
	};

	render() {
		const { polls, users, authedUser } = this.props;
		const user = users[authedUser.id];
		return (
			<Router>
				<div className="app">
					{/* <LoadingBar /> */}
					<header>
						<Nav />
						{this.userProfile(user)}
					</header>
					<PrivateRoute path="/add" exact component={CreatePoll} />
					<PrivateRoute
						path="/questions/:id"
						render={props =>
							polls[props.match.params.id] ? (
								<Poll
									poll={{
										...polls[props.match.params.id],
										user:
											users[
												polls[props.match.params.id]
													.author
											]
									}}
									history={props.history}
								/>
							) : (
								<NotFound />
							)
						}
					/>
					<PrivateRoute
						path="/leaderboard"
						exact
						component={LeaderBoard}
					/>
					<PrivateRoute path="/" exact component={PollList} />
					<Route path="/login" exact component={Login} />
				</div>
			</Router>
		);
	}
}

const mapStateToProps = ({ users, polls, authedUser }) => ({
	users,
	polls,
	authedUser
});
export default connect(mapStateToProps)(App);
