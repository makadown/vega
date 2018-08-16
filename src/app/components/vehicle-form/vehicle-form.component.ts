import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {forkJoin} from 'rxjs';

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private vehicleService: VehicleService,
              private toastr: ToastrService) {

        route.params.subscribe(p => {
                this.vehicle.id = +p['id'];
        });
  }

  ngOnInit() {
    let sources = null;
    /* Meto los observables en una colección */
    sources = [this.vehicleService.getMakes(),
        this.vehicleService.getFeatures()
      ];

    if ( this.vehicle.id ) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    /* Me suscribo 3x1 (o 2x1, dependiendo) con un solo observable */
    forkJoin(sources).subscribe( (data: any) => {
            this.makes = data[0];
            this.features = data[1];
            if ( this.vehicle.id ) {
                this.vehicle = data[2];
            }
          }, err => {
              if (err.status === 404 ) {
                  this.router.navigate(['/home']);
              }
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
           x => this.toastr.success('Vehicle registered', 'Success!') );
  }

}
