import React from 'react';
import { CurrentWeather } from '../../cmps/CurrentWeather/CurrentWeather';
import { WeatherList } from '../../cmps/WeatherList/WeatherList';
import { WeatherSearch } from '../../cmps/WeatherSearch/WeatherSearch';
import { CityPreview } from '../../cmps/CityPreview/CityPreview';
import { weatherService } from '../../services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './HomePage.scss';

export default class HomePage extends React.Component {
  state = {
      weather: null,
      currentWeather: null,
      city: null
  };

  componentDidMount() {
      this.loadWeather();
      this.loadCurrentWeather();
      this.loadCity();
  }

  handleClick = (addToFavorites) => {
    console.log('this is:', addToFavorites);
    weatherService.favoritesList(addToFavorites);
    toast.success("Added succsesfully to favorites!");

  }

  // notify = () => toast("Added succsesfully to favorites!");

  
  async loadWeather() {
      const weather = await weatherService.getWeather();
      this.setState({ weather });
  }

  async loadCity() {
    const city = await weatherService.getCity();
    this.setState({ city });
  }

  async loadCurrentWeather() {
      const currentWeather = await weatherService.getCurrentWeather();
      this.setState({ currentWeather });
  }

  render() {
    const weather = this.state.weather;
    const currentWeather = this.state.currentWeather;
    const city = this.state.city;
    return (
        <>
          <div className="home-page container">
            <div class="city">
             {city && <CityPreview city={city}/>}
            </div>

            <button className="favoriters-btn" onClick={() => this.handleClick(currentWeather)} >Add to favorites &#x2764;</button>
            <CurrentWeather currentWeather={currentWeather}  />
            <WeatherSearch />
            {weather && <WeatherList weathers={weather} />}
            <ToastContainer />
          </div>
        </>
    );
  }
}
