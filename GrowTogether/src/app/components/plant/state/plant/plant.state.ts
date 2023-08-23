import { Plant } from "src/app/Models/plant.model"
import {EntityState, createEntityAdapter} from '@ngrx/entity'
export interface PlantState extends EntityState<Plant>{
    categories:any,
    newPlantId:number,
    newPlantimageUrls:string[]
}

export const plantAdapter = createEntityAdapter<Plant>();

export const initialState:PlantState=plantAdapter.getInitialState({
    categories:[],
    newPlantId:-1,
    newPlantimageUrls:[]
})