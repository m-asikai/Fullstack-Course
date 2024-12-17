import Icon from "./Icon";

const Weather = ({ weather }) => {
    if (!weather) return null;
    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <Icon icon={weather.weather[0].icon}/>
            <p>{`Temperature: ${weather.main.temp - 273.15}`}</p>
            <p>{`Wind speed: ${weather.wind.speed} m/s.`}</p>
        </div>
    )
}

export default Weather;