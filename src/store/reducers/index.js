import { combineReducers } from "redux";
import {
    errorReducer,
    loadingReducer,
    refreshReducer,
    originalResponseReducer,
    currentForecastReducer,
    dailyForecastReducer,
    hourlyForecastReducer,
    selectedDayReducer,
    tempUnitReducer,
    locationReducer
} from "./reducers.weather";


const appReducers = combineReducers({
    error: errorReducer,
    loading: loadingReducer,
    refresh: refreshReducer,
    originalRes: originalResponseReducer,
    currentForecast: currentForecastReducer,
    dailyForecast: dailyForecastReducer,
    hourlyForecast: hourlyForecastReducer,
    selectedDay: selectedDayReducer,
    tempUnit: tempUnitReducer,
    location: locationReducer
});


export default appReducers;