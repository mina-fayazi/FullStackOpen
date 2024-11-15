import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries, onShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (countries.length === 0) {
    return <p>No matches found</p>
  }
  if (countries.length === 1) {
    // Automatically show country details when there's exactly one match
    return null
  }
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{' '}
          <button onClick={() => onShowCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase()
    setSearch(query)

    if (query) {
      const results = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      )
      setFilteredCountries(results)

      // Automatically select country if there's exactly one match
      if (results.length === 1) {
        setSelectedCountry(results[0])
      } else {
        setSelectedCountry(null)
      }
    } else {
      setFilteredCountries([])
      setSelectedCountry(null)
    }
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for a country"
      />
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountryList countries={filteredCountries} onShowCountry={handleShowCountry} />
      )}
    </div>
  )
}

export default App