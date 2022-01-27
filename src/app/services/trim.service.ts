import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrimService {
  
  constructor(private http: HttpClient) { }

  getTrim(modelName: string, modelYear: number) {
    return this.http.get(`${environment.apiURL}/master/Trim?urlModelName=${modelName}&ModelYear=${modelYear}`);
  }

  getModelYears() {
    return this.http.get(`${environment.apiURL}/master/year`);
  }
}
