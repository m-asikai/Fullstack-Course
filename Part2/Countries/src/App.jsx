import { useEffect, useState } from 'react';
import axios from 'axios';

import Filter from './Components/Filter';

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
      .includes(input.toLowerCase())
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
        <Filter filteredCountries={filteredCountries}/>
      </div>
    </div>
  )
}

export default App