import axios from "axios";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "../utils/helpers.util";

function fetchWeatherData(lat = DEFAULT_LATITUDE, lon = DEFAULT_LONGITUDE) {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&cnt=40`;
    return axios.get(URL);
}

const weatherApi = Object.seal({
    fetchWeatherData
});

export default weatherApi;