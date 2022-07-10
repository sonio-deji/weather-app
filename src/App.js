import './App.css';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/weatherServicees';
import { useState, useEffect } from 'react';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [query, setquery] = useState({q: 'lagos'});
  const [units, setunits] = useState('metric');
  const [weather, setweather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.';
      toast.info(`Fetching weather for ${message}`)
        await getFormattedWeatherData({...query, units}).then((data) => {
          toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        setweather(data)
      })
    }
    fetchWeather();
  }, [query, units])
  
  const formatBackground = () => {
    if(!weather) return 'from-cyan-700 to-blue-700'
    const thresold = units === 'metric' ? 20 : 60;
    if (weather.temp <= thresold) {
      return 'from-cyan-700 to-blue-700'
    }
    return 'from-yellow-700 to-orange-700'
  }
  return (
    <div className={`mx-auto max-w-screen-md py-5 px-1 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()} `}>
      <TopButtons setquery={setquery} />
      <Inputs setquery={setquery} units={units} setunits={setunits}/>
      {weather && (
      <>
      <TimeAndLocation weather={weather} />
      <TemperatureAndDetails weather={weather} />
      <Forecast title={'hourly forecast'} items={weather.hourly} />
      <Forecast title={'daily forecast'}  items={weather.daily}/>
      </>
      )

      }
      <ToastContainer autoClose={5000} theme={'colored'} newestOnTop={true} />
    </div>
  );
}

export default App;
