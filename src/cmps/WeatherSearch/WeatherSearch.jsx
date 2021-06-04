import React, { Component } from 'react';
import { weatherService } from '../../services/weatherService';
import './WeatherSearch.scss';

export class WeatherSearch extends Component {
  onChangeHandler = (ev) => {
      console.log('search,', ev.target.value);
      weatherService.getLocationAutoComplete(ev.target.value)
      if (ev.target.value > 0) {
      }
  };

  render() {
      return (
          <form className="weather-search">
              <input
                  type="text"
                  onChange={this.onChangeHandler}
                  placeholder="Type location"
              />
    
          </form>
      );
  }
}
