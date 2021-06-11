import React from 'react';
import './WeatherPreview.scss';

export function WeatherPreview({ weather }) {
  function dateConverter(timeStemp) {
    var date = new Date();
    date.setTime(timeStemp * 1000);
    return date.toUTCString().substring(0,11);
  }

  function weatherIconConverter(iconNum){
    return iconNum < 10?  '0' + iconNum : iconNum;
  }

  return (
    <li className="weather-preview weather-preview-day">
      {dateConverter(weather.EpochDate)}
      <img
          src={`https://developer.accuweather.com/sites/default/files/${weatherIconConverter(weather.Day.Icon)}-s.png`}
      />
      <h3>{weather.Day.IconPhrase}</h3>
      <span className="weather-preview-temperature">{weather.Temperature.Maximum.Value} &#8451; | {weather.Temperature.Minimum.Value} &#8451;</span>
      <div className="weather-preview weather-preview-night">
        <img
            src={`https://developer.accuweather.com/sites/default/files/${weatherIconConverter(weather.Night.Icon)}-s.png`}
        />
        <h3>{weather.Night.IconPhrase}</h3>
      </div>
    </li>
  );
}
