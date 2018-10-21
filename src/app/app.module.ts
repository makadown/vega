import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchdataComponent } from './components/fetchdata/fetchdata.component';
import { HomeComponent } from './components/home/home.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

import { VehicleService } from './services/vehicle.service';
import { PhotoService } from './services/photo.service';
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as Raven from 'raven-js';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

Raven.config('https://ce4633ab96e24c11a924b4ffa425e2c7@sentry.io/1263165').install();


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    FetchdataComponent,
    HomeComponent,
    NavmenuComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent
  ],
  imports: [
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
     }),
    ToastContainerModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'home', component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: '**', redirectTo: 'home' }
  ]),
    HttpClientModule
  ],
  providers: [
        {provide: ErrorHandler, useClass: AppErrorHandler},
        VehicleService, PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
