import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  saveRe() {
    throw new Error('Method not implemented.');
  }
  
  apikey = "SjwGvPH2rg7AYpOAmGsfDLEl8MP1UmwJ"; 
  // SjwGvPH2rg7AYpOAmGsfDLEl8MP1UmwJ
  getLocationCodeUrl = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=";
  // weatherForecastUrl = "http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/206690?apikey=SjwGvPH2rg7AYpOAmGsfDLEl8MP1UmwJ&details=true&metric=true";
  weatherForecastUrl = "http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/";


  getLocationCode(city: string){
    return this.http.get(`${this.getLocationCodeUrl}${this.apikey}&q=${city}`);
  }

  getWeatherReport(locationKey: number){
    // console.log(locationKey);
    return this.http.get(`${this.weatherForecastUrl}${locationKey}?apikey=${this.apikey}&details=true&metric=true`);
  }
}
