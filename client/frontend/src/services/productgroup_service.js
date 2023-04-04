import * as request from './request_compilator'

const localserver = 'http://127.0.0.1:8000/api/productgroup'


export const getAllProductGroups = () => request.get(`${localserver}`)

// export const getAllProductGroupsFiltered = (filterID) => request.get(`${localserver}/?category=${filterID}`)

export const getProductGroup = (productGroupID) => request.get(`${localserver}/${productGroupID}`)

export const updateProductGroup = (productGroupData) => request.put(`${localserver}/${productGroupData['id']}/`,productGroupData)

export const createProductGroup = (productGroupData) => request.post(`${localserver}/`,productGroupData)