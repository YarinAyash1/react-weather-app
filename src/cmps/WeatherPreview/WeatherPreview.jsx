import React from 'react';
import './WeatherPreview.scss';

export function WeatherPreview({ weather }) {
  function convertDate(timeStemp) {
    var date = new Date();
    date.setTime(timeStemp * 1000);
    return date.toUTCString().substring(0,11);
  }

  return (
    <li className="weather-preview">
      {convertDate(weather.EpochDate)}
      <img
          src={`https://developer.accuweather.com/sites/default/files/0${weather.Day.Icon}-s.png`}
      />
      <h3>{weather.Day.IconPhrase}</h3>
    </li>
  );
}
