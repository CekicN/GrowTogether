import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlantState, plantAdapter } from "./plant.state";

export const PLANT_STATE_NAME = 'plant'

const getPlantsState = createFeatureSelector<PlantState>(PLANT_STATE_NAME);
export const plantSelectors = plantAdapter.getSelectors();

export const selectPlants = createSelector(getPlantsState, plantSelectors.selectAll);
export const selectCategories = createSelector(getPlantsState, state => state.categories);
export const selectNewPlantId = createSelector(getPlantsState, state => state.newPlantId);
export const selectNewPlantImages = createSelector(getPlantsState, state => state.newPlantimageUrls);

export const selectPlantById = createSelector(getPlantsState, (state:PlantState, props:any) => {
    return state.entities[props.id];
})