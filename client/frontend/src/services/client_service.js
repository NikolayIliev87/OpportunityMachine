import * as request from './request_compilator'

const localserver = 'http://127.0.0.1:8000/api/client'


export const getAllClients = () => request.get(`${localserver}`)

// export const getAllClientsFiltered = (filterID) => request.get(`${localserver}/?category=${filterID}`)

export const getClient = (clientID) => request.get(`${localserver}/${clientID}`)

export const updateClient = (clientData) => request.put(`${localserver}/${clientData['id']}/`,clientData)

export const createClient = (clientData) => request.post(`${localserver}/`,clientData)