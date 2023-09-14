import { createReducer, on } from "@ngrx/store";
import { initialState, plantAdapter } from "./plant.state";
import { addEmptyPlantSuccess, addPlantImagesSuccess, addPlantSuccess, getCategoriesSuccess, getPlantsSuccess, plantContactSuccess } from "./plant.action";
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
        plantAdapter.addOne(action.plant, state);
        return {
            ...state,
            newPlantimageUrls:["../../../assets/images/no_image.jpg"]
        }
    }),
    on(addPlantImagesSuccess, (state, action) => {
        return {
            ...state,
            newPlantimageUrls:action.imageUrls
        }
    }),
    on(plantContactSuccess, (state, action) => {
        console.log(action.id);
        return plantAdapter.removeOne(action.id, state);
    })
    );


export function PlantReducer(state:any, action:any){
    return _plantReducer(state,action);
}