import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationBarComponent } from './components/core/navigation-bar/navigation-bar.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileModule } from './components/profile/profile.module';
import { UserAuthModule } from './components/user-auth/user-auth.module';
import {StoreModule} from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import { appReducer } from './store/app.state';
import { PlantModule } from './components/plant/plant.module';
import { CategoryModule } from './components/category/category.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    PlantModule,
    CategoryModule,
    UserAuthModule,
    FontAwesomeModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(appReducer), 
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
