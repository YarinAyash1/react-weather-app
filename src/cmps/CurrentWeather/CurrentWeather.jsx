import React, { Component } from 'react';
import './CurrentWeather.scss';

export function CurrentWeather({ currentWeather }) {
  return (
    <div className="current-weather">
      {currentWeather && (
          <>
              <p>{currentWeather.WeatherText}</p>
              <span>{currentWeather.Temperature.Metric.Value} &#8451;</span>
              <img
                  src={`https://developer.accuweather.com/sites/default/files/0${currentWeather.WeatherIcon}-s.png`}
              />
          </>
      )}

          {/* {currentWeather && currentWeather.map((curr)  => 
              <>{curr.WeatherText} 
                  <img
                  src={`https://developer.accuweather.com/sites/default/files/0${curr.WeatherIcon}-s.png`}
                />
                {curr.Temperature.Metric.Value}
                {curr.Temperature.Metric.Unit}&#176;

              </>
          )} */}
      </div>
  );
}
