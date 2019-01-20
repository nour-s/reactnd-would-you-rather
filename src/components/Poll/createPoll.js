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
			<div className="poll">
				<h1>New Question</h1>
				<h3>Would you rather:</h3>
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
					<button>Submit</button>
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
