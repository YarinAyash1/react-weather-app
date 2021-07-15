import React from 'react';
import { weatherIconConverter } from '../../services/utilService';
import './WeatherPreview.scss';

export function WeatherPreview({ weather }) {
  function dateConverter(timeStemp) {
    var date = new Date();
    date.setTime(timeStemp * 1000);
    return date.toUTCString().substring(0,11);
  }

  return (
    <li className="weather-preview">
      <div className="weather-preview-day">
        <div>{dateConverter(weather.EpochDate)}</div>
        <img className="weather-preview-icon"
            src={`https://developer.accuweather.com/sites/default/files/${weatherIconConverter(weather.Day.Icon)}-s.png`}
        />
        <h3>{weather.Day.IconPhrase}</h3>
        <span className="weather-preview-temperature">{weather.Temperature.Maximum.Value} &#8451; | {weather.Temperature.Minimum.Value} &#8451;</span>
      </div>
      <div className="weather-preview-night">
        <img className="weather-preview-icon"
            src={`https://developer.accuweather.com/sites/default/files/${weatherIconConverter(weather.Night.Icon)}-s.png`}
        />
        <h3>{weather.Night.IconPhrase}</h3>
      </div>
    </li>
  );
}
