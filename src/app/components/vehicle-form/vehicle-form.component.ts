import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {forkJoin} from 'rxjs';

import { Vehicle } from './../../models/Vehicle';
import { SaveVehicle } from './../../models/SaveVehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  features: any[];
  models: any[];

  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: { name: '', email: '', phone: '' },
    lastUpdate: '2000-01-01'
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
                this.setVehicle( data[2] );
                this.populateModels();
            }
          }, err => {
              if (err.status === 404 ) {
                  this.router.navigate(['/home']);
              }
      });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    // Característica de ES3, muy bonita
    this.vehicle.features = v.features.map(f => f.id);
    this.vehicle.contact = v.contact;
  }

  onMakeChange () {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    const selectedMake = this.makes.find( m => {
      const numeroMake = +this.vehicle.makeId;
      /* Vehicle.make es string, m.id es number,
         por eso hice conversion para forzar la mejor
         practica de usar triple igual.
      */
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
    if ( this.vehicle.id != null && this.vehicle.id > 0 ) {
      this.vehicleService.update(this.vehicle).subscribe(
        x => this.toastr.success('Vehicle updated', 'Success!') );
    } else {
      this.vehicleService.create(this.vehicle).subscribe(
           x => this.toastr.success('Vehicle created', 'Success!') );
    }
    this.router.navigate(['/vehicles']);
  }

  delete () {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete (this.vehicle.id).subscribe(
        x => {
                this.toastr.success('Vehicle deleted', 'Success!');
                this.router.navigate(['/vehicles']);
             });
    }
  }

  cancel () {
    this.router.navigate(['/vehicles']);
  }

}
