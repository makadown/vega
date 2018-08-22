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

  private readonly PAGE_SIZE = 3;
  public loading = false;

  totalItems = 0;
  queryResult: any = {};
  makes: KeyValuePair[];
  query: any = {
    page: 1,
    pageSize: this.PAGE_SIZE
  };
  sortUpIcon = faSortUp;
  sortDownIcon = faSortDown;
  columns: any = [
      {title: 'Id'},
      {title: 'Make', key: 'make', isSortable: true},
      {title: 'Model', key: 'model', isSortable: true},
      {title: 'ContactName', key: 'contactName', isSortable: true},
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
    this.query.page = 1;
    this.populateVehicles();
  }

  private populateVehicles() {
    this.loading = true;
    this.vehicleService.getVehicles(this.query)
          .subscribe( (result: any) => {
            this.queryResult = result;
            this.loading = false;
        });
  }

  resetFilter() {
      this.query = {
        page: 1,
        pageSize: this.PAGE_SIZE
      };
      this.populateVehicles();
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

  onPageChanged(page) {
    this.query.page = page;
    this.populateVehicles();
  }

}
