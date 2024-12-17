import { useEffect, useState } from "react";
import axios from "axios";


import Weather from "./Weather";
import Info from "./Info";

const Button = ({ country }) => {
  const [pressed, setPressed] = useState(false);
    return (
      <div>
        <button onClick={() => setPressed(!pressed)}>Info</button>
        <Info pressed={pressed} country={country}></Info>
      </div>
    )
}

const Filter = ({ filteredCountries}) => {
  const [weather, setWeather] = useState(null);
  const [country, setCountry] = useState(null)

  const API_KEY = import.meta.env.VITE_API_KEY
  
  useEffect(() => {
    if (!country) return;
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_KEY}`)
      .then(res => {
        const w = res.data;
        console.log(w);
        setWeather(res.data)
    })
  },[country])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0]);
    }
  }, [filteredCountries]);


  
  if (filteredCountries.length === 1) {
      const countryf = filteredCountries[0];
      return (
          <div>
          <h2>{countryf.name.common}</h2>
          <p>{countryf.capital}</p>
          <p>{'Population: ' + countryf.population + '.'}</p>
          <ul>
              {   
              Object.values(countryf.languages).map(lang => <li key={lang}>{lang}</li>)
              }
          </ul>
          <img src={`${countryf.flags.png}`}></img>
          <Weather weather={weather} />
          </div>
          )
  }

  if (filteredCountries.length < 10) {
    return filteredCountries.map(country =>
      <div key={`${country.cca2}`}> 
        <p key={country.name.common}>
          {country.name.common}
        </p>
        <Button country={country}/>
      </div>
    );
  }

  return <p>Too many matches.</p>
}

export default Filter;