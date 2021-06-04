import React from 'react';
import './WeatherPreview.scss';

export function WeatherPreview({ weather }) {
    return (
        <li className="weather-preview">
            {weather.Date}
            <img
                src={`https://developer.accuweather.com/sites/default/files/0${weather.Day.Icon}-s.png`}
            />
            <h3>{weather.Day.IconPhrase}</h3>
        </li>
    );
}
