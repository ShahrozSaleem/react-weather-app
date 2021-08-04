import notAvailable from "../assets/weatherIcons/not-available.svg";

import clearDay from "../assets/weatherIcons/clear-day.svg";
import clearNight from "../assets/weatherIcons/clear-night.svg";

import thunderstormsDay from "../assets/weatherIcons/thunderstorms-day.svg";
import thunderstormsNight from "../assets/weatherIcons/thunderstorms-night.svg";
import thunderstormsDayRain from "../assets/weatherIcons/thunderstorms-day-rain.svg";
import thunderstormsNightRain from "../assets/weatherIcons/thunderstorms-night-rain.svg";
import thunderstorms from "../assets/weatherIcons/thunderstorms.svg";
import thunderstormsRain from "../assets/weatherIcons/thunderstorms-rain.svg";

import partlyCloudyDayDrizzle from "../assets/weatherIcons/partly-cloudy-day-drizzle.svg";
import partlyCloudyNightDrizzle from "../assets/weatherIcons/partly-cloudy-night-drizzle.svg";

import partlyCloudyDayRain from "../assets/weatherIcons/partly-cloudy-day-rain.svg";
import partlyCloudyNightRain from "../assets/weatherIcons/partly-cloudy-night-rain.svg";

import partlyCloudyDaySnow from "../assets/weatherIcons/partly-cloudy-day-snow.svg";
import partlyCloudyNightSnow from "../assets/weatherIcons/partly-cloudy-night-snow.svg";

import mist from "../assets/weatherIcons/mist.svg";
import smoke from "../assets/weatherIcons/smoke.svg";
import hazeDay from "../assets/weatherIcons/haze-day.svg";
import hazeNight from "../assets/weatherIcons/haze-night.svg";
import dustWind from "../assets/weatherIcons/dust-wind.svg";
import fog from "../assets/weatherIcons/fog.svg";
import dustDay from "../assets/weatherIcons/dust-day.svg";
import dustNight from "../assets/weatherIcons/dust-night.svg";
import wind from "../assets/weatherIcons/wind.svg";
import tornado from "../assets/weatherIcons/tornado.svg";

import partlyCloudyDay from "../assets/weatherIcons/partly-cloudy-day.svg";
import partlyCloudyNight from "../assets/weatherIcons/partly-cloudy-night.svg";
import overcast from "../assets/weatherIcons/overcast.svg";


import clearDayBg from "../assets/images/clearDay.jpg";
import clearNightBg from "../assets/images/clearNight.jpg";
import cloudyDayBg from "../assets/images/cloudyDay.jpg";
import cloudyNightBg from "../assets/images/cloudyNight.jpg";
import drizzleBg from "../assets/images/drizzle.jpg";
import fogBg from "../assets/images/fog.jpg";
import rainBg from "../assets/images/rain.jpg";
import snowBg from "../assets/images/snow.jpg";
import thunderstormBg from "../assets/images/thunderstorm.jpg";
import tornadoBg from "../assets/images/tornado.jpg";
import windyBg from "../assets/images/windy.jpg";


const MODE = Object.seal({
    DAY: "day",
    NIGHT: "night"
});


function getWeatherIcon(mode, id) {
    const isDay = mode === MODE.DAY;
    let icon;

    switch (true) {
        case id >= 200 && id < 300:
            //Thunderstorm
            if (id === 200 || id === 201 || id === 202)
                icon = isDay ? thunderstormsDayRain : thunderstormsNightRain;
            else if (id === 210 || id === 211 || id === 212)
                icon = isDay ? thunderstormsDay : thunderstormsNight;
            else if (id === 221)
                icon = thunderstorms;
            else if (id === 230 || id === 231 || id === 232)
                icon = thunderstormsRain;
            else
                icon = isDay ? thunderstormsDay : thunderstormsNight;
            break;
        case id >= 300 && id < 400:
            // Drizzle
            icon = isDay ? partlyCloudyDayDrizzle : partlyCloudyNightDrizzle;
            break;
        case id >= 500 && id < 600:
            // Rain
            icon = isDay ? partlyCloudyDayRain : partlyCloudyNightRain;
            break;
        case id >= 600 && id < 700:
            //Snow
            icon = isDay ? partlyCloudyDaySnow : partlyCloudyNightSnow;
            break;
        case id >= 700 && id < 800:
            // Atmosphere
            if (id === 701)
                icon = mist;
            else if (id === 711)
                icon = smoke;
            else if (id === 721)
                icon = isDay ? hazeDay : hazeNight;
            else if (id === 731)
                icon = dustWind;
            else if (id === 741)
                icon = fog;
            else if (id === 751 || id === 761 || id === 762)
                icon = isDay ? dustDay : dustNight;
            else if (id === 771)
                icon = wind;
            else if (id === 781)
                icon = tornado;
            else
                icon = isDay ? hazeDay : hazeNight;
            break;
        case id === 800:
            icon = isDay ? clearDay : clearNight;
            break;
        case id > 800 && id < 810:
            if (id === 801 || id === 802)
                icon = isDay ? partlyCloudyDay : partlyCloudyNight;
            else
                icon = overcast;
            break;
        case id === 0:
            icon = notAvailable;
            break;
        default:
            icon = notAvailable;
            break;
    }

    return icon;
}

function getWeatherBackground(mode, id) {
    const isDay = mode === MODE.DAY;
    let bg = null;
    switch (true) {
        case id >= 200 && id < 300:
            //Thunderstorm
            bg = thunderstormBg;
            break;
        case id >= 300 && id < 400:
            // Drizzle
            bg = drizzleBg;
            break;
        case id >= 500 && id < 600:
            // Rain
            bg = rainBg;
            break;
        case id >= 600 && id < 700:
            //Snow
            bg = snowBg;
            break;
        case id >= 700 && id < 800:
            // Atmosphere
            if (id === 771)
                bg = windyBg;
            else if (id === 781)
                bg = tornadoBg;
            else
                bg = fogBg;
            break;
        case id === 800:
            bg = isDay ? clearDayBg : clearNightBg;
            break;
        case id > 800 && id < 810:
            bg = isDay ? cloudyDayBg : cloudyNightBg;
            break;
        default:
            break;
    }
    return bg;
}

export {
    MODE,
    getWeatherIcon,
    getWeatherBackground
}