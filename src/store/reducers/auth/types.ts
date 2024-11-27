import { IUser } from "../../../models/Iuser";

export interface authState {
    auth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
}

export enum AuthActionEnum {
    SET_AUTH = "SET_AUTH",
    SET_ERROR = "SET_ERROR",
    SET_USER = "SET_USER",
    SET_IS_LOADING = "SET_IS_LOADING"
}
export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH,
    payload: boolean
}

export interface SetUserAction {
    type: AuthActionEnum.SET_USER,
    payload: boolean
}

export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR,
    payload: boolean
}

export interface SetIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING,
    payload: boolean
}


export type AuthAction =
    SetAuthAction |
    SetUserAction |
    SetError |
    SetIsLoading
