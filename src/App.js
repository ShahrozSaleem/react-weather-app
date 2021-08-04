import { useEffect } from 'react';
import { weatherApi } from "./apis";
import Home from './pages/Home';
import './App.css';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  setCurrentForecast,
  setDailyForecast,
  setError,
  setHourlyForecast,
  setLoading,
  setLocation,
  setOriginalRes,
  setRefresh,
  setSelectedDay,
  setTempUnit
} from './store/actions/actions.weather';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_TEMP_UNIT,
  FETCH_LIMIT,
  isUnderLimit
} from './utils/helpers.util';
import SplashScreen from './pages/SplashScreen';
import Error from './pages/Error';

function App() {

  const dispatch = useDispatch();
  const tempUnit = useSelector(state => state.tempUnit);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const refresh = useSelector(state => state.refresh);

  useEffect(() => {
    let tempUnit = window.localStorage.getItem("TEMP_UNIT");
    if (tempUnit === null) {
      tempUnit = DEFAULT_TEMP_UNIT;
      window.localStorage.setItem("TEMP_UNIT", tempUnit);
    }
    dispatch(setTempUnit(tempUnit));
  });

  useEffect(() => {
    if (refresh) {
      function getWeatherInfo(tempUnit) {
        dispatch(setError(false));
        dispatch(setLoading(true));

        let prev = localStorage.getItem("WEATHER_INFO");
        if (prev) {
          prev = JSON.parse(prev);
          if (prev.hasOwnProperty("data") && prev.data && prev.hasOwnProperty("created") && prev.created) {
            if (isUnderLimit(prev.created, new Date().valueOf(), FETCH_LIMIT))
              populateAppData(prev.data, tempUnit);
            else
              fetchWeatherData(tempUnit);
          } else
            fetchWeatherData(tempUnit);
        } else
          fetchWeatherData(tempUnit);
      }

      function fetchWeatherData(tempUnit) {
        let lat = DEFAULT_LATITUDE;
        let lon = DEFAULT_LONGITUDE;
        let coords = localStorage.getItem("coords");
        if (coords) {
          coords = JSON.parse(coords);
          if (coords.lat && coords.lon) {
            lat = coords.lat;
            lon = coords.lon;
          }
        }

        weatherApi.fetchWeatherData(lat, lon)
          .then(res => {
            if (res && res.data) {
              localStorage.setItem("WEATHER_INFO", JSON.stringify({
                created: new Date().valueOf(),
                data: res.data
              }));
              populateAppData(res.data, tempUnit);
            } else {
              console.error("Unable to fetch weather data");
              dispatch(setError(true));
              dispatch(setLoading(false));
            }
          })
          .catch(error => {
            console.error(error);
            dispatch(setError(true));
            dispatch(setLoading(false));
          });
      }

      function populateAppData(data, tempUnit) {

        dispatch(setOriginalRes(data));
        dispatch(setLocation(data.city));

        dispatch(setCurrentForecast({
          originalRes: data,
          tempUnit
        }));
        dispatch(setDailyForecast({
          originalRes: data,
          tempUnit
        }));
        dispatch(setHourlyForecast({
          originalRes: data,
          tempUnit
        }));

        dispatch(setSelectedDay(data.list[0].dt));

        dispatch(setError(false));
        dispatch(setLoading(false));
      }

      getWeatherInfo(tempUnit);
      dispatch(setRefresh(false));
    }
  }, [dispatch, refresh, tempUnit]);


  return (
    <div className="app" data-testid="app-test">
      {
        loading ? <SplashScreen /> : (error ? <Error /> : <Home />)
      }
    </div>
  );
}

export default App;
