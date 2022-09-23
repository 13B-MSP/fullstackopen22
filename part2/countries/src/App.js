import { useState, useEffect } from "react"
import axios from 'axios'

const CountryInfo = ({ country }) =>
  <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital[0]}</div>
    <div>area {country.area}</div>
    <img src={country.flags.png} alt="flag"/>
  </div>

const CountryEntry = ({ country }) => {
  const [show, setShow] = useState(false)
  return <div>
    {(show) ? <CountryInfo country={country}/> : country.name.common}
    <button onClick={() => setShow(!show)}>
      {(show) ? "Hide" : "Show"}
    </button>
  </div>
}

const SearchResult = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches</div>
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]}/>
  } else {
    return <>
      {countries.map(country => <CountryEntry country={country}/>)}
    </>
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const handleSearchChange = event => setSearch(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response => {
        console.log(response.data[0]);
        setCountries(response.data)
      }))
  }, [])

  const countriesFilter = country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())

  return <div>
    <div>
      find countries <input value={search} onChange={handleSearchChange}/>
    </div>
    <SearchResult countries={countries.filter(countriesFilter)} />
  </div>
}

export default App;
