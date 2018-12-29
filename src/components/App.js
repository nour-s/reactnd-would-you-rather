import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import PollList from "../components/PollList";

let state = {
	authedUser: {
		id: ""
	},
	polls: {},
	users: {},
	ui: {
		selectedTab: "unanswered"
	}
};

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return <PollList />;
	}
}

export default connect()(App);
