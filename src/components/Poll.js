import React, { Component } from "react";
import "./poll.scss";

class Poll extends Component {
	render() {
		const poll = this.props.poll || {};

		return (
			<div className="poll">
				<h2>Would you rather</h2>
				<div className="author-info">
					<img src="images/avatar.png" alt="avatar" />
					<span>{poll.author}</span>
				</div>
				<div className="answer">{poll.optionOne.text}</div>
				<div className="answer">{poll.optionTwo.text}</div>
			</div>
		);
	}
}

export default Poll;
