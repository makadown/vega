import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoint_Vehiculos, URL_SERVICIOS } from '../config/url.servicios';

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient) { }
 
    upload(vehicleId: any, photo) {
        const formData = new FormData();
        /* El nombre tiene que ser EXACTAMENTE igual a como se llama el parametro en 
        la funcion del API en el backend */
        formData.append('file', photo);
        return this.http.post(URL_SERVICIOS + endPoint_Vehiculos + '/' +
                       vehicleId + '/photos', formData);
    }

    getPhotos(vehicleId) {
        return this.http.get(URL_SERVICIOS + endPoint_Vehiculos + '/' +
                vehicleId + '/photos');
    }
}
