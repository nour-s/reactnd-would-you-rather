import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'

let state = {
  auth:{
    userId:""
  },
  polls : [],
  users: [],
  ui: {
	selectedFilter : "unanswered",
  }
}


class App extends Component {
  
componentDidMount() {
  this.props.dispatch(handleInitialData());
}
  
  render() {
    return (
      <div>
		<h1>Users</h1>
      {Object.keys(this.props.users).map(i=><h3>{i}</h3>)}
      </div>
    );
  }
}



function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(App);
