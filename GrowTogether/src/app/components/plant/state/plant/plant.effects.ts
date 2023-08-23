import { Injectable } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { PlantService } from "../../plant.service";
import { exhaustMap, forkJoin, map, mergeMap } from "rxjs";
import { addEmptyPlant, addEmptyPlantSuccess, addPlant, addPlantImages, addPlantImagesSuccess, addPlantSuccess, getCategories, getCategoriesSuccess, getPlants, getPlantsSuccess } from "./plant.action";
import { Plant } from "src/app/Models/plant.model";
import { selectNewPlantImages } from "./plant.selector";

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

        categories$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(getCategories),
                exhaustMap(action => this.plantService.getCategories().pipe(
                    map(categories =>  getCategoriesSuccess({categories}))
                ))
            )
        })

        emptyPlant$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(addEmptyPlant),
                exhaustMap(action => this.plantService.addEmptyPlant().pipe(
                    map((plant:any) =>  addEmptyPlantSuccess({newPlantId:plant.id}))
                ))
            )
        })

        addPlant$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(addPlant),
                exhaustMap(action => this.plantService.addPlant(action.plantDto, action.plantId).pipe(
                    map((plant:any) =>  {
                        let imageUrls:string[] = [];
                        this.store.select(selectNewPlantImages).subscribe(images => imageUrls = images);
                        const plantObj:Plant ={
                            id:plant.id,
                            name:plant.name,
                            address:plant.address,
                            description: plant.description,
                            category:{
                                name:plant.category.name
                            },
                            user:{
                                username:plant.user.username
                            },
                            plantType:plant.plantType,
                            imageUrls:imageUrls
                        } 
                        return addPlantSuccess({plant:plantObj})})
                ))
            )
        })

        addPlantImages$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(addPlantImages),
                mergeMap(action => this.plantService.uploadImages(action.files, action.id).pipe(
                    mergeMap(() => {
                        return this.plantService.getPhotosById(action.id).pipe(
                            map((photos:any) => {
                                const imageUrls:string[] = [];
                                photos.data.forEach((photo:any) => {
                                    const values = photo.data.map((value:any) => parseInt(value, 10));
                                    const imageData = new Uint8Array(values);
                                    const blob = new Blob([imageData], { type: 'image/png' });
                                    imageUrls.push(URL.createObjectURL(blob));
                                })
                                return addPlantImagesSuccess({imageUrls})
                            })
                        )
                    })
                    )
                )
            )
        })
}