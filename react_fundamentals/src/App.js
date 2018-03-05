import React from 'react';
import './App.css';
import AuthorQuiz from './components/AuthorQuiz';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AuthorQuiz books={['The Lord of the Rings', 'The Iliad']} />
      </div>
    );
  }
}

export default App;
