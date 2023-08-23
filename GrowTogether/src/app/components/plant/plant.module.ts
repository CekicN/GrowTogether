import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantComponent } from './plant/plant.component';
import { CategoriesComponent } from './categories/categories.component';
import { PlantListComponent } from './plant-list/plant-list.component';
import { RecursiveCategoriesComponent } from './recursive-categories/recursive-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlantEffects } from './state/plant/plant.effects';
import { PLANT_STATE_NAME } from './state/plant/plant.selector';
import { PlantReducer } from './state/plant/plant.reducer';
import { PlantService } from './plant.service';
import { PlantDetailsComponent } from './plant-details/plant-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PlantComponent,
    CategoriesComponent,
    PlantListComponent,
    RecursiveCategoriesComponent,
    PlantDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    EffectsModule.forFeature([PlantEffects]),
    StoreModule.forFeature(PLANT_STATE_NAME,PlantReducer),
    
  ]
})
export class PlantModule { }
