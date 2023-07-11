import * as request from './request_compilator'
import { hostserver } from '../utils/constants'

const profileserver = 'http://127.0.0.1:8000/api/auth/profile'
// const profileserver = `${hostserver}/api/auth/profile`

export const getProfiles = () => request.get(profileserver);

export const getProfileDetails = (profileID) => request.get(`${profileserver}/${profileID}`)

export const updateProfile = (profileData) => request.put(`${profileserver}/${profileData['user']}/`,profileData)
