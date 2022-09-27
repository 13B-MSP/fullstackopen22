import SearchResult from "./components/SearchResult"

import { useState, useEffect } from "react"
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const handleSearchChange = event => setSearch(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>
        setCountries(response.data)
      )
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
