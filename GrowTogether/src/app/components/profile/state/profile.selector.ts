import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./profile.state";


export const PROFILE_STATE_NAME = 'profile'

const getProfileState = createFeatureSelector<ProfileState>(PROFILE_STATE_NAME);

export const getProfileImage = createSelector(getProfileState, state => state.imageUrl);