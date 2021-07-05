const INITIAL_STATE = {
  weather: [],
  currentWeather: null,
  city: null,
  favorites: []
}

export function weatherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_WEATHER':
      return {
        ...state,
        weather: action.weather
      };
    case 'SET_CURRENT_WEATHER':
      return {
        ...state,
        currentWeather: action.currentWeather
      };
    case 'SET_CITY':
      return {
        ...state,
        city: action.city
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.favorites
      };
    default:
      return state;
  }
}