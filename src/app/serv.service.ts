import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, skipWhile, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  constructor(private http : HttpClient) { }

  getData(data){
     

    return this.http.get('https://localhost:44316/api/MonthlyReportDetails', 
    {
      params: new HttpParams()
      .set('SearchText', data)
      }).pipe(
        map((response:[]) => response.map(item => item['MyDesc']))
      )
  }
}
