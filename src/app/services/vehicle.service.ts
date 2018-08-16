import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/url.servicios';
import { SaveVehicle, BackendSaveVehicle } from '../models/SaveVehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getMakes() {
       // console.log('Peticion a ', URL_SERVICIOS + '/api/makes');
       return this.http.get(URL_SERVICIOS + '/api/makes');
  }

  public getFeatures() {
    return this.http.get(URL_SERVICIOS + '/api/features');
  }

  create( vehicle: SaveVehicle ) {
    const backendSaveVehicle = this.serializeToDotNet(vehicle );
    return this.http.post(URL_SERVICIOS + '/api/vehicles', backendSaveVehicle);
  }

  update( vehicle: SaveVehicle  ) {
    const backendSaveVehicle = this.serializeToDotNet(vehicle );
    return this.http.put(URL_SERVICIOS + '/api/vehicles/' + vehicle.id,  backendSaveVehicle);
  }

  getVehicle( id ) {
    return this.http.get(URL_SERVICIOS + '/api/vehicles/' + id );
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

}
