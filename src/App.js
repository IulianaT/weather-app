import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";

const REACT_APP_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const REACT_APP_API_KEY = "72ed9e2bb7a42743f03cc08582259296";
function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [icon, setIcon] = useState('');
  //const [forcast, setForecast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${REACT_APP_API_URL}/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`
      )
        .then((response) => {
          return response.json();
        })

        .then((weatherData) => {
          console.log(weatherData);
          setTemperature(weatherData.main.temp);
          setHumidity(weatherData.main.humidity);
          setSunset(weatherData.sys.sunset);
          setSunrise(weatherData.sys.sunrise);
          setCity(weatherData.name);
          setIcon(weatherData.weather[0].main)
          //setForecast(weatherData.data.daily)
        });
    };
    fetchData();
  }, [lat, long]);
  return (
    <div className="main">
      <Header />
      <WeatherCard
        temperature={temperature}
        humidity={humidity}
        sunrise={sunrise}
        sunset={sunset}
        city={city}
      />
    </div>
  );
}

export default App;
