import React, { Component, Fragment } from "react";
import "./poll.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { voteForOption } from "../../actions/shared";
import { Link } from "react-router-dom";
import UserSummary from "../userSummary";

export const PollViewMode = {
	Preview: 0,
	Normal: 1
};

class Poll extends Component {
	handleAnswerClick = answer => {
		this.props.voteForOption({ pollId: this.props.poll.id, answer });
	};

	answerComponent = (allVotes, vote, isSelectedAnswer) => {
		return (
			<div className={`answer ${isSelectedAnswer ? "selected" : ""}`}>
				<span>{vote.text}</span>
				<div>Votes: {vote.votes.length}</div>
				<div>
					Percentage:
					{((vote.votes.length * 100) / allVotes.length).toFixed(0)}
				</div>
			</div>
		);
	};

	optionComponent = (option, answerClicked) => {
		return (
			<button onClick={answerClicked} className="answer answer_clickable">
				{option.text}
			</button>
		);
	};

	render() {
		const { poll, authedUser, viewMode } = this.props;
		const allVotes = [...poll.optionOne.votes, ...poll.optionTwo.votes];
		const selectedAnswer = poll.optionOne.votes.includes(authedUser)
			? poll.optionOne
			: poll.optionTwo.votes.includes(authedUser)
			? poll.optionTwo
			: undefined;

		return (
			<div className="poll">
				<h2>Would you rather</h2>
				<div className="poll_author">
					<UserSummary user={poll.user} />
				</div>
				<div className="poll_details">
					{viewMode === PollViewMode.Preview && (
						<p>{poll.optionOne.text}</p>
					)}
					{!selectedAnswer && (
						<Fragment>
							{this.optionComponent(poll.optionOne, () => this.handleAnswerClick(1))}
							{this.optionComponent(poll.optionTwo, () => this.handleAnswerClick(2))}
						</Fragment>
					)}
					{selectedAnswer && (
						<Fragment>
							{this.answerComponent(
								allVotes,
								poll.optionOne,
								poll.optionOne === selectedAnswer
							)}
							{this.answerComponent(
								allVotes,
								poll.optionTwo,
								poll.optionTwo === selectedAnswer
							)}
						</Fragment>
					)}
					{viewMode === PollViewMode.Preview && (
						<Link
							href="#"
							className="poll_view-link"
							to={`/questions/${poll.id}`}
						>
							View Poll
						</Link>
					)}
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ voteForOption }, dispatch);
}

const mapStateToProps = state => {
	return {
		authedUser: state.authedUser.id
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Poll);
