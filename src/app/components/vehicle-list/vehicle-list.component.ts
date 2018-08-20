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
  makes: KeyValuePair[];
  query: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe( (makes: any) => this.makes = makes);
    this.populateVehicles();
  }

  onFilterChange() {
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe( (vehicles: any) => this.vehicles = vehicles);
  }

  resetFilter() {
      this.query = {};
      this.onFilterChange();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = false;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

}
