function polls (state = {}, action){
  switch (action.type){
    case "RECIEVE_POLLS":
      return { ...state, ...action.polls}
    default:
      return state;
  }
}

export default polls;