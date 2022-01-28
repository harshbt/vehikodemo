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

  getInterior(vehicleId: number){
    return this.http.get(`${environment.apiURL}/Master/interior?vehicleid=${vehicleId}`);
  }

  getTrimData(vehicleId: number,modelYear: number){
    return this.http.get(`${environment.apiURL}/SingleTrim/getsingletrim?vehicleId=${vehicleId}&modelYear=${modelYear}`);
  }

  getPowertrainRule(vehicleId: number, optionId: number){
    return this.http.get(`${environment.apiURL}/PowerTrainRules/allpowertrainrules?vehicleId=${vehicleId}&optionId=${optionId}`);
  }
}
