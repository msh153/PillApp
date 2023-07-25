import { combineReducers } from "redux"

const initialState = {
  offset: 0,
  stationAllAtOnce: false,
  stationLanguage: 'ukrainian',
  disabledOffsetButtons: false,
  limit: 10,
  stations: [],
  favoriteStations: [],
  showConfirmationDialog: false,
}

export default combineReducers({
  favoriteStations: favoriteStationsReducer,
});

function favoriteStationsReducer(state = initialState.favoriteStations, action) {
  switch (action.type) {
    case 'ADD_FAV':
      if (!state.favoriteStations)
        return { favoriteStations: [...state, action.payload] }
      return { ...state, favoriteStations: [...state.favoriteStations, action.payload] }
    case 'SET_FAVORITES':
      return { ...state, favoriteStations: action.payload.stations }
    case 'DELETE_FAV':
      return {
        ...state, favoriteStations: state.favoriteStations.filter(item => item.name !== action.payload.name),
      }
    default: return state
  }
}
