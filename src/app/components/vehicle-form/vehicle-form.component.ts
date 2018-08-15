import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  features: any[];
  models: any[];
  vehicle: any = {
    contact: {},
    features: []
  };

  constructor(private vehicleService: VehicleService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe( (makes: any) => {
       this.makes = makes;
      // console.log('MAKES ', this.makes);
    });

    this.vehicleService.getFeatures().subscribe( (features: any) => {
            this.features = features;
    });
  }

  onMakeChange () {
    const selectedMake = this.makes.find( m => {
      const numeroMake = +this.vehicle.makeId;
      /* Vehicle.make es string, m.id es number,
         por eso hice conversion para forzar la mejor
         practica de usar triple igual.
      */
      delete this.vehicle.modelId;
      return m.id === numeroMake;
    });

    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle( featureId, $event) {
     if ( $event.target.checked ) {
       this.vehicle.features.push(featureId);
     } else {
       const index = this.vehicle.features.indexOf(featureId);
       this.vehicle.features.splice(index, 1);
     }
  }

  submit() {
    this.vehicleService.create(this.vehicle).subscribe(
           x => this.toastr.success('Vehicle registered', 'Success!'),
           err => this.toastr.error('An unexpected error happened', 'Error') );
  }

}
