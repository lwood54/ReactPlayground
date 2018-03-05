import React from 'react';
import '../styles/components/AuthorQuiz.css';

class Book extends React.Component {
  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
      </div>
    );
  }
}

class AuthorQuiz extends React.Component {
  componentDidMount() {
    document.title = 'Author Quiz';
  }
  render() {
    return (
      <div className="container">
        <h1 className="jumbotron">Author Quiz</h1>
        {this.props.books.map(b => {
          return <Book title={b} />;
        })}
      </div>
    );
  }
}

export default AuthorQuiz;
