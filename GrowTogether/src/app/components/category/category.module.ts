import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoryEffects } from './state/category/category.effects';
import { CategoryReducer } from './state/category/category.reducer';
import { CATEGORY_STATE_NAME } from './state/category/category.selector';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([CategoryEffects]),
    StoreModule.forFeature(CATEGORY_STATE_NAME,CategoryReducer),
  ]
})
export class CategoryModule { }
