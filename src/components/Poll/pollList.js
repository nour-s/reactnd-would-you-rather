import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Poll from "./poll";
import "./pollList.scss";
import { switchTab } from "../../actions/shared";

class PollList extends Component {
	handleTabClick = tab => {
		this.props.switchTab(tab);
	};

	getFilteredPolls = tab => {
		const userId = this.props.authedUser.id;
		const polls = Object.keys(this.props.polls).map(
			k => this.props.polls[k]
		);
		switch (tab) {
			case "unanswered":
				return polls.filter(
					p =>
						p.optionOne.votes.indexOf(userId) < 0 &&
						p.optionTwo.votes.indexOf(userId) < 0
				);
			case "answered":
				return polls.filter(
					p =>
						p.optionOne.votes.indexOf(userId) >= 0 ||
						p.optionTwo.votes.indexOf(userId) >= 0
				);
			default:
				return [];
		}
	};

	render() {
		const { ui } = this.props;
		console.log("ui.selectedTab ", ui.selectedTab);
		const polls = this.getFilteredPolls(ui.selectedTab) || [];
		return (
			<div className="pollList">
				<div className="tab-selector">
					<a
						className={
							ui.selectedTab === "unanswered" ? "selected" : ""
						}
						onClick={() => this.handleTabClick("unanswered")}
					>
						Unanswered
					</a>
					<a
						className={
							ui.selectedTab === "answered" ? "selected" : ""
						}
						onClick={() => this.handleTabClick("answered")}
					>
						Answered
					</a>
				</div>
				{polls.map(p => (
					<Poll key={p.id} poll={p} />
				))}
			</div>
		);
	}
}

function mapStateToProps({ authedUser, polls, ui }) {
	return { authedUser, polls, ui };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			switchTab
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PollList);
