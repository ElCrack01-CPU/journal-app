import React from 'react'
import { types } from '../types/types';

const initialState = {
    uid: null,
    name: ''
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:
            return {}



        default:
            return state;
    }

}
