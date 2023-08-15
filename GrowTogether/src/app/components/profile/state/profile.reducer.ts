import { createReducer, on } from "@ngrx/store";
import { initialState } from "./profile.state";
import { getProfileImageSuccess } from "./profile.actions";

const _profileReducer = createReducer(initialState, 
    on(getProfileImageSuccess, (state, action) => {

        return {
            ...state,
            imageUrl:action.url
        }
    })
    );


export function ProfileReducer(state:any, action:any){
    return _profileReducer(state,action);
}