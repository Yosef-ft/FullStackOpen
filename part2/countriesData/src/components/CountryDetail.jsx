import { useState,useEffect } from "react";
import axios from "axios";

const CountryDetail = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
      axios
        .get('https://api.openweathermap.org/data/2.5/weather', {
          params : {
            q: country.name.common,
            appid: import.meta.env.VITE_SOME_KEY,
            units: 'metric'
          },
        })
        .then((response) => {
          setWeather(response.data)
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }, [country, import.meta.env.VITE_API_KEY]);
  
    if (weather) {
  
      return (
        <div>
          <h1>{country.name.official}</h1>
          <p>capital: {country.capital[0]}</p>
          <p>area: {country.area}</p>
          <h2>languages:</h2>
          <ul>
            {Object.values(country.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.svg} alt={country.flags.alt} width="300" />
          <h2><strong>Weather in {country.capital}</strong></h2>
          <p>temperature: {weather.main.temp} Celcius</p>
          <img src={ `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>wind: {weather.wind.speed} m/s</p>
        </div>
      );
    }

    return (<p>Loading weather data</p>)
}  


export default CountryDetail;