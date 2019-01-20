import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import LoadingBar from "react-redux-loading";
import PollList from "../components/Poll/pollList";
import Poll from "../components/Poll/poll";
import LeaderBoard from "../components/LeaderBoard/leaderBoard";
import CreatePoll from "../components/Poll/createPoll";
import Nav from "./Nav";
import Login from "../components/login";

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		const polls = this.props.polls || {};

		return (
			<Router>
				<Fragment>
					{/* <LoadingBar /> */}
					<Nav
						loggedUser={
							this.props.authedUser
								? this.props.authedUser.id
								: ""
						}
					/>
					<Route path="/add" exact component={CreatePoll} />
					<Route
						path="/questions/:id"
						render={props =>
							polls[props.match.params.id] ? (
								<Poll poll={polls[props.match.params.id]} />
							) : null
						}
					/>
					<Route path="/leaderboard" exact component={LeaderBoard} />
					<Route path="/login" exact component={Login} />
					<Route path="/" exact component={PollList} />
				</Fragment>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	return {
		...state
	};
};

export default connect(mapStateToProps)(App);
