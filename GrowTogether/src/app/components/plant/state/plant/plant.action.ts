import { createAction, props } from "@ngrx/store";
import { addPlantDto } from "src/app/Dto/add-plant.dto";
import { Plant } from "src/app/Models/plant.model";



export const GET_PLANTS = '[plant page] get plants';
export const GET_PLANTS_SUCCESS = '[plant page] get plants success';
export const ADD_EMPTY_PLANT = '[plant page] add empty plant';
export const ADD_EMPTY_PLANT_SUCCESS = '[plant page] add empty plant success';
export const ADD_PLANT = '[plant page] add plant';
export const ADD_PLANT_SUCCESS = '[plant page] add plant success';
export const ADD_PLANT_IMAGES = '[plant page] add plant images';
export const ADD_PLANT_IMAGES_SUCCESS = '[plant page] add plant images success';

export const GET_CATEGORIES = '[plant page] get categories';
export const GET_CATEGORIES_SUCCESS = '[plant page] get categories success';

export const getCategories = createAction(GET_CATEGORIES);
export const getCategoriesSuccess = createAction(GET_CATEGORIES_SUCCESS, props<{categories:any}>());

export const getPlants = createAction(GET_PLANTS);
export const getPlantsSuccess = createAction(GET_PLANTS_SUCCESS, props<{plants:Plant[]}>());

export const addEmptyPlant = createAction(ADD_EMPTY_PLANT);
export const addEmptyPlantSuccess = createAction(ADD_EMPTY_PLANT_SUCCESS, props<{newPlantId:number}>());

export const addPlant = createAction(ADD_PLANT, props<{plantDto:addPlantDto, plantId:number}>());
export const addPlantSuccess = createAction(ADD_PLANT_SUCCESS, props<{plant:Plant}>());

export const addPlantImages = createAction(ADD_PLANT_IMAGES, props<{files:any, id:number}>());
export const addPlantImagesSuccess = createAction(ADD_PLANT_IMAGES_SUCCESS, props<{imageUrls:string[]}>());