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

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	handleLogoutClick = e => {
		this.props.dispatch({ type: "SET_AUTHED_USER" });
	};

	render() {
		const polls = this.props.polls || {};
		const user = this.props.authedUser;
		return (
			<Router>
				<div className="app">
					{/* <LoadingBar /> */}
					<header>
						<Nav />
						<div className="header_user">
							{user.id && `Logged: ${user.id}` && (
								<button
									className="header_logout"
									onClick={this.handleLogoutClick}
								>
									Logout
								</button>
							)}
						</div>
					</header>
					<PrivateRoute path="/add" exact component={CreatePoll} />
					<PrivateRoute
						path="/questions/:id"
						render={props =>
							polls[props.match.params.id] ? (
								<Poll poll={polls[props.match.params.id]} />
							) : null
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

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);
