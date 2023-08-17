import { createAction, props } from "@ngrx/store";
import { Plant } from "src/app/Models/plant.model";



export const GET_PLANTS = '[plant page] get plants';
export const GET_PLANTS_SUCCESS = '[plant page] get plants success';

export const getPlants = createAction(GET_PLANTS);
export const getPlantsSuccess = createAction(GET_PLANTS_SUCCESS, props<{plants:Plant[]}>());