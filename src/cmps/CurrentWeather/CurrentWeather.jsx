import React from 'react';
import { weatherIconConverter } from '../../services/utilService';
import './CurrentWeather.scss';

export function CurrentWeather({ currentWeather }) {
  return (
    <>
      {currentWeather && (
        <div className="current-weather">
          <img className="current-weather-icon"
            src={`https://developer.accuweather.com/sites/default/files/${weatherIconConverter(
              currentWeather.WeatherIcon
            )}-s.png`}
          />
          <p>{currentWeather.WeatherText}</p>
          <span className="current-weather-temperature">{currentWeather.Temperature.Metric.Value} &#8451;</span>
        </div>
      )}
    </>
  );
}
