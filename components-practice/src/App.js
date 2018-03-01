import React, { Component } from 'react';
import './App.css';
import GitHubSearch from './OtherProjects/GitHubSearch';
import PlayNine from './OtherProjects/PlayNine';

class Button extends React.Component {
  render() {
    return (
      <div>
        {/*this.props.buttonStart was passed along as a prop when <Button /> was invoked. */}
        <h4>Button {this.props.buttonStart}</h4>
        <button onClick={this.props.screwUpButtons}>
          {/*passed screwUpButtons func through props*/}
          {this.props.buttonStart}
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    start1: 1,
    start2: 2,
    start3: 3
  };

  screwUpButtons = () => {
    this.setState(prevState => ({
      start1: prevState.start1 + this.state.start3,
      start2: prevState.start2 + this.state.start1,
      start3: prevState.start3 * this.state.start2
    }));
  };

  render() {
    return (
      <div>
        <h1>Step Increments</h1>
        <Button
          screwUpButtons={this.screwUpButtons}
          buttonStart={this.state.start1}
        />
        <Button
          screwUpButtons={this.screwUpButtons}
          buttonStart={this.state.start2}
        />
        <Button
          screwUpButtons={this.screwUpButtons}
          buttonStart={this.state.start3}
        />
        <GitHubSearch />
        <PlayNine />
      </div>
    );
  }
}

export default App;
