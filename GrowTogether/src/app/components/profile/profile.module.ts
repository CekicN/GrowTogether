import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfileEffects } from './state/profile.effects';
import { PROFILE_STATE_NAME } from './state/profile.selector';
import { ProfileReducer } from './state/profile.reducer';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileImageComponent,
    ProfileDataComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    EffectsModule.forFeature([ProfileEffects]),
    StoreModule.forFeature(PROFILE_STATE_NAME,ProfileReducer)
  ]
})
export class ProfileModule { }
