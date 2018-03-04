import React from 'react';
// code snippet from cors-anywhere that allows for authentification through
// their site.
import $ from 'jquery';

$.ajaxPrefilter(function(options) {
  if (options.crossDomain && $.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

const Temperature = props => {
  return (
    <div className="temp">
      {props.isF && <h4 onClick={props.onClick}>{props.currentTempF}&deg;F</h4>}
      {!props.isF && (
        <h4 onClick={props.onClick}>{props.currentTempC}&deg;C</h4>
      )}
    </div>
  );
};

const Condition = props => {
  return (
    <div className="condition">
      <h4>{props.condition}</h4>
    </div>
  );
};

const City = props => {
  return (
    <div className="city">
      <h4>
        {props.currentCity}, {props.country}
      </h4>
    </div>
  );
};

class WeatherApp extends React.Component {
  state = {
    latitude: '',
    longitude: '',
    city: '',
    country: '',
    currentTempF: '',
    isF: 'true',
    currentTempC: '',
    description: '',
    weatherImg: '',
    windSpeed: '',
    windDir: '',
    backgroundImage: ''
  };

  getCurrentCoords = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setCurrentCoords(position);
      });
    } else {
      alert('Please enable geolocation.');
    }
  };

  setCurrentCoords = currentPosition => {
    this.setState({
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude
    });
    this.getWeatherData(this.state.latitude, this.state.longitude);
  };

  getWeatherData = (lat, long) => {
    $.getJSON(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=31fca86b431449f34e2decc907601056&units=imperial`,
      data => {
        this.handleWeatherData(data);
      }
    );
  };

  handleWeatherData = data => {
    this.setState({
      currentTempF: data.main.temp,
      currentTempC: Math.round((data.main.temp - 32) / 1.8 * 100) / 100,
      city: data.name,
      description: data.weather[0].description,
      country: data.sys.country
    });
    this.pickImage();
  };

  handleClick = () => {
    this.setState(prevState => ({
      isF: !prevState.isF
    }));
  };

  pickImage = () => {
    let currentTempF = this.state.currentTempF;
    if (currentTempF >= 32 && currentTempF < 60) {
      this.setState({ backgroundImage: 'cool' });
    } else if (currentTempF >= 60 && currentTempF < 85) {
      this.setState({ backgroundImage: 'warm' });
    } else if (currentTempF >= 85) {
      this.setState({ backgroundImage: 'hot' });
    } else if (currentTempF < 32) {
      this.setState({ backgroundImage: 'cold' });
    }
  };

  componentDidMount() {
    this.getCurrentCoords();
  }

  render() {
    return (
      <div className={this.state.backgroundImage}>
        <h1>Your Local Weather</h1>
        <Temperature
          isF={this.state.isF}
          currentTempF={this.state.currentTempF}
          currentTempC={this.state.currentTempC}
          onClick={this.handleClick}
        />
        <City currentCity={this.state.city} country={this.state.country} />
        <Condition condition={this.state.description} />
      </div>
    );
  }
}

export default WeatherApp;
