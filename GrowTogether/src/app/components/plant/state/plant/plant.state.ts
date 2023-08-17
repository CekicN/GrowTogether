import { Plant } from "src/app/Models/plant.model"

export interface PlantState{
    plants:Plant[]
}

export const initialState:PlantState = {
    plants:[]
}