import React from 'react';
import axios from 'axios';

const GetRandomWikiButton = props => {
  return (
    <div>
      <button onClick={props.handleClick}>Get a random Wiki Article</button>
    </div>
  );
};

const ArticleItem = props => {
  return (
    <div>
      <a href={props.url} target="_blank">
        <p>{props.title}</p>
        <p>{props.snippet}</p>
      </a>
    </div>
  );
};

class WikiViewer extends React.Component {
  state = {
    value: '',
    searchUrl: '',
    searchTitles: [],
    searchSnippets: [],
    searchUrls: [],
    searchPerformed: false
  };

  getWiki = searchInput => {
    axios({
      method: 'get',
      // url: `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&titles=${searchInput}&prop=info&format=json&inprop=url`
      // url: `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchInput}&srlimit=10&srprop=snippet&format=json`
      url: `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchInput}&format=json`
    })
      .then(response => {
        this.setState({
          searchTitles: response.data[1],
          searchSnippets: response.data[2],
          searchUrls: response.data[3],
          searchPerformed: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = event => {
    this.setState({
      value: event.target.value,
      searchPerformed: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.getWiki(this.state.value);
    this.setState({ value: '' });
  };

  setUrl = url => {
    this.setState({
      searchUrl: url
    });
  };

  render() {
    return (
      <div>
        <GetRandomWikiButton />
        <form onSubmit={this.handleSubmit}>
          <label>Search Wikipedia!</label>
          <br />
          <input onChange={this.handleChange} value={this.state.value} />
          <input type="submit" value="search" />
        </form>
        {this.state.searchPerformed && <h1>Search Results</h1>}
        {this.state.searchPerformed &&
          this.state.searchTitles.map((article, index) => {
            return (
              <ArticleItem
                key={index}
                title={article}
                snippet={this.state.searchSnippets[index]}
                url={this.state.searchUrls[index]}
              />
            );
          })}
      </div>
    );
  }
}

export default WikiViewer;
