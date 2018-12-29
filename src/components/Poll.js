import React, { Component } from 'react'

class Poll extends Component {
  
  render(){
    const poll = this.props.poll || {};
    
    return (
      <div>
      <h1>
      {JSON.stringify(poll)}
      </h1>
            </div>
           );
  }
}

export default Poll;