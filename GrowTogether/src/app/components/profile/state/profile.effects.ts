import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { getProfileImageStart, getProfileImageSuccess, uploadProfileImageStart } from "./profile.actions";
import { exhaustMap, map } from "rxjs";
import { ProfileService } from "../profile.service";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class ProfileEffects{
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private profileService:ProfileService,
        private sanitizer:DomSanitizer) {}
    
        profileImage$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(getProfileImageStart),
                exhaustMap(action => this.profileService.getProfileImage(action.id)
                    .pipe(
                    map( blob => {
                        let objectURL = URL.createObjectURL(blob);       
                        let url = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                        return getProfileImageSuccess({url})
                    }) 
                ))
            )
        })

        uploadProfileImage$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(uploadProfileImageStart),
                exhaustMap(action => this.profileService.uploadImage(action.id, action.file)
                    .pipe(
                    map( blob => {
                        let objectURL = URL.createObjectURL(blob);       
                        let url = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                        return getProfileImageSuccess({url})
                    }) 
                ))
            )
        })
}