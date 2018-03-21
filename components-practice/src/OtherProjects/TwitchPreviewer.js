import React from 'react';
import axios from 'axios';
import '../styles/components/twitchpreviewer.css';

let userWatchArray = [
  'ESL_SC2',
  'freecodecamp',
  'ninja',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
  'OgamingSC2',
  'cretetion',
  'funfunfunction'
];

const Streamer = props => {
  return (
    <div>
      {props.detailedUsers.map((streamer, index) => {
        let classNameAddition = streamer.liveStatus
          ? 'light-blue lighten-2'
          : 'grey lighten-1';
        if (props.showAll) {
          return (
            <a
              key={streamer.id}
              href={`https://www.twitch.tv/${streamer.login}`}
              target="blank"
              className="grey-text text-darken-4"
            >
              <li
                className={`row card-panel ${classNameAddition} scale-transition`}
              >
                <div className="col s4">
                  <h3 className="flow-text">{streamer.display_name}</h3>
                  <img
                    src={streamer.profile_image_url}
                    className="channelThumbnail"
                  />
                </div>
                <div className="col s8">
                  {streamer.title && (
                    <h5 className="flow-text">
                      {streamer.game}: {streamer.title}
                    </h5>
                  )}
                </div>
                <p className="col s5">{streamer.description}</p>
                {streamer.liveStatus && <p className="col s3">STATUS: live</p>}
                {!streamer.liveStatus && (
                  <p className="col s3">STATUS: offline</p>
                )}
              </li>
            </a>
          );
        } else {
          if (streamer.liveStatus) {
            return (
              <a
                key={streamer.id}
                href={`https://www.twitch.tv/${streamer.login}`}
                target="blank"
                className="grey-text text-darken-4"
              >
                <li
                  key={streamer.id}
                  className="row card-panel light-blue lighten-2"
                >
                  <div className="col s4">
                    <h3 className="flow-text grey-text text-darken-4">
                      {streamer.display_name}
                    </h3>
                    <img
                      src={streamer.profile_image_url}
                      className="channelThumbnail"
                    />
                  </div>
                  <div className="col s8">
                    {streamer.title && (
                      <h5 className="flow-text">
                        {streamer.game}: {streamer.title}
                      </h5>
                    )}
                  </div>
                  <p className="col s5">{streamer.description}</p>
                  <p className="col s3">STATUS: live</p>
                </li>
              </a>
            );
          }
        }
      })}
    </div>
  );
};

class TwitchPreviewer extends React.Component {
  state = {
    showAll: false,
    detailedUsers: [],
    notLoaded: true
  };

  handleShowAll = () => {
    this.setState(prevState => {
      return { showAll: !prevState.showAll };
    });
  };

  handleLoad = () => {
    this.setState(prevState => {
      return { notLoaded: !prevState.notLoaded };
    });
  };

  updateLiveStatus = () => {
    axios({
      method: 'get',
      url: `https://api.twitch.tv/helix/streams?${this.makeUser_loginString(
        userWatchArray
      )}`,
      headers: { 'Client-ID': 'kms8pkycnzfbdul4ficb6wqq9p69tz' }
    })
      .then(response => {
        let newDetailedUsers = [...this.state.detailedUsers];
        newDetailedUsers.map((user, index) => {
          for (var i = 0; i < response.data.data.length; i++) {
            if (user.id === response.data.data[i].user_id) {
              user.liveStatus = true;
              user.title = response.data.data[i].title;
              axios({
                method: 'get',
                url: `https://api.twitch.tv/helix/games?id=${
                  response.data.data[i].game_id
                }`,
                headers: { 'Client-ID': 'kms8pkycnzfbdul4ficb6wqq9p69tz' }
              })
                .then(response => {
                  user.game = response.data.data[0].name;
                })
                .catch(error => {
                  console.log('updateLiveStatus error: ', error);
                });
            }
          }
        });
        this.setState({ detailedUsers: newDetailedUsers });
      })
      .catch(error => {
        console.log('updateLiveStatus error: ', error);
      });
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: `https://api.twitch.tv/helix/users?${this.makeLoginString(
        userWatchArray
      )}`,
      headers: { 'Client-ID': 'kms8pkycnzfbdul4ficb6wqq9p69tz' }
    })
      .then(response => {
        this.setState(
          { detailedUsers: response.data.data },
          this.updateLiveStatus()
        );
      })
      .catch(error => {
        console.log('all users info error: ', error);
      });
  }

  makeUser_loginString = watchListArray => {
    let returnString = 'user_login=' + watchListArray[0];
    for (var i = 1; i < watchListArray.length; i++) {
      returnString += '&user_login=' + watchListArray[i];
    }
    return returnString;
  };

  makeLoginString = watchListArray => {
    let returnString = 'login=' + watchListArray[0];
    for (var i = 1; i < watchListArray.length; i++) {
      returnString += '&login=' + watchListArray[i];
    }
    return returnString;
  };

  render() {
    return (
      <div className="container center-align">
        <a href="https://www.twitch.tv/" target="blank">
          <h1 className="title card-panel light-blue-text text-darken-2">
            Twitch.TV Streamers
          </h1>
        </a>
        <button
          onClick={this.handleLoad}
          className="waves-effect waves-light btn light-blue darken-2"
        >
          {this.state.notLoaded ? 'Load Streamers' : 'Hide Streamers'}
        </button>

        {!this.state.notLoaded && (
          <button
            onClick={this.handleShowAll}
            className="waves-effect waves-light btn light-blue darken-2"
          >
            {!this.state.showAll ? 'Get All Streamers' : 'Get Live Streamers'}
          </button>
        )}
        {!this.state.notLoaded && (
          <ul>
            <Streamer
              detailedUsers={this.state.detailedUsers}
              showAll={this.state.showAll}
            />
          </ul>
        )}
      </div>
    );
  }
}

export default TwitchPreviewer;
