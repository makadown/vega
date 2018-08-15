import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchdataComponent } from './components/fetchdata/fetchdata.component';
import { HomeComponent } from './components/home/home.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

import { VehicleService } from './services/vehicle.service';
import { AppErrorHandler } from './app.error-handler';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    FetchdataComponent,
    HomeComponent,
    NavmenuComponent,
    VehicleFormComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
     }),
    ToastContainerModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'home', component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchdataComponent },
      { path: '**', redirectTo: 'home' }
  ]),
    HttpClientModule
  ],
  providers: [
        {provide: ErrorHandler, useClass: AppErrorHandler},
        VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
