import { createAction, props } from "@ngrx/store";
import { signupDto } from "src/app/Dto/signup.dto";
import { User } from "src/app/Models/user.model";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';
export const SIGNUP_FAIL = '[auth page] signup fail';

export const loginStart = createAction(LOGIN_START, props<{email:string,password:string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{user:User|null}>());
export const loginFail = createAction(LOGIN_FAIL);

export const signupStart = createAction(SIGNUP_START, props<{signupDto:signupDto}>());
export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{user:User}>());
export const signupFail = createAction(SIGNUP_FAIL);