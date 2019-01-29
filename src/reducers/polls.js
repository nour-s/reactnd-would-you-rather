function polls(state = {}, action) {
	switch (action.type) {
		case "RECIEVE_POLLS":
			return { ...state, ...action.polls };
		case "VOTE_FOR_OPTION":
			let polls = state;
			const { question } = action;
			Object.assign(polls[question.id], question);
			return { ...polls };
		case "ADD_NEW_POLL":
			return { ...state, [action.poll.id]: action.poll };
		default:
			return state;
	}
}

export default polls;
