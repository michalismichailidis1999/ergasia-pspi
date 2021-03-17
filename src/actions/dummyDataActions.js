import {USER_CREATED} from '../actionTypes/dummyDataActionTypes'

export const userCreated = (user) => {
    return {
        type: USER_CREATED,
        payload: user
    }
}