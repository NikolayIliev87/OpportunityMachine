import * as request from './request_compilator'
import { hostserver } from '../utils/constants'

// const localserver = 'http://127.0.0.1:8000/api/product'
const localserver = `${hostserver}/api/product`


export const getAllProducts = () => request.get(`${localserver}`)

// export const getAllProductsFiltered = (filterID) => request.get(`${localserver}/?category=${filterID}`)

export const getProduct = (productID) => request.get(`${localserver}/${productID}`)

export const updateProduct = (productData) => request.put(`${localserver}/${productData['id']}/`,productData)

export const createProduct = (productData) => request.post(`${localserver}/`,productData)