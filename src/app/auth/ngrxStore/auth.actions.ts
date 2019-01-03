import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNING ='SIGNING';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN ='SET_TOKEN';

export class Signup implements Action{
  readonly type = SIGNUP;
}

export class Signing  implements Action{
    readonly type = SIGNING;
}

export class Logout implements Action{
    readonly type = LOGOUT;
}

export class SetToken implements Action{
    readonly type = SET_TOKEN;

    constructor(public payload: string){}
}

export type AuthActions = Signup | Signing | Logout | SetToken