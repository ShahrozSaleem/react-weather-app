import { COUNTRIES, DEFAULT_TEMP_UNIT, getParsedForecast } from "../../utils/helpers.util";
import { actionTypes } from "../actions";

export const loadingReducer = (state = true, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING:
            return action.payload;
        default:
            return state;
    }
}

export const errorReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.SET_ERROR:
            return action.payload;
        default:
            return state;
    }
}

export const refreshReducer = (state = true, action) => {
    switch (action.type) {
        case actionTypes.SET_REFRESH:
            return action.payload;
        default:
            return state;
    }
}

export const originalResponseReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_ORIGINAL_RESPONSE:
            return { ...action.payload };

        default:
            return state;
    }
}

export const locationReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_LOCATION:
            return {
                city_id: action.payload.id,
                city_name: action.payload.name,
                country_name: COUNTRIES[action.payload.country],
                country_code: action.payload.country,
                population: action.payload.population,
                timezone: action.payload.timezone,
                sunrise: action.payload.sunrise,
                sunset: action.payload.sunset,
                lat: action.payload.coord.lat,
                lon: action.payload.coord.lon
            };

        default:
            return state;
    }
}

export const currentForecastReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_FORECAST:
            return getParsedForecast(
                action.payload.weatherInfo,
                action.payload.tempUnit,
                action.payload.sunrise,
                action.payload.sunset
            );

        default:
            return state;
    }
}

export const dailyForecastReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.SET_DAILY_FORECAST:
            return action.payload.days.map(weatherInfo => {
                return getParsedForecast(
                    weatherInfo,
                    action.payload.tempUnit,
                    action.payload.sunrise,
                    action.payload.sunset
                );
            });

        default:
            return state;
    }
}

export const hourlyForecastReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_HOURLY_FORECAST:
            let forecast = {};
            if (action.payload && action.payload.daysObj && typeof action.payload.daysObj === "object") {
                for (const dayId in action.payload.daysObj) {
                    let hours = action.payload.daysObj[dayId];
                    hours = hours.map(weatherInfo => {
                        return getParsedForecast(
                            weatherInfo,
                            action.payload.tempUnit,
                            action.payload.sunrise,
                            action.payload.sunset
                        );
                    });
                    forecast[dayId] = hours;
                }
            }
            return forecast;

        default:
            return state;
    }
}

export const selectedDayReducer = (state = 0, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_DAY:
            return action.payload

        default:
            return state;
    }
}

export const tempUnitReducer = (state = DEFAULT_TEMP_UNIT, action) => {
    switch (action.type) {
        case actionTypes.SET_TEMP_UNIT:
            return action.payload;

        default:
            return state;
    }
}