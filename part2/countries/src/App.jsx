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

const CountryDetails = ({ country, weather }) => {
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
      <h2>Weather in {country.capital}</h2>
      {weather ? (
        <div>
          <p><strong>Temperature:</strong> {weather.temperature}°C</p>
          <p><strong>Wind:</strong> {weather.wind} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
          <p>{weather.description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  
  const api_key = import.meta.env.VITE_SOME_KEY // Access API key from environment variables
  // For Linux/macOS Bash: export VITE_SOME_KEY=your_API_key && npm run dev
  // For Windows PowerShell: ($env:VITE_SOME_KEY="your_API_key") -and (npm run dev)
  // For Windows cmd.exe: set "VITE_SOME_KEY=your_API_key" && npm run dev

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0]
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      axios.get(url).then((response) => {
        const data = response.data
        setWeather({
          temperature: data.main.temp,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
          description: data.weather[0].description,
        })
      })
    }
  }, [selectedCountry, api_key])

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
        setWeather(null) // Clear weather data when changing selection
      }
    } else {
      setFilteredCountries([])
      setSelectedCountry(null)
      setWeather(null) // Clear weather data when search is empty
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
        <CountryDetails country={selectedCountry} weather={weather} />
      ) : (
        <CountryList countries={filteredCountries} onShowCountry={handleShowCountry} />
      )}
    </div>
  )
}

export default App