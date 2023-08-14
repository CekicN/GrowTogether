export interface SharedState{
    showLoading:boolean,
    errorMsg:string
}

export const initialState: SharedState = {
    showLoading:false,
    errorMsg:""
}