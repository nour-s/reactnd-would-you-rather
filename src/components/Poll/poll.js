import React, { Component, Fragment } from "react";
import "./poll.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { voteForOption } from "../../actions/shared";
import { Link } from "react-router-dom";

export const PollViewMode = {
	Preview: 0,
	Normal: 1
};

class Poll extends Component {
	handleAnswerClick = answer => {
		this.props.voteForOption({ pollId: this.props.poll.id, answer });
	};

	render() {
		const { poll, authedUser, viewMode } = this.props;
		const allVotes = [...poll.optionOne.votes, ...poll.optionTwo.votes];
		const isAnswered = allVotes.includes(authedUser);

		return (
			<div className="poll">
				<h2>Would you rather</h2>
				<div className="author-info">
					<img src="/images/avatar.png" alt="avatar" />
					<span>{poll.author}</span>
				</div>
				{viewMode == PollViewMode.Preview && (
					<p>{poll.optionOne.text}</p>
				)}
				{!isAnswered && (
					<Fragment>
						<button
							onClick={() => this.handleAnswerClick(1)}
							className="answer"
						>
							{poll.optionOne.text}
						</button>
						<button
							onClick={() => this.handleAnswerClick(2)}
							className="answer"
						>
							{poll.optionTwo.text}
						</button>
					</Fragment>
				)}
				{isAnswered && (
					<Fragment>
						<div className="answer">
							<span>{poll.optionOne.text}</span>
							<div>Votes: {poll.optionOne.votes.length}</div>
							<div>
								Percentage:
								{(
									poll.optionOne.votes.length /
									allVotes.length
								).toFixed(2)}
							</div>
						</div>
						<div className="answer">
							<span>{poll.optionTwo.text}</span>
							<div>Votes: {poll.optionTwo.votes.length}</div>
							<div>
								Percentage:
								{(
									poll.optionTwo.votes.length /
									allVotes.length
								).toFixed(2)}
							</div>
						</div>
					</Fragment>
				)}
				{viewMode == PollViewMode.Preview && (
					<Link href="#" to={`/questions/${poll.id}`}>
						View Poll
					</Link>
				)}
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
