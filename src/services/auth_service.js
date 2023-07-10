import * as request from './request_compilator'
import { hostserver } from '../utils/constants'

// const authserver = 'http://127.0.0.1:8000/api/auth'
const authserver = `${hostserver}/api/auth`

export const login = async (logInData) => {
    const result = request.post(`${authserver}/login/`, logInData)

    return result
}

export const register = async (registerData) => {
    const result = request.post(`${authserver}/register/`, registerData)

    return result
}

export const logout = async() => {

    const result = request.get(`${authserver}/logout/`)

    return result
}

export const getAllCityOffices = async () => {
    const result = request.get(`${authserver}/city_offices/`)

    return result
}

export const getCityOffice = (cityOfficeID) => request.get(`${authserver}/city_offices/${cityOfficeID}`)

export const updateCityOffice = (cityOfficeData) => request.put(`${authserver}/city_offices/${cityOfficeData['id']}/`,cityOfficeData)

export const createCityOffice = (cityOfficeData) => request.post(`${authserver}/city_offices/`,cityOfficeData)

export const getAllRoleTypes = async () => {
    const result = request.get(`${authserver}/role_type/`)

    return result
}

export const getRoleType = (roleTypeID) => request.get(`${authserver}/role_type/${roleTypeID}`)

export const updateRoleType = (roleTypeData) => request.put(`${authserver}/role_type/${roleTypeData['id']}/`,roleTypeData)

export const createRoleType = (roleTypeData) => request.post(`${authserver}/role_type/`,roleTypeData)


export const getAllManagers = async () => {
    const result = request.get(`${authserver}/managers/`)

    return result
}