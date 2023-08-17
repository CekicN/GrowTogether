import { createReducer, on } from "@ngrx/store";
import { initialState } from "./category.state";
import { getCategoriesSuccess } from "./category.action";

const _categoryReducer = createReducer(initialState, 
    on(getCategoriesSuccess, (state, action) => {
        return {
            ...state,
            categories:action.categories
        }
    }),
    );


export function CategoryReducer(state:any, action:any){
    return _categoryReducer(state,action);
}