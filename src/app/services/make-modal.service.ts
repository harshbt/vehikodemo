import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Make } from '../models/make';

@Injectable({
  providedIn: 'root'
})
export class MakeModalService {

  constructor(private http: HttpClient) { }

  getMakeList(): Observable<Make>{
    return this.http.get<Make>(`${environment.apiURL}/master/makes`);
  }
 
  getModelList(makeId: BigInteger){
    return this.http.get(`${environment.apiURL}/master/models?makeId=${makeId}`);
  }
}
