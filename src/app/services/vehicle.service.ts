import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, endPoint_Vehiculos, endPoint_Makes, endPoint_Features } from '../config/url.servicios';
import { SaveVehicle, BackendSaveVehicle } from '../models/SaveVehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getMakes() {
       // console.log('Peticion a ', URL_SERVICIOS + '/api/makes');
       return this.http.get(URL_SERVICIOS + endPoint_Makes);
  }

  public getFeatures() {
    return this.http.get(URL_SERVICIOS + endPoint_Features);
  }

  create( vehicle: SaveVehicle ) {
    const backendSaveVehicle = this.serializeToDotNet(vehicle );
    return this.http.post(URL_SERVICIOS + endPoint_Vehiculos, backendSaveVehicle);
  }

  /* OJO:
   SaveVehicle lo necesito para los formularios.
   BackendSaveVehicle lo necesito para enviarlo con la estructura que exige el backend, ej.
         {
	          "modelId": 12,
          	"isRegistered": true,
          	"contact" : {
          			"name": "Conrad",
          			"email": "Murua@esparza.com",
          			"phone": "555444444"
          	},
          	"lastUpdate": "2000-01-01",
          	"features": [1,2,3]
        }
*/

  update( vehicle: SaveVehicle  ) {
    const backendSaveVehicle = this.serializeToDotNet(vehicle );
    return this.http.put(URL_SERVICIOS + endPoint_Vehiculos + '/' + vehicle.id,  backendSaveVehicle);
  }

  delete( id: number  ) {
    return this.http.delete(URL_SERVICIOS + endPoint_Vehiculos + '/' + id );
  }

  getVehicle( id ) {
    return this.http.get(URL_SERVICIOS + endPoint_Vehiculos + '/' + id );
  }

  private serializeToDotNet(vehicle: SaveVehicle) {
    const ret: BackendSaveVehicle =  {
            modelId: 0,
            isRegistered: false,
            contact: { name: '', email: '', phone: '' },
            lastUpdate: '2000-01-01',
            features: []
        };

        ret.modelId = vehicle.modelId;
        ret.isRegistered = vehicle.isRegistered;
        ret.contact = vehicle.contact;
        ret.lastUpdate = vehicle.lastUpdate;
        ret.features = vehicle.features;

        return ret;
  }

  getVehicles(filter) {
    return this.http.get(URL_SERVICIOS + endPoint_Vehiculos + '?' + this.toQueryString(filter));
  }

  toQueryString(obj: any[]) {
    const parts = [];
    // tslint:disable-next-line:forin
    for (const property in obj) { /* Esto es JS, no Typescript está iterando en los atributos. */

      const value = obj[property];
      if ( value != null && value !== undefined ) {
          parts.push(encodeURIComponent(property) + '=' +
                     encodeURIComponent(value)  );
      }
    }
    return parts.join('&');
  }
}
