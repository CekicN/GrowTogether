import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileImageComponent,
    ProfileDataComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class ProfileModule { }
