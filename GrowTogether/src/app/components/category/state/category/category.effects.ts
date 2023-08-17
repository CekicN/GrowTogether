import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { PlantService } from "../../../plant/plant.service";
import { getCategories, getCategoriesSuccess } from "./category.action";
import { exhaustMap, map } from "rxjs";
import { CategoryService } from "../../category.service";

@Injectable()
export class CategoryEffects{
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private categoryService:CategoryService) {}
    
        categories$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(getCategories),
                exhaustMap(action => this.categoryService.getCategories().pipe(
                    map(categories =>  getCategoriesSuccess({categories}))
                ))
            )
        })
}