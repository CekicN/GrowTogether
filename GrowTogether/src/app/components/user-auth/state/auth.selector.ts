import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "./auth.state"

export const AUTH_STATE_NAME = 'auth'

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, state =>{
    return state.user ? true:false;
})

export const getUser = createSelector(getAuthState, state => state.user);

export const getUserId = createSelector(getAuthState, state => {
    if(state.user)
    {
        return state.user.id
    }
    return -1;
});