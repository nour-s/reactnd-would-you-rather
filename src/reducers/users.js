function users(state = {}, action) {
	switch (action.type) {
		case "RECIEVE_USERS":
			return action.users;
		case "VOTE_FOR_OPTION":
			return { ...state, [action.user.id]: action.user };
		case "ADD_NEW_POLL":
			const { poll } = action;
			return {
				...state,
				[poll.author]: {
					...state[poll.author],
					questions: state[poll.author].questions.concat([
						action.poll.id
					])
				}
			};
		default:
			return state;
	}
}

export default users;
