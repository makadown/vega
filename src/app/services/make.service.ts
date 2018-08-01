import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(private http: HttpClient) { }

  getMakes() {
       // console.log('Peticion a ', URL_SERVICIOS + '/api/makes');
       return this.http.get(URL_SERVICIOS + '/api/makes');
  }

}
