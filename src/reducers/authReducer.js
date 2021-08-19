import { types } from '../types/type';

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            console.log(action);
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                email: action.payload.email,
            }

        case types.logout:
            return { }
    
        default:
            return state;
    }
}