import { createReducer, on } from "@ngrx/store";
import { initialState } from "./plant.state";
import { getPlantsSuccess } from "./plant.action";

const _plantReducer = createReducer(initialState, 
    on(getPlantsSuccess, (state, action) => {
        return {
            ...state,
            plants:action.plants
        }
    }),
    );


export function PlantReducer(state:any, action:any){
    return _plantReducer(state,action);
}