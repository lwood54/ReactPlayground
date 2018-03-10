import React from 'react';
import axios from 'axios';
import '../styles/components/wikiviewer.css';

const GetRandomWikiButton = props => {
  return (
    <div className="center-align">
      <a
        className="btn waves-effect waves-light random"
        href="https://en.wikipedia.org/wiki/Special:Random"
        target="_blank"
      >
        <i className="material-icons right">shuffle</i>
        Random Wiki!
      </a>
    </div>
  );
};

const ArticleItem = props => {
  return (
    <div className="card-panel teal accent-1 hoverable">
      <a className="articleLink" href={props.url} target="_blank">
        <h4 className="flow-text">{props.title}</h4>
        <p className="flow-text teal-text text-darken-2">{props.snippet}</p>
      </a>
    </div>
  );
};

class WikiViewer extends React.Component {
  state = {
    value: '',
    searchTitles: [],
    searchSnippets: [],
    searchUrls: [],
    searchPerformed: false
  };

  getWiki = searchInput => {
    axios({
      method: 'get',
      url: `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchInput}&format=json`
    })
      .then(response => {
        this.setState({
          searchTitles: response.data[1],
          searchSnippets: response.data[2],
          searchUrls: response.data[3]
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
    if (this.state.value !== '') {
      this.getWiki(this.state.value);
      this.setState({
        value: '',
        searchPerformed: true
      });
    }
  };

  render() {
    return (
      <div className="wikiViewer">
        {!this.state.searchPerformed && (
          <GetRandomWikiButton
            className="randomWiki"
            onClick={this.handleRandom}
          />
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input
              className="userInput teal lighten-4"
              onChange={this.handleChange}
              placeholder={'Search Wikipedia!'}
              value={this.state.value}
            />
            <button
              className="
                btn-floating 
                btn-large
                waves-effect
                waves-light
                pulse
                search"
            >
              <i className="material-icons right">search</i>
            </button>
          </div>
        </form>
        {this.state.searchPerformed && <h4>Search Results</h4>}
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
