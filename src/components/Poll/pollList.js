import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Poll from "./poll";
import "./pollList.scss";
import { switchTab } from "../../actions/shared";
import PropTypes from "prop-types";

export class PollList extends Component {
	state = {
		newAnswer: false
	};

	handleTabClick = tab => {
		this.props.switchTab(tab);
	};

	getFilteredPolls = tab => {
		const userId = this.props.authedUser.id;
		const polls = Object.keys(this.props.polls)
			.map(k => this.props.polls[k])
			.sort((a, b) => b.timestamp - a.timestamp);
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

	handlePollAnswered = pollId => {
		this.props.history.push(`/questions/${pollId}`);
	};

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
						className={` ${
							ui.selectedTab === "answered" ? "selected" : ""
						} ${this.state.newAnswer ? "new-answer" : ""}`}
						onClick={() => this.handleTabClick("answered")}
					>
						Answered
					</button>
				</div>
				{polls.map(poll => (
					<Poll
						history={this.props.history}
						isClickable={ui.selectedTab === "answered"}
						key={poll.id}
						poll={{ ...poll, user: users[poll.author] }}
						onPollAnswered={this.handlePollAnswered}
					/>
				))}
			</div>
		);
	}
}

PollList.propTypes = {
	polls: PropTypes.object,
	authedUser: PropTypes.shape({
		id: PropTypes.string
	}),
	switchTab: PropTypes.func
};

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
