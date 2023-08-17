import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlantState } from "./plant.state";

export const PLANT_STATE_NAME = 'category'

const getPlantsState = createFeatureSelector<PlantState>(PLANT_STATE_NAME);

export const selectPlants = createSelector(getPlantsState, state => state.plants);