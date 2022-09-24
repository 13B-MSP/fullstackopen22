import { useState, useEffect } from "react"

import axios from "axios"

const CapitalWeather = ({ name, lat, lng }) => {
    const [weather, setWeather] = useState({})
    const apiKey = process.env.REACT_APP_API_KEY
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
        .then(response => {
          console.log('weather received');
          setWeather(response.data)
      })
    }, [lat, lng, apiKey])
    if (weather.main !== undefined) {
      return <>
        <h2>Weather in {name}</h2>
        <div>temp {weather.main.temp} celsius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weathericon"/>
        <div>wind {weather.wind.speed} m/s</div>
      </>
    } else {
      <>
        Loading...
      </>
    }
  }

  export default CapitalWeather