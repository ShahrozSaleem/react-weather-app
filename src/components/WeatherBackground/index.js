import React from 'react';
import { useSelector } from 'react-redux';
import { getMode } from '../../utils/helpers.util';
import { getWeatherBackground } from '../../utils/weatherConditions.util';
import "./WeatherBackground.css";

export default function WeatherBackground() {

    const currentForecast = useSelector(state => state.currentForecast);
    let bg = null;

    if (currentForecast != null &&
        typeof currentForecast === "object" &&
        Object.keys(currentForecast).length > 0) {
        bg = getWeatherBackground(
            getMode(
                currentForecast.current_time_s,
                currentForecast.sunrise_s,
                currentForecast.sunset_s
            ),
            currentForecast.weather_id
        )
    }

    return (
        <>
            {
                (currentForecast != null &&
                    typeof currentForecast === "object" &&
                    Object.keys(currentForecast).length > 0) &&
                <div className="weather-bg" data-testid="weather-bg-test">
                    {
                        bg != null &&
                        <img
                            className="weather-bg-img"
                            src={bg}
                            alt="Weather Background"
                        />
                    }
                </div>
            }
        </>
    )
}
