import * as API from "../_DATA";
import { showLoading, hideLoading } from "react-redux-loading";

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
		const { pollId, answer } = voteInfo;
		return API._saveQuestionAnswer({
			authedUser: userId,
			qid: pollId,
			answer
		}).then(() => {
			return Promise.all([API._getUsers(), API._getQuestions()]).then(
				result => {
					const user = result[0][userId];
					const question = result[1][pollId];
					dispatch({
						type: "VOTE_FOR_OPTION",
						user,
						question
					});
				}
			);
		});
	};
}

export function addNewPoll({ optionOneText, optionTwoText }) {
	return (dispatch, getState) => {
		API._saveQuestion({
			optionOneText,
			optionTwoText,
			author: getState().authedUser.id
		}).then(poll =>
			dispatch({
				type: "ADD_NEW_POLL",
				poll
			})
		);
	};
}

export function logout() {
	return dispatch => {
		dispatch({ type: "SET_AUTHED_USER" });
	};
}
