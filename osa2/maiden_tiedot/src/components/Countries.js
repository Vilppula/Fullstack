import axios from 'axios'
import React, { useEffect } from 'react'
import Country from './Country'


const Countries = (props) => {

    useEffect (() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                props.setCountries(response.data)
            })
    },[])

    if (props.shownCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    if (props.shownCountries.length === 1) {
        return <Country country = {props.shownCountries[0]}
                        queryString = {props.queryString}
                        weatherData = {props.weatherData}
                        setWeatherData = {props.setWeatherData}/>
    }
    else {
        return (
            <>
                {props.shownCountries.map(country => {
                    return (
                        <div key = {country.name.common}>
                            {country.name.common}
                            <button onClick={props.handler} value={country.name.common}>show</button>
                        </div>
                    )
                })}
            </>
        )
    }
}

export default Countries