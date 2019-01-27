import React, { Component } from "react";
import { connect } from "react-redux";
import "./leaderBoard.scss";

class LeaderBoard extends Component {
	createList = () => {
		let users = Object.keys(this.props.users).map(id => ({
			...this.props.users[id],
			answCount: Object.keys(this.props.users[id].answers).length,
			quesCount: Object.keys(this.props.users[id].questions).length
		}));
		users = users.sort(function(user1, user2) {
			return (
				user2.answCount +
				user2.quesCount -
				(user1.answCount + user1.quesCount)
			);
		});

		return users.map(user => (
			<div key={`user_${user.id}`} className="user_stats">
				<img
					className="user_stats-left"
					src={user.avatarURL}
					alt="avatar"
				/>
				<h2>{user.name}</h2>
				<div className="user_stats-mid">
					<div>Answered: {user.answCount} questions</div>
					<div>Asked: {user.quesCount} questions</div>
				</div>
				<div className="user_stats-right">
					Score: {user.answCount + user.quesCount}
				</div>
			</div>
		));
	};

	render() {
		return (
			<div className="leader-board">
				<h1>Leader Board</h1>
				{this.createList()}
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		users
	};
}

export default connect(mapStateToProps)(LeaderBoard);
