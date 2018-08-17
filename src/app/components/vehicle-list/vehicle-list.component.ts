import { KeyValuePair } from './../../models/KeyValuePair';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/Vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe( (makes: any) => this.makes = makes);
    this.vehicleService.getVehicles()
      .subscribe( (vehicles: any) => this.vehicles = this.allVehicles = vehicles);
  }

  onFilterChange() {
   // console.log('Entrando a onFilterChange()');
    let vehicles = this.allVehicles;
  //  console.log('Filtrando makeId ' + this.filter.makeId);
    if (this.filter.makeId) {
      vehicles = vehicles.filter( v => +v.make.id === +this.filter.makeId );
    }
//    console.log('Filtrando modelId ' + this.filter.modelId);
    if (this.filter.modelId) {
      vehicles = vehicles.filter( v => +v.model.id === +this.filter.modelId );
    }

    this.vehicles = vehicles;

  }

  resetFilter() {
      this.filter = {};
      this.onFilterChange();
  }

}
