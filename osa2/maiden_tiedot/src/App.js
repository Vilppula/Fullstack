import React, { useState } from 'react'
import CountryForm from './components/CountryForm'
import Countries from './components/Countries'


function App() {

  const api_key = process.env.REACT_APP_API_KEY
  const queryString = `http://api.weatherapi.com/v1/current.json?key=${api_key}`
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])
  const [countryInput, setCountryInput] = useState('')
  const [weatherData, setWeatherData] = useState([])
  

  const countryInputHandler = (event) => {
    setCountryInput(event.target.value)
  }

  const selectCountry = (event) => {
    event.preventDefault()
    countries.forEach(country => {
      if (country.name.common === event.target.value) {
        setShownCountries([country])
        console.log('Button was pressed')
      }
    })
  }

  const findCountry = (event) => {
    event.preventDefault()
    console.log(weatherData)
    var showList = []
    countries.forEach(country => {
      if (country.name.common.toLowerCase().includes(countryInput.toLowerCase())) {
        showList = (showList.concat(country))
      }
    })
    setShownCountries(showList)
  }


  return (
    <>
      <div>Find countries:</div>
      <CountryForm inputValue = {countryInput}
                   findCountry = {findCountry}
                   handler = {countryInputHandler}/>
      <Countries countries = {countries}
                 shownCountries = {shownCountries}
                 setCountries = {setCountries}
                 setShownCountries = {setShownCountries}
                 handler = {selectCountry}
                 queryString = {queryString}
                 weatherData = {weatherData}
                 setWeatherData= {setWeatherData}/>
      <div>{weatherData.forEach(data => {
          <div>{data}</div>
      })}</div>
    </>
  );
}

export default App;
