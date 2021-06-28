import React from 'react';
import { WeatherPreview } from '../WeatherPreview/WeatherPreview';
import './WeatherList.scss';

export function WeatherList({ weathers }) {
  return (
    <ul className="feature-list clean-list">
      {weathers.map((weather, index) => (
        <WeatherPreview key={index} weather={weather} />
      ))}
    </ul>
  );
}
