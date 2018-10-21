import { ToastrService } from 'ngx-toastr';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastrService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) {

      route.params.subscribe(p => {
            this.vehicleId = +p['id'];
            if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
                  router.navigate(['/vehicles']);
                  return;
            }
      });
  }

  ngOnInit() {

    /* TODO: Jalar las imagenes del backend, no nomas el nombre del archivo...
    https://stackoverflow.com/questions/45530752/getting-image-from-api-in-angular-4-5 */
    this.photoService.getPhotos(this.vehicleId).subscribe( (photos: any) => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status === 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }
  uploadPhoto() {
    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;

    /* En esta aplicación sólo estaré subiendo un elemento a la vez */
    this.photoService.upload(this.vehicleId, nativeElement.files[0])
         .subscribe( (photo: any) => {
           this.photos.push(photo);
         });
  }
}
