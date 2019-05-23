import { Action } from '@ngrx/store';

// Declare name of actions
export enum UserActionsTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    GET_USER = 'GET_USER',
    SET_DATA = 'SET_DATA',
}

export class Login implements Action {
    readonly type = UserActionsTypes.LOGIN;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = UserActionsTypes.LOGOUT;
    constructor(public payload: any) {}
}

export class GetUser implements Action {
    readonly type = UserActionsTypes.GET_USER;
    constructor(public payload: any) {}
}

export type StateActions = Login | Logout | GetUser;
