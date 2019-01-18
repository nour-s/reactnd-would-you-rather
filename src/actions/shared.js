import * as API from "../_DATA";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "tylermcginnis";

function getInitialData() {
	return Promise.all([API._getUsers(), API._getQuestions()]).then(
		([users, polls]) => ({
			users,
			polls
		})
	);
}

export function handleInitialData() {
	return dispatch => {
		dispatch(showLoading());
		return getInitialData().then(({ users, polls }) => {
			dispatch(setAuthedUser(AUTHED_ID));
			dispatch(switchTab("unanswered"));
			dispatch(receiveUsers(users));
			dispatch(receivePolls(polls));
			dispatch(hideLoading());
		});
	};
}

export function receiveUsers(users) {
	return {
		type: "RECIEVE_USERS",
		users
	};
}

export function receivePolls(polls) {
	return {
		type: "RECIEVE_POLLS",
		polls
	};
}

export function setAuthedUser(id) {
	return {
		type: "SET_AUTHED_USER",
		id
	};
}

export function switchTab(tab) {
	return dispatch => {
		dispatch({
			type: "SET_SELECTED_TAB",
			tab
		});
	};
}

export function voteForOption(voteInfo) {
	return (dispatch, getState) => {
		const userId = getState().authedUser.id;
		dispatch({
			type: "VOTE_FOR_OPTION",
			voteInfo: { ...voteInfo, userId }
		});
	};
}

export function addNewPoll({ optionOne, optionTwo }) {
	return (dispatch, getState) => {
		const id = [...Array(22)]
			.map(i => (~~(Math.random() * 36)).toString(36))
			.join("");

		let poll = {
			id,
			timestamp: +Date.now(),
			author: getState().authedUser.id,
			optionOne: {
				text: optionOne,
				votes: []
			},
			optionTwo: {
				text: optionTwo,
				votes: []
			}
		};

		dispatch({
			type: "ADD_NEW_POLL",
			poll
		});
		return poll;
	};
}
