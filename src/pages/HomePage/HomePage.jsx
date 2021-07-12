import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentWeather } from '../../cmps/CurrentWeather/CurrentWeather';
import { WeatherList } from '../../cmps/WeatherList/WeatherList';
import { WeatherSearch } from '../../cmps/WeatherSearch/WeatherSearch';
import { CityPreview } from '../../cmps/CityPreview/CityPreview';
import { weatherService } from '../../services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import { loadWeather, loadCurrentWeather, loadCity } from '../../store/actions/weatherActions';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.scss';

export function HomePage(props) {
  const weather = useSelector(state => state.weatherReducer.weather);
  const city = useSelector(state => state.weatherReducer.city);
  const currentWeather = useSelector(state => state.weatherReducer.currentWeather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWeather());
    dispatch(loadCity());
    dispatch(loadCurrentWeather());
  }, []);

  const handleClick = (favoriteToAdd) => {
    weatherService.addToFavorites(favoriteToAdd);
    toast.success("Added succsesfully to favorites!");
  }

  return (
    <div className="home-page container">
      {city && <CityPreview city={city}/>}
      <CurrentWeather currentWeather={currentWeather} />
      <button className="favoriters-btn" onClick={() => handleClick({...props})}>Add to favorites &#x2764;</button>
      {/* <WeatherSearch /> */}
      {weather && <WeatherList weathers={weather} />}
      <ToastContainer />
    </div>
  );
}
