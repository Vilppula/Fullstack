import React, { useEffect } from 'react'
import axios from 'axios'

const Country = ({country, queryString, weatherData, setWeatherData}) => {
    
    var current = ([])
    useEffect (() => {
        axios
            .get(queryString+`&q=${country.capital[0]}&aqi=no`)
            .then(response => {
                current = current.concat(response.data.current.temp_c,
                                                 response.data.current.condition.icon,
                                                 response.data.current.wind_mph 
                                                 + " mph direction "
                                                 + response.data.current.wind_dir)
                setWeatherData(current)
            })
    },[])

    return (
        <>
        <h2>{country.name.common}</h2>
        <div> Capital: {Object.values(country.capital).map(cap => {
                return <span key={cap}>{cap} </span>
            })}
        </div>
        <br/>
        <div>Population: {country.population}</div>
        <h3>Spoken languages</h3>
        <ul>
            {Object.values(country.languages).map(lang => {
                return <li key={lang}>{lang} </li>
            })}
        </ul>
        <br/>
        <img src={country.flags.png} width='200'/>
        <h3>Weather in {country.capital[0]}</h3>
        <div><b>temperature: </b>{weatherData[0]} <b> celcius</b></div>
        <img src={weatherData[1]} width='50'/>
        <div><b>wind: </b>{weatherData[2]}</div>
        </>
    )
}

export default Country