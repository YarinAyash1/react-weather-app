import React from 'react';
import './CityPreview.scss';

export function CityPreview({ city }) {
  return (
    <div className="city-preview">
      <p>{city.LocalizedName}, {city.Country.ID}</p>
    </div>
  );
}
