import React from "react"
import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const getRequest = axios.get(baseUrl)
    return getRequest.then(response => response.data)
}

const addContact = (newContact) => {
    const postRequest = axios.post(baseUrl,newContact)
    return postRequest.then(response => response.data)
}

const deleteContact = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`)
}

const updateContact = (id, updatedPerson) => {
    const putRequest = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return putRequest.then(response => response.data)
}

export default {getAll, addContact, deleteContact, updateContact}
