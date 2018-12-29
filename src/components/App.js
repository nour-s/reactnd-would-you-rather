import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import Poll from '../components/Poll';

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
    const polls = this.props.polls;
    return (
      <div>
		<h1>Polls</h1>
      {Object.keys(polls).map(k=><Poll poll={polls[k]}/>)}
      </div>
    );
  }
}



function mapStateToProps ({ users, polls }) {
  return {
    users,
    polls
  }
}

export default connect(mapStateToProps)(App);
