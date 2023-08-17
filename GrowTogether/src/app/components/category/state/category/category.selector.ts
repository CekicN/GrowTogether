import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "./category.state";

export const CATEGORY_STATE_NAME = 'category'

const getCategoryState = createFeatureSelector<CategoryState>(CATEGORY_STATE_NAME);

export const selectCategories = createSelector(getCategoryState, state => state.categories);