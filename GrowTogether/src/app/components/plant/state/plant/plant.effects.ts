import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { PlantService } from "../../plant.service";
import { exhaustMap, forkJoin, map, mergeMap } from "rxjs";
import { getPlants, getPlantsSuccess } from "./plant.action";

@Injectable()
export class PlantEffects{
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private plantService:PlantService) {}
    
        plants$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(getPlants),
                exhaustMap(action => 
                    this.plantService.getAllPlants().pipe(
                    mergeMap((plants) => {
                        const request$ =  plants.map(plant => {
                            return this.plantService.getPhotosById(plant.id).pipe(
                                map((photos:any) => {
                                    const imageUrls:string[] = [];
                                    photos.data.forEach((photo:any) => {
                                        const values = photo.data.map((value:any) => parseInt(value, 10));
                                        const imageData = new Uint8Array(values);
                                        const blob = new Blob([imageData], { type: 'image/png' });
                                        imageUrls.push(URL.createObjectURL(blob));
                                    })
                                    plant.imageUrls = imageUrls;
                                    return plant;
                                })
                            )
                        })

                        return forkJoin(request$).pipe(
                            map(updatedPlants => getPlantsSuccess({plants:updatedPlants}))
                        )
                    })
                )
                )
            )
        })
}