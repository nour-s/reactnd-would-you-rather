import * as API from '../_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'


const AUTHED_ID = 'tylermcginnis'

function getInitialData () {
  return Promise.all([
    API._getUsers(),
    API._getQuestions(),
  ]).then(([users, polls]) => ({
    users,
    polls,
  }))
}

export function receiveUsers (users) {
	return {
     type:  "RECIEVE_USERS",
      users
    }
}

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, polls }) => {
        dispatch(receiveUsers(users))
        dispatch(receivePolls(polls))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function receivePolls(polls){
	return {
     type:  'RECIEVE_POLLS',
      polls
    }
}

export function setAuthedUser(id){
	return {
     type:  'SET_AUTH_USER',
      id
    }
}