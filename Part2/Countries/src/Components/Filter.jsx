const Filter = ({ filteredCountries }) => {
    if (filteredCountries.length === 1) {
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

    if (filteredCountries.length < 10) {
        return filteredCountries.map(country => 
          <p key={country.name.common}>
            {country.name.common}
          </p>
        );
      }

    return <p>Too many matches.</p>
    



}

export default Filter;