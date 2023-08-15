import { SafeUrl } from "@angular/platform-browser"

export interface ProfileState{
    imageUrl:SafeUrl
}

export const initialState:ProfileState = {
    imageUrl:""
}