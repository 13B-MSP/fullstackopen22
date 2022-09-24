import { useState } from "react"

import CountryInfo from "./CountryInfo"

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

export default SearchResult