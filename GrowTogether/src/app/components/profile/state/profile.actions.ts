import { SafeUrl } from "@angular/platform-browser";
import { createAction, props } from "@ngrx/store";

export const GET_PROFILE_IMAGE_START = '[profile page] get profile image start';
export const GET_PROFILE_IMAGE_SUCCESS = '[profile page] get profile image success';
export const UPLOAD_PROFILE_IMAGE_START = '[profile page] upload profile image start';

export const getProfileImageStart = createAction(GET_PROFILE_IMAGE_START, props<{id:number|undefined}>());
export const getProfileImageSuccess = createAction(GET_PROFILE_IMAGE_SUCCESS, props<{url:SafeUrl}>());

export const uploadProfileImageStart = createAction(UPLOAD_PROFILE_IMAGE_START, props<{id:number|undefined, file:File}>());

