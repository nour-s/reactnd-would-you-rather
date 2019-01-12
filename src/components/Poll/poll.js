import React, { Component } from "react";
import "./poll.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { voteForOption } from "../../actions/shared";

class Poll extends Component {
	handleAnswerClick = answer => {
		this.props.voteForOption({ pollId: this.props.poll.id, answer });
	};

	render() {
		const poll = this.props.poll || {};

		return (
			<div className="poll">
				<h2>Would you rather</h2>
				<div className="author-info">
					<img src="images/avatar.png" alt="avatar" />
					<span>{poll.author}</span>
				</div>
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
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ voteForOption }, dispatch);
}

export default connect(
	null,
	mapDispatchToProps
)(Poll);
