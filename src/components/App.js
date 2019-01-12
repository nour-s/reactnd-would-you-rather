import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import LoadingBar from "react-redux-loading";
import PollList from "../components/Poll/pollList";
import Nav from "./Nav";

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<Router>
				<Fragment>
					{/* <LoadingBar /> */}
					<Nav />
					<Route path="/" exact component={PollList} />
				</Fragment>
			</Router>
		);
	}
}

export default connect()(App);
