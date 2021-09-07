import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import "./WeatherCard.css";
import { getWeatherIcon } from "../../utils/weatherConditions.util";
import { getMode } from '../../utils/helpers.util';
import { useDispatch } from 'react-redux';
import { setSelectedDay } from '../../store/actions/actions.weather';

export default function WeatherCard({ forecast, selectedItem, setSelectedItem }) {

    const dispatch = useDispatch();


    useEffect(() => {
        if (selectedItem == forecast.date && forecast && typeof forecast === "object" && Object.keys(forecast).length && forecast.current_time_s) {
            dispatch(setSelectedDay(forecast.current_time_s));
        }
    }, [selectedItem])

    function updateHourlyForecast() {
        if (forecast && typeof forecast === "object" && Object.keys(forecast).length && forecast.current_time_s) {
            dispatch(setSelectedDay(forecast.current_time_s));
        }
        setSelectedItem(forecast.date);
    }

    return (
        <>
            <div className="weather-card" className={selectedItem == forecast.date ? 'active-item' : ''} onClick={updateHourlyForecast} data-testid="weather-card-test">
                {
                    (forecast != null && typeof forecast === "object" && Object.keys(forecast).length > 0) &&
                    <>
                        <Typography variant="h6" className="date-info">
                            {forecast.date}
                        </Typography>
                        <div className="weather-icon">
                            <img
                                src={
                                    getWeatherIcon(
                                        getMode(
                                            forecast.current_time_s,
                                            forecast.sunrise_s,
                                            forecast.sunset_s
                                        ),
                                        forecast.weather_id
                                    )
                                }
                                alt="Weather condition"
                            />
                        </div>
                        <Typography variant="caption" display="block" gutterBottom className="weather-title">
                            {forecast.weather_description}
                        </Typography>
                        <Typography variant="h4" className="temperature">
                            {forecast.temp}&deg;
                        </Typography>
                        <div className="min-max-temp">
                            <div className="temp-item">
                                <span className="temp-direction">
                                    &#8595;
                                </span>
                                {forecast.temp_min}&deg;
                            </div>
                            <div className="temp-item">
                                <span className="temp-direction">&#8593;
                                </span>
                                {forecast.temp_max}&deg;
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}