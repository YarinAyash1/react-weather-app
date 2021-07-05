import { weatherService } from '../../services/weatherService';

// Action Dispatcher
export function loadWeather() {
  return async dispatch => {
    const weather = await weatherService.getWeather();
    dispatch({ type: 'SET_WEATHER', weather });
  }
}

export function loadCurrentWeather() {
  return async dispatch => {
    const currentWeather = await weatherService.getCurrentWeather();
    dispatch({ type: 'SET_CURRENT_WEATHER', currentWeather });
  }
}

export function loadCity() {
  return async dispatch => {
    const city = await weatherService.getCity();
    dispatch({ type: 'SET_CITY', city });
  }
}

export function loadFavorites() {
  return async dispatch => {
    const favorites = await weatherService.getFavorites();
    dispatch({ type: 'SET_FAVORITES', favorites });
  }
}