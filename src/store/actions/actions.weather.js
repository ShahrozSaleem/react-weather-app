import { actionTypes } from "./index";

export const setLoading = (val) => {
    return {
        type: actionTypes.SET_LOADING,
        payload: val
    };
}

export const setError = (val) => {
    return {
        type: actionTypes.SET_ERROR,
        payload: val
    };
}

export const setRefresh = (val) => {
    return {
        type: actionTypes.SET_REFRESH,
        payload: val
    };
}

export const setOriginalRes = (originalRes) => {
    return {
        type: actionTypes.SET_ORIGINAL_RESPONSE,
        payload: originalRes
    };
}

export const setLocation = (city) => {
    return {
        type: actionTypes.SET_LOCATION,
        payload: city
    };
}

export const setCurrentForecast = ({ originalRes, tempUnit }) => {
    return {
        type: actionTypes.SET_CURRENT_FORECAST,
        payload: {
            weatherInfo: originalRes.list[0],
            tempUnit,
            sunrise: originalRes.city.sunrise,
            sunset: originalRes.city.sunset
        }
    };
}

export const setDailyForecast = ({ originalRes, tempUnit }) => {
    return {
        type: actionTypes.SET_DAILY_FORECAST,
        payload: {
            days: [
                originalRes.list.slice(0, 8),
                originalRes.list.slice(8, 16),
                originalRes.list.slice(16, 24),
                originalRes.list.slice(24, 32),
                originalRes.list.slice(32, 40)
            ],
            tempUnit,
            sunrise: originalRes.city.sunrise,
            sunset: originalRes.city.sunset
        }
    };
}

export const setHourlyForecast = ({ originalRes, tempUnit }) => {

    let daysObj = {};
    if (
        originalRes &&
        typeof originalRes === "object" &&
        Object.keys(originalRes).length &&
        originalRes.list &&
        originalRes.list instanceof Array &&
        originalRes.list.length === 40
    ) {
        let i = 0;
        let dayKey = 0;
        for (i; i < 40;) {
            dayKey = originalRes.list[i].dt;
            daysObj[dayKey] = [];
            for (let j = 0; j < 8; j++) {
                daysObj[dayKey].push(
                    originalRes.list[i + j]
                );
            }
            i += 8;
        }
    }

    return {
        type: actionTypes.SET_HOURLY_FORECAST,
        payload: {
            daysObj,
            tempUnit,
            sunrise: originalRes.city.sunrise,
            sunset: originalRes.city.sunset
        }
    };
}

export const setTempUnit = (tempUnit) => {
    return {
        type: actionTypes.SET_TEMP_UNIT,
        payload: tempUnit
    };
}

export const setSelectedDay = (dayId) => {
    return {
        type: actionTypes.SET_SELECTED_DAY,
        payload: dayId
    };
}