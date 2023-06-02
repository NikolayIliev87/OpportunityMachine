import * as request from './request_compilator'

const localserver = 'http://127.0.0.1:8000/api/opportunity'


export const getAllOpportunities = () => request.get(`${localserver}`)

// export const getAllClientsFiltered = (filterID) => request.get(`${localserver}/?category=${filterID}`)

export const getOpportunity = (opportunityID) => request.get(`${localserver}/${opportunityID}`)

export const updateOpportunity = (opportunityData) => request.put(`${localserver}/${opportunityData['id']}/`,opportunityData)

export const createOpportunity = (opportunityData) => request.post(`${localserver}/`,opportunityData)