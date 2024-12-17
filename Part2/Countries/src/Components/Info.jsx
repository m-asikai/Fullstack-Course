const Info = ({pressed, country}) => {
    if (!pressed) {
        return null;
    }
    return (
        <div>
        <h2>{country.name.common}</h2>
        <p>{country.capital}</p>
        <p>{'Population: ' + country.population + '.'}</p>
        <ul>
            {   
            Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)
            }
        </ul>
        <img src={`${country.flags.png}`}></img>
        </div>
        )
}

export default Info;