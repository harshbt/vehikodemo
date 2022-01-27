import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectPackageService {

  constructor(private http: HttpClient) { }

  getPackages(vehicleId:number){
    return this.http.get(`${environment.apiURL}/master/package?vehicleId=${vehicleId}`);
  }

  getInfo(vehicleId: number, optionCode: string) {
    return this.http.get(`${environment.apiURL}/master/description?vehicleId=${vehicleId}&OptionCode=${optionCode}`);
  }

  getTrimData(vehicleId:number,modelYear:number){
    debugger
    return this.http.get(`${environment.apiURL}/SingleTrim/getsingletrim?vehicleId=${vehicleId}&modelYear=${modelYear}`);
  }

  getInterior(vehicleId:number){
    return this.http.get(`${environment.apiURL}/Master/Interior?vehicleId=${vehicleId}`)
  }
}
