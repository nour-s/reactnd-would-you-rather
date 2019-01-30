import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Poll, { PollViewMode } from "./poll";
import "./pollList.scss";
import { switchTab } from "../../actions/shared";

class PollList extends Component {
	state = {
		newAnswer : false
	}

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

	handlePollAnswered = () => {
		this.setState({ newAnswer : true }, () => setTimeout(()=> this.setState({ newAnswer : false }), 1000));
	}

	render() {
		const { ui, users } = this.props;
		const polls = this.getFilteredPolls(ui.selectedTab) || [];
		return (
			<div className="pollList">
				<div className="tab-selector">
					<button
						className={
							ui.selectedTab === "unanswered" ? "selected" : ""
						}
						onClick={() => this.handleTabClick("unanswered")}
					>
						Unanswered
					</button>
					<button
						className={
						` ${ ui.selectedTab === "answered" ? "selected" : "" } ${ this.state.newAnswer ? "new-answer" : "" }`
						}
						onClick={() => this.handleTabClick("answered")}
					>
						Answered
					</button>
				</div>
				{polls.map(poll => (
					<Poll
						{...this.props}
						viewMode={
							ui.selectedTab === "answered" &&
							PollViewMode.Preview
						}
						key={poll.id}
						poll={{ ...poll, user: users[poll.author] }}
						onPollAnswered={this.handlePollAnswered}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => state;

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
