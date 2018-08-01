import { Component, OnInit } from '@angular/core';
import { MakeService } from '../../services/make.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  vehicle: any = {};

  constructor(private makeService: MakeService) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe( (makes: any) => {
       this.makes = makes;
      // console.log('MAKES ', this.makes);
    });
  }

  onMakeChange () {
    const selectedMake = this.makes.find( m => {
      const numeroMake = +this.vehicle.make;
      /* Vehicle.make es string, m.id es number,
         por eso hice conversion para forzar la mejor
         practica de usar triple igual.
      */
      return m.id === numeroMake;
    });

    this.models = selectedMake ? selectedMake.models : [];
  }

}
