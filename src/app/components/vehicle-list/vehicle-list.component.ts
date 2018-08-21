import { KeyValuePair } from './../../models/KeyValuePair';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/Vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  public loading = false;

  vehicles: Vehicle[];
  makes: KeyValuePair[];
  query: any = {};
  sortUpIcon = faSortUp;
  sortDownIcon = faSortDown;
  columns: any = [
      {title: 'Id'},
      {title: 'ContactName', key: 'contactName', isSortable: true},
      {title: 'Make', key: 'make', isSortable: true},
      {title: 'Model', key: 'model', isSortable: true},
      {}
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {

    this.vehicleService.getMakes()
        .subscribe( (makes: any) => {
                  this.makes = makes;
          } );
    this.populateVehicles();
  }

  onFilterChange() {
    this.populateVehicles();
  }

  private populateVehicles() {
    this.loading = true;
    this.vehicleService.getVehicles(this.query)
          .subscribe( (vehicles: any) => {
            this.vehicles = vehicles;
            this.loading = false;
        });
  }

  resetFilter() {
      this.query = {};
      this.onFilterChange();
  }

  sortBy(columnName) {

    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending ;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

}
