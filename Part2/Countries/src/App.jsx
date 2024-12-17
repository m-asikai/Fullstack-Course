import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(res => {
        setCountries(res.data);
        setFilteredCountries(res.data);
      })
  }, [])

  const filterInput = (e) => {
    const input = e.target.value;
    setFilter(input);
    const filtered = countries.filter(country => 
      country.name.common
      .toLowerCase()
      .startsWith(input.toLowerCase())
    );
    setFilteredCountries(filtered);
  }

 

  return (
    <div>
        <form>
        <div>
          Find countries: <input onChange={filterInput} />
        </div>
      </form>
      <div>
        {(() => {
          console.log("a")
        })()}
      </div>
      <div>
        {(() => {
          if (filteredCountries.length > 10) {
            return <p>Too many matches.</p>
          }
          else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
            return filteredCountries.map(country => 
              <p key={country.name.common}>
                {country.name.common}
              </p>
            );
          }
          else if (filteredCountries.length === 1) {
            const country = filteredCountries[0];
            console.log(country);
            return (
              <div>
                <h2>{country.name.common}</h2>
                <p>{country.capital}</p>
                <p>{country.population}</p>
                <ul>
                  {   
                    Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)
                  }
                </ul>
                <img src={`${country.flags.png}`}></img>
              </div>
            )
          }
        })()}
      </div>
    </div>
  )
}

export default App