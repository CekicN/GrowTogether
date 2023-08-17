import { createAction, props } from "@ngrx/store";



export const GET_CATEGORIES = '[plant page] get categories';
export const GET_CATEGORIES_SUCCESS = '[plant page] get categories success';

export const getCategories = createAction(GET_CATEGORIES);
export const getCategoriesSuccess = createAction(GET_CATEGORIES_SUCCESS, props<{categories:any}>());