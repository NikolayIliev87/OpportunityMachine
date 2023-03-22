import * as request from './request_compilator'

const authserver = 'http://127.0.0.1:8000/api/auth'

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

export const getAllRoleTypes = async () => {
    const result = request.get(`${authserver}/role_type/`)

    return result
}

export const getAllManagers = async () => {
    const result = request.get(`${authserver}/managers/`)

    return result
}