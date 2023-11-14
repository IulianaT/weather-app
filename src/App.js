import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import { Loader } from "semantic-ui-react";

const REACT_APP_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const REACT_APP_API_KEY = "72ed9e2bb7a42743f03cc08582259296";
function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [icon, setIcon] = useState("");
  const [forecast, setForecast] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${REACT_APP_API_URL}/?lat=${lat}&lon=${long}&exclude=hourly&units=metric&APPID=${REACT_APP_API_KEY}`
      )
        .then((response) => {
          return response.json();
        })

        .then((weatherData) => {
          setloading(false);
          //console.log(weatherData.list[0]);
          setTemperature(weatherData.list[0].main.temp);
          setHumidity(weatherData.list[0].main.humidity);
          setSunset(weatherData.city.sunset);
          setSunrise(weatherData.city.sunrise);
          setCity(weatherData.city.name);
          setIcon(weatherData.list[0].weather[0].main);
          console.log(weatherData.list);
          setForecast(weatherData.list);
        });
    };
    fetchData();
  }, [lat, long]);
  return (
    <div className="main">
      <Header />
      {loading ? (
        <div>
          <p>Loading..Please Wait</p>
          <Loader active inline="centered" />
        </div>
      ) : (
        <WeatherCard
          temperature={temperature}
          humidity={humidity}
          sunrise={sunrise}
          sunset={sunset}
          city={city}
          icon={icon}
        />
      )}
      <Forecast forecast={forecast} />
    </div>
  );
}

export default App;
