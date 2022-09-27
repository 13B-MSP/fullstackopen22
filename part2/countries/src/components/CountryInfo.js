import CapitalWeather from "./CapitalWeather"

const CountryInfo = ({ country }) => {
    const capital = country.capital[0]
    const [lat, lng] = country.capitalInfo.latlng
  
    return <div>
      <h2>{country.name.common}</h2>
      <div>capital {capital}</div>
      <div>area {country.area}</div>
      <ul>
        {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag"/>
      <CapitalWeather name={capital} lat={lat} lng={lng}/>
    </div>
  }

export default CountryInfo