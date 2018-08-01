import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MakeService } from './services/make.service';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchdataComponent } from './components/fetchdata/fetchdata.component';
import { HomeComponent } from './components/home/home.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';


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
  providers: [MakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
