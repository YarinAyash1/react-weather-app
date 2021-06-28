import React from 'react';
import { connect } from 'react-redux';
import { CurrentWeather } from '../../cmps/CurrentWeather/CurrentWeather';
import { WeatherList } from '../../cmps/WeatherList/WeatherList';
import { WeatherSearch } from '../../cmps/WeatherSearch/WeatherSearch';
import { CityPreview } from '../../cmps/CityPreview/CityPreview';
import { weatherService } from '../../services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import { loadWeather, loadCurrentWeather, loadCity } from '../../store/actions/weatherActions';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.scss';

class _HomePage extends React.Component {
  componentDidMount() {
    this.props.loadWeather();
    this.props.loadCurrentWeather();
    this.props.loadCity();
  }

  handleClick = (addToFavorites) => {
    console.log('this is:', addToFavorites);
    weatherService.favoritesList(addToFavorites);
    toast.success("Added succsesfully to favorites!");
  }

  render() {
    const { weather, currentWeather, city } = this.props;
    return (
      <>
        <div className="home-page container">
          {city && <CityPreview city={city}/>}
          <button className="favoriters-btn" onClick={() => this.handleClick(currentWeather)} >Add to favorites &#x2764;</button>
          <CurrentWeather currentWeather={ currentWeather }  />
          <WeatherSearch />
          {weather && <WeatherList weathers={ weather } />}
          <ToastContainer />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weatherReducer.weather,
    currentWeather: state.weatherReducer.currentWeather,
    city: state.weatherReducer.city,
  }
}

const mapDispatchToProps = {
  loadWeather,
  loadCurrentWeather,
  loadCity
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)