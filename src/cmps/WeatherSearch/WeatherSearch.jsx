import React, { useState, useEffect } from 'react';
import { weatherService } from '../../services/weatherService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './WeatherSearch.scss';

export function WeatherSearch(){
  const [autoComplete, setAutoComplete] = useState(null);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadAutoComplete = async () => {
      const res = await weatherService.getLocationAutoComplete();
      setAutoComplete(res);
    } 
    loadAutoComplete();
  }, [])
  
  const onChangeHandler = async (text) =>{
    var letters = /^[a-zA-Z\s]*$/;
    if(!text.match(letters)){
      toast.warn('It must be English letters only');
      return;
    } else {
      let matches = [];
      if(text.length > 0){
        matches = autoComplete.filter(acmplt => {
          const regex = new RegExp(`${text}`, 'gi');
          return acmplt.LocalizedName.match(regex);
         })
      }
      setSuggestions(matches);
      setText(text); 
    }
  }

  const onSelectedCityHandler = (text) => {
    setText(text);
    weatherService.getLocationAutoComplete(text)
    setSuggestions([]);
  }

  return (  
    <form className="weather-search">
      <input
        type="text"
        className="weather-search-input"
        onChange={e => onChangeHandler(e.target.value)}
        value={text}
        placeholder="Type city"
      />
      <div className="suggestion-list">
        {suggestions && suggestions.map((suggestion, i) => 
          <div key={i} className="suggestion-list-item" onClick={() => onSelectedCityHandler(suggestion.LocalizedName)}>{suggestion.LocalizedName}</div>
        )}
      </div>
    </form>
  );
}
