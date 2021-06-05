import React, { Component } from 'react';
import { weatherService } from '../../services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './WeatherSearch.scss';

export class WeatherSearch extends Component {
  state = {
    autocomplete: '',
  };

  onChangeHandler = (ev) => {
    console.log(ev.target)
    var letters = /^[A-Za-z]+$/;
    if(!ev.target.value.match(letters)){
      toast.warn("It must be only English letters only");
      return;

    } else {
      console.log('search,', ev.target.value);
      weatherService.getLocationAutoComplete(ev.target.value);
    }
  };

  componentDidMount() {
    this.loadAutoComplete();
  }

  async loadAutoComplete() {
    const autocomplete = await weatherService.getLocationAutoComplete();
    console.log('res auto complete', autocomplete);
    this.setState({ autocomplete });
  }

  render() {
    const autocomplete = this.state.autocomplete;
    return (
      <form className="weather-search">
        <input
          type="text"
          className="weather-search-input"
          onChange={this.onChangeHandler}
          placeholder="Type location"
          list="locations"
        />
        <datalist id="locations">
          <ul className="feature-list clean-list">
            {autocomplete && autocomplete.map((city) => (
              <option key={city.Key} value={city.LocalizedName }/>
            ))}
          </ul>
        </datalist>
      </form>
    );
  }
}
