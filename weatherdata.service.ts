import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {

  apiKey = 'dddea517d20006e67057f0d164efc44b';
  url;

  constructor(private http: HttpClient) {
    this.url='http://api.openweathermap.org/data/2.5/weather?q=';
  }

  getWeather(city, code) {
    return this.http.get<WeatherdataService>(this.url+city+','+code+'&apikey='+this.apiKey);
  }
}
