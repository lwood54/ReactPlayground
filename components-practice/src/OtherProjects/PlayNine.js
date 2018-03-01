import React from 'react';
const _ = require('lodash');

const Stars = props => {
  const numberOfStars = 1 + Math.floor(Math.random() * 9);

  return (
    <div className="col-5">
      {_.range(numberOfStars).map(i => <i key={i} className="fa fa-star" />)}
    </div>
  );
};

const Button = props => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => <span key={i}>{number}</span>)}
    </div>
  );
};

const Numbers = props => {
  const numberClassName = number => {
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  };
  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) => (
          <span key={i} className={numberClassName(number)}>
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};
Numbers.list = _.range(1, 10);

class Game extends React.Component {
  state = {
    selectedNumbers: [2, 4]
  };

  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer selectedNumbers={this.state.selectedNumbers} />
        </div>
        <br />
        <Numbers selectedNumbers={this.state.selectedNumbers} />
      </div>
    );
  }
}

class PlayNine extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

export default PlayNine;