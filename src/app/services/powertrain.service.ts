import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PowertrainService {

  constructor(private http: HttpClient) { }

  getOptions(vehicleId: number) {
    return this.http.get(`${environment.apiURL}/master/option?vehicleId=${vehicleId}`);
  }

  getInfo(vehicleId: number, optionCode: string) {
    return this.http.get(`${environment.apiURL}/master/description?vehicleId=${vehicleId}&OptionCode=${optionCode}`);
  }
}
