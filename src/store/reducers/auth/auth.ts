import { AuthAction, AuthActionEnum } from "./types";

const initialState = {
    isAuth: true
}

export default function authReducer (state = initialState, action: AuthAction) {
    switch (action.type) {
        case AuthActionEnum.SET_AUTH:
            return {...state, auth: action.payload}
        default: 
            return state;
    }
}