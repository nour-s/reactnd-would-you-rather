function users (state = {}, action){
  switch (action.type){
    case "RECIEVE_USERS":
      return { ...state, ...action.users}
      break
    default:
      return state;
  }
}

export default users;