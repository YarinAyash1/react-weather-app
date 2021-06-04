import { storageService } from './storageService.js';
// import { makeId } from './utilService.js';
import axios from 'axios';

const API_KEY = 'Z6TLFh3VmH4lCVywwcFFNhAEXVjNuOAg';
const STORAGE_KEY = 'weather_DB';
const CURRENT_STORAGE_KEY = 'currentWeather_DB';
const FAVORITES_KEY = 'favorites_DB';
const AUTOCOMPLETE_KEY = 'autocomplete_DB';
const gFavorites = [];

export const weatherService = {
  getWeather,
  getCurrentWeather,
  favoritesList,
  getFavorites,
  getLocationAutoComplete
}

function favoritesList(favoriteToAdd){
  gFavorites.push(favoriteToAdd)
  console.log('favorites', gFavorites)
  storageService.store(FAVORITES_KEY, gFavorites)
}

function getFavorites(){
  return gFavorites;
}

async function getWeather() {
  try {
    const weatherFromStorage = storageService.load(STORAGE_KEY)
    if (weatherFromStorage) {
      return weatherFromStorage;
    } else {
      const weatherRes = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${API_KEY}`);
      storageService.store(STORAGE_KEY, weatherRes.data.DailyForecasts)
      return weatherRes.data.DailyForecasts;
    }
  } catch (err) {
    console.log('Cannot get weather', err);
  }
}

async function getLocationAutoComplete(location) {
  console.log('location autoooooooo', location)
  // try {
  //   // const autoCompleteFromStorage = storageService.load(AUTOCOMPLETE_KEY)
  //   // if (autoCompleteFromStorage) {
  //   //   return autoCompleteFromStorage;
  //   // } else {
  //     const autocompleteRes = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${location}`);
  //     console.log('autocompleteRes', autocompleteRes)

  //     //storageService.store(AUTOCOMPLETE_KEY, autocompleteRes)
  //     return autocompleteRes;
  //   //}
  // } catch (err) {
  //   console.log('Cannot get by auto complete', err);
  // }
}
getLocationAutoComplete()
async function getCurrentWeather() {
  try {
    const currentWeatherFromStorage = storageService.load(CURRENT_STORAGE_KEY)
    if (currentWeatherFromStorage) {
      return currentWeatherFromStorage;
    } else {
      const currentWeatherRes = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${API_KEY}`);
      storageService.store(CURRENT_STORAGE_KEY, currentWeatherRes.data[0])
      return currentWeatherRes.data[0];
    }
  } catch (err) {
    console.log('Cannot get current weather', err);
  }
}

