import { getMode, getParsedForecast, isUnderLimit } from "./helpers.util";


test('should test helper methods', () => {

    // currentTime, sunrise, sunset => day/night
    expect(getMode(1627743600, 1627703287, 1627757513)).toBe("day");
    expect(getMode(1627754400, 1627703287, 1627757513)).toBe("night");


    const weatherInfo = {
        "dt": 1628121600,
        "main": {
            "temp": 286.3,
            "feels_like": 286.1,
            "temp_min": 286.3,
            "temp_max": 286.3,
            "pressure": 1011,
            "sea_level": 1011,
            "grnd_level": 950,
            "humidity": 93,
            "temp_kf": 0
        },
        "weather": [{
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
        }],
        "clouds": { "all": 100 },
        "wind": {
            "speed": 2.18,
            "deg": 222,
            "gust": 4.01
        },
        "visibility": 10000,
        "pop": 0.74,
        "rain": { "3h": 0.1 },
        "sys": { "pod": "d" },
        "dt_txt": "2021-08-05 00:00:00"
    };
    let tempUnit = "c";
    const sunrise = 1627703287;
    const sunset = 1627757513;

    const output = {
        "date": "Thu 5",
        "time": "12:00 AM",
        "date_time": "Thu 5 12:00 AM",
        "temp": "13",
        "feels_like": "13",
        "temp_min": "13",
        "temp_max": "13",
        "humidity": 93,
        "weather_description": "light rain",
        "weather_id": 500,
        "weather_icon": "/static/media/partly-cloudy-night-rain.6a1e50d9.svg",
        "clouds": 100,
        "wind_speed": 2.18,
        "wind_deg": 222,
        "visibility": 10000,
        "rain": 0.1,
        "sunrise_s": 1627703287,
        "sunset_s": 1627757513,
        "current_time_s": 1628121600,
        "position": 5
    };

    // raw api data => parsed data for components
    expect(
        JSON.stringify(Object.keys(getParsedForecast(weatherInfo, tempUnit, sunrise, sunset)))
    ).toBe(
        JSON.stringify(Object.keys(output))
    );


    expect(isUnderLimit(1627754400000, 1627754400000, 5000)).toBeTruthy();
    expect(isUnderLimit(1627757513000, 1627757513000, 5000)).toBeTruthy();
    expect(isUnderLimit(1627754400000, 1627757513000, 5000)).toBeFalsy()

});
