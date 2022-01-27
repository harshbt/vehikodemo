import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectColorService {

  constructor(private http: HttpClient) { }

  getColors(vehicleId:number){
    return this.http.get(`${environment.apiURL}/master/color?vehicleid=${vehicleId}`);
  }
}
