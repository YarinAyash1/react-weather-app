import { storageService } from './storageService.js';
// import { makeId } from './utilService.js';
import axios from 'axios';

const API_KEY = 'Z6TLFh3VmH4lCVywwcFFNhAEXVjNuOAg';
const STORAGE_KEY = 'weather_DB';
const CURRENT_STORAGE_KEY = 'currentWeather_DB';
const FAVORITES_KEY = 'favorites_DB';
const AUTOCOMPLETE_KEY = 'autocomplete_DB';
const CITY_KEY = 'city_DB';
const KEY_OF_THE_CITYNAME = 'keyofthecityname_DB';
const gFavorites = [];
const gDefaultCity = 'jerusalem';

export const weatherService = {
  getWeather,
  getCurrentWeather,
  favoritesList,
  getFavorites,
  getLocationAutoComplete,
  getCity,
  getKeyByCityName,
}

function favoritesList(favoriteToAdd) {
  gFavorites.push(favoriteToAdd)
  console.log('favorites', gFavorites)
  storageService.store(FAVORITES_KEY, gFavorites)
}

function getFavorites() {
  return gFavorites;
}

async function getWeather() {
  const cityKey = await getKeyByCityName()
  try {
    const weatherFromStorage = storageService.load(STORAGE_KEY)
    if (weatherFromStorage) {
      return weatherFromStorage;
    } else {
      const weatherRes = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=true`);
      storageService.store(STORAGE_KEY, weatherRes.data.DailyForecasts)
      return weatherRes.data.DailyForecasts;
    }
  } catch (err) {
    console.log('Cannot get weather', err);
  }
}

async function getCity() {
  const cityName = gDefaultCity;
  try {
    const cityFromStorage = storageService.load(CITY_KEY)
    if (cityFromStorage) {
      return cityFromStorage;
    } else {
      const cityRes = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityName}`);
      storageService.store(CITY_KEY, cityRes.data[0])
      return cityRes.data[0];
    }
  } catch (err) {
    console.log('Cannot get city', err);
  }
}

async function getKeyByCityName(cityName = gDefaultCity) {
  try {
    var keyByCityNameFromStorage = storageService.load(KEY_OF_THE_CITYNAME)
    if (keyByCityNameFromStorage) {
      var res = keyByCityNameFromStorage.filter(item => {
        return item.cityName === cityName;
      })
      if (res.length > 0) {
        var cityKey = res[0].cityKey
        return cityKey
      }
    } else {
      keyByCityNameFromStorage = []
    }
    const cityRes = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityName}`);
    const cityNameByKey = { cityName: cityName, cityKey: cityRes.data[0].Key }
    keyByCityNameFromStorage.push(cityNameByKey)
    storageService.store(KEY_OF_THE_CITYNAME, keyByCityNameFromStorage)
    return cityRes.data[0].Key;

  } catch (err) {
    console.log('Cannot get key by city name', err);
  }
}

async function getLocationAutoComplete(location) {
  //console.log('auto complete from server:', location)
  try {
    const autoCompleteFromStorage = storageService.load(AUTOCOMPLETE_KEY)
    //console.log('autoCompleteFromStorage', autoCompleteFromStorage)
    if (autoCompleteFromStorage) {
      return autoCompleteFromStorage;
    } else {
      const autocompleteRes = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=haifa`);
      //console.log('autocompleteRes', autocompleteRes.data)

      storageService.store(AUTOCOMPLETE_KEY, autocompleteRes.data)
      return autocompleteRes.data;
    }
  } catch (err) {
    console.log('Cannot get by auto complete', err);
  }
}

async function getCurrentWeather() {
  const cityKey = await getKeyByCityName()
  try {
    const currentWeatherFromStorage = storageService.load(CURRENT_STORAGE_KEY)
    if (currentWeatherFromStorage) {
      return currentWeatherFromStorage;
    } else {
      const currentWeatherRes = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`);
      storageService.store(CURRENT_STORAGE_KEY, currentWeatherRes.data[0])
      return currentWeatherRes.data[0];
    }
  } catch (err) {
    console.log('Cannot get current weather', err);
  }
}

