import React from 'react'

const CountryForm = (props) => {
    return (
        <>
            <form onSubmit={props.findCountry}>
                <input value={props.inputValue} onChange={props.handler}/>
            </form>
        </>
    )
}

export default CountryForm