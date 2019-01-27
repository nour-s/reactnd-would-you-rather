import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addNewPoll } from "../../actions/shared";
import "./createPoll.scss";

class CreatePoll extends Component {
	state = {
		poll: { optionOne: "", optionTwo: "" }
	};

	handleChangeOptionOne(e) {
		this.setState({
			poll: { ...this.state.poll, optionOne: e.target.value }
		});
	}

	handleChangeOptionTwo(e) {
		this.setState({
			poll: { ...this.state.poll, optionTwo: e.target.value }
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.addNewPoll(this.state.poll);
		this.props.history.push(`/`);
	}

	render() {
		let { poll } = this.state;
		return (
			<div className="create-poll">
				<h1 className="create-poll_title">New Question</h1>
				<h3 className="create-poll_subtitle">Would you rather:</h3>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input
						id="optionOne"
						placeholder="Enter your option one text"
						value={poll.optionOne}
						onChange={this.handleChangeOptionOne.bind(this)}
					/>
					<hr className="hr-text" data-content="OR" />
					<input
						id="optionTwo"
						placeholder="Enter your option two text"
						value={poll.optionTwo}
						onChange={this.handleChangeOptionTwo.bind(this)}
					/>
					<br />
					<button className="create-poll_submit">Submit</button>
				</form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ addNewPoll }, dispatch);
}

export default connect(
	null,
	mapDispatchToProps
)(CreatePoll);
