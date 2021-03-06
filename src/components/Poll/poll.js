import React, { Component, Fragment } from "react";
import "./poll.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { voteForOption } from "../../actions/shared";
import UserSummary from "../userSummary";
import PropTypes from "prop-types";

export class Poll extends Component {
	constructor(props) {
		super(props);
		const { poll, authedUser } = props;
		this.state = {
			disabled: false,
			selectedAnswer: poll.optionOne.votes.includes(authedUser)
				? poll.optionOne
				: poll.optionTwo.votes.includes(authedUser)
				? poll.optionTwo
				: undefined
		};
	}

	handleAnswerClick = answer => {
		const { poll, onPollAnswered } = this.props;
		answer = ["optionOne", "optionTwo"][answer];
		this.props
			.voteForOption({
				pollId: poll.id,
				answer
			})
			.then(() => {
				if (onPollAnswered) {
					this.props.onPollAnswered(poll.id);
				}
			});
		this.setState({ disabled: true, selectedAnswer: answer });
	};

	answerComponent = (allVotes, vote, isSelectedAnswer) => {
		return (
			<Fragment>
				{isSelectedAnswer ? (
					<span className="poll_details__label">Your answer:</span>
				) : null}
				<div className={`answer ${isSelectedAnswer ? "selected" : ""}`}>
					<div className="answer_text">{vote.text}</div>
					<div className="answer_details">
						{vote.votes.length} Votes{" "}
						{((vote.votes.length * 100) / allVotes.length).toFixed(
							0
						)}
						%
					</div>
				</div>
			</Fragment>
		);
	};

	optionComponent = (option, answerClicked) => {
		return (
			<button
				disabled={this.state.disabled && "disabled"}
				onClick={answerClicked}
				className="answer"
			>
				{option.text}
			</button>
		);
	};

	handlePollClick = e => {
		this.props.history.push(`/questions/${this.props.poll.id}`);
	};

	render() {
		// isClickable means the component can be clicked to browse to the vote.
		const { poll, isClickable } = this.props;
		const allVotes = [...poll.optionOne.votes, ...poll.optionTwo.votes];
		const { selectedAnswer } = this.state;

		return (
			<div
				className={[
					"poll",
					isClickable ? "poll--preview" : "",
					this.state.disabled ? "answered" : ""
				].join(" ")}
				onClick={isClickable ? e => this.handlePollClick(e) : null}
			>
				<h2>Would you rather</h2>
				<div className="poll_author">
					<UserSummary user={poll.user} />
				</div>
				<div className="poll_details">
					{!selectedAnswer && (
						<Fragment>
							{this.optionComponent(poll.optionOne, () =>
								this.handleAnswerClick(0)
							)}
							{this.optionComponent(poll.optionTwo, () =>
								this.handleAnswerClick(1)
							)}
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
				</div>
			</div>
		);
	}
}

Poll.propTypes = {
	poll: PropTypes.PropTypes.shape({
		user: PropTypes.PropTypes.object.isRequired
	}),
	authedUser: PropTypes.string,
	voteForOption: PropTypes.func.isRequired,
	onPollAnswered: PropTypes.func,
	history: PropTypes.object.isRequired,
	isClickable: PropTypes.bool
};

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
