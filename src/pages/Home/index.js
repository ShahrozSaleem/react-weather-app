import React, { useEffect } from "react";
import {
    Container,
    Typography,
    IconButton
} from "@material-ui/core";
import {
    useDispatch,
    useSelector
} from "react-redux";
import "./Home.css";
import Slider from "../../components/Slider";
import WeatherReport from "../../components/WeatherReport";
import WeatherBackground from "../../components/WeatherBackground";
import convert from "../../utils/conversions.util";
import {
    getWeatherIcon
} from "../../utils/weatherConditions.util";
import {
    getMode,
    TEMP_UNITS
} from "../../utils/helpers.util";
import {
    setCurrentForecast,
    setDailyForecast,
    setHourlyForecast,
    setRefresh,
    setTempUnit
} from "../../store/actions/actions.weather";


export default function Home() {

    const dispatch = useDispatch();

    const tempUnit = useSelector(state => state.tempUnit);
    const locationInfo = useSelector(state => state.location);
    const currentForecast = useSelector(state => state.currentForecast);
    const originalRes = useSelector(state => state.originalRes);

    useEffect(() => {
        if (originalRes &&
            typeof originalRes === "object" &&
            !(originalRes instanceof Array) &&
            Object.keys(originalRes).length
        ) {
            dispatch(setCurrentForecast({
                originalRes,
                tempUnit
            }));
            dispatch(setDailyForecast({
                originalRes,
                tempUnit
            }));
            dispatch(setHourlyForecast({
                originalRes,
                tempUnit
            }));
        }
    }, [dispatch, tempUnit, originalRes]);

    function refresh() {
        dispatch(setRefresh(true));
    }

    function resetLocation() {
        localStorage.removeItem("coords");
        refresh();
    }

    function updateTempUnit(unit) {
        window.localStorage.setItem("TEMP_UNIT", unit);
        dispatch(setTempUnit(unit));
    }

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                if (lat && lon) {
                    localStorage.setItem("coords", JSON.stringify({
                        lat,
                        lon
                    }));
                }

                refresh();
            },
            error => {
                console.error(error);
                alert("Unable to get location \n" + error.message || '');
            }
        );
    }


    return (
        <>
            <WeatherBackground />
            <Container fixed data-testid="home-test">
                {
                    (currentForecast != null &&
                        typeof currentForecast === "object" &&
                        Object.keys(currentForecast).length > 0) &&

                    <header className="header">
                        <Typography variant="h5" gutterBottom>
                            {locationInfo.city_name + ", " + locationInfo.country_name}
                        </Typography>
                        <div className="current-temp">
                            <div className="current-weather-icon">
                                <img
                                    src={
                                        getWeatherIcon(
                                            getMode(
                                                currentForecast.current_time_s,
                                                currentForecast.sunrise_s,
                                                currentForecast.sunset_s
                                            ),
                                            currentForecast.weather_id
                                        )
                                    }
                                    alt="Weather condition"
                                />
                            </div>
                            <Typography variant="h2">
                                {currentForecast.temp}&deg;
                            </Typography>
                            <div className="temp-units">
                                <IconButton color="primary" aria-label="upload picture" component="span" size="small" onClick={() => updateTempUnit(TEMP_UNITS.CELCIUS)}>
                                    <span className={`temp-unit ${tempUnit === TEMP_UNITS.CELCIUS ? 'selected-unit' : ''}`} >
                                        C
                                    </span>
                                </IconButton>
                                <IconButton color="primary" aria-label="upload picture" component="span" size="small" onClick={() => updateTempUnit(TEMP_UNITS.FARENHEIT)}>
                                    <span className={`temp-unit ${tempUnit === TEMP_UNITS.FARENHEIT ? 'selected-unit' : ''}`} >
                                        F
                                    </span>
                                </IconButton>
                            </div>
                        </div>
                        <Typography variant="h6" gutterBottom className="weather-description">
                            {currentForecast.weather_description}
                        </Typography>
                        <div className="fetch-actions">
                            <IconButton title="Reset Location" color="primary" aria-label="upload picture" className="fetch-action" component="span" size="small" onClick={resetLocation}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z" />
                                </svg>
                            </IconButton>

                            <IconButton title="User Current Location" color="primary" aria-label="upload picture" className="fetch-action" component="span" size="small" onClick={getCurrentLocation}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                                </svg>
                            </IconButton>

                            <IconButton title="Refresh Weather Data" color="primary" aria-label="upload picture" className="fetch-action" component="span" size="small" onClick={refresh}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
                                </svg>
                            </IconButton>
                        </div>
                        <div className="weather-details">
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Feels Like:
                                </span>
                                {currentForecast.feels_like}&deg;
                            </div>
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Min Temperature:
                                </span>
                                {currentForecast.temp_min}&deg;
                            </div>
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Max Temperature:
                                </span>
                                {currentForecast.temp_max}&deg;
                            </div>
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Date:
                                </span>
                                {currentForecast.date}
                            </div>
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Time:
                                </span>
                                {currentForecast.time}
                            </div>
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Humidity:
                                </span>
                                {currentForecast.humidity} %
                            </div>
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Clouds:
                                </span>
                                {currentForecast.clouds} %
                            </div>
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Wind Speed:
                                </span>
                                {currentForecast.wind_speed} m/s
                            </div>
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Visibility:
                                </span>
                                {convert.toKilometer(currentForecast.visibility)} km
                            </div>
                            <div className="weather-detail">
                                <span className="weather-detail-bold">
                                    Rain:
                                </span>
                                {currentForecast.rain} mm
                            </div>
                        </div>
                    </header>
                }
                <main className="main">

                    <section>
                        <Slider />
                    </section>

                    <section className="hourly-graph">
                        <WeatherReport />
                    </section>

                </main>
            </Container>
        </>
    )
}
