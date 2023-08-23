import { createReducer, on } from "@ngrx/store";
import { initialState, plantAdapter } from "./plant.state";
import { addEmptyPlantSuccess, addPlantImagesSuccess, addPlantSuccess, getCategoriesSuccess, getPlantsSuccess } from "./plant.action";
import { Plant } from "src/app/Models/plant.model";

const _plantReducer = createReducer(initialState, 
    on(getPlantsSuccess, (state, action) => {
        return plantAdapter.setAll(action.plants, state);
    }),
    on(getCategoriesSuccess, (state, action) => {
        return {
            ...state,
            categories: action.categories
        }
    }),
    on(addEmptyPlantSuccess, (state, action) => {
        return {
            ...state,
            newPlantId:action.newPlantId
        }
    }),
    on(addPlantSuccess, (state, action) => {
        return plantAdapter.addOne(action.plant, state);
    }),
    on(addPlantImagesSuccess, (state, action) => {
        return {
            ...state,
            newPlantimageUrls:action.imageUrls
        }
    }),
    
    );


export function PlantReducer(state:any, action:any){
    return _plantReducer(state,action);
}