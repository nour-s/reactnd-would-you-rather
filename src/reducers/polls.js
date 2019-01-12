function polls(state = {}, action) {
	switch (action.type) {
		case "RECIEVE_POLLS":
			return { ...state, ...action.polls };
		case "VOTE_FOR_OPTION":
			let polls = state;
			let { voteInfo } = action;
			polls[voteInfo.pollId][
				voteInfo.answer === 1 ? "optionOne" : "optionTwo"
			].votes.push(voteInfo.userId);
			return { ...polls };
		default:
			return state;
	}
}

export default polls;
