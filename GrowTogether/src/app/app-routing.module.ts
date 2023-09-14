import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { LoginComponent } from './components/user-auth/login/login.component';
import { SignupComponent } from './components/user-auth/signup/signup.component';
import { authGuard } from './Guards/auth.guard';
import { PlantComponent } from './components/plant/plant/plant.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { adminGuard } from './Guards/admin.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'plant', component:PlantComponent},
  {path:'profile', component:ProfileComponent, canActivate:[authGuard]},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'admin', component:AdminComponent, canActivate:[adminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
