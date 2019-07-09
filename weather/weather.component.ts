import { Component, OnInit } from '@angular/core';
import { WeatherdataService } from '../weatherdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  location={
    city:'london',
    code:'uk'
  };
  unit: string = "far";

  city: string;
  code: string;
  weather: any;
  value: any;
  imgURL: string;
  focusing: boolean = false;

  constructor(private _weatherService: WeatherdataService, private route: Router) {

  }

  ngOnInit() {
    this.value = localStorage.getItem('location');
    if (this.value != null){
      this.location = JSON.parse(this.value);
    } else {
      this.location={
        city:'london',
        code:'uk'
      };
    }

    if (localStorage.getItem('unit') != null){
      localStorage.setItem('unit', this.unit);
      this.unit = localStorage.getItem('unit');
    } else {
      localStorage.setItem("unit", "far");
    }
    console.log(localStorage.getItem('unit'));

    this.updateWeather(this.location.city, this.location.code);
  }

  updateWeather(city, code){
    this._weatherService.getWeather(city, code).subscribe((response)=>{
      this.weather = response;
      this.imgURL = "http://openweathermap.org/img/w/" + this.weather.weather[0].icon + ".png";
      switch (this.unit) {
        case "far":
          this.weather.main.temp = Math.round(((this.weather.main.temp-273.15)*1.8)+32);
          break;
        case "cel":
          this.weather.main.temp = Math.round(this.weather.main.temp-273.15);
      }
      console.log(response);
    });
  }

  convertUnits(to){
    var from = localStorage.getItem('unit');
    var curTemp = this.weather.main.temp;
    switch (from) {
      case "far":
        if (to == "cel"){
          curTemp = (curTemp-32)/1.8;
        } else if (to == "kel"){
          curTemp = ((curTemp-32)/1.8)+273.15;
        }
      break;
    case "cel":
      if (to == "far"){
        curTemp = (curTemp*1.8)+32;
      } else if (to == "kel"){
        curTemp += 273.15;
      }
      break;
    case "kel":
      if (to == "far"){
        curTemp = ((curTemp-273.15)*1.8)+32;
      } else if (to == "cel"){
        curTemp -= 273.15;
      }
    }
    localStorage.setItem('unit', to);
    this.unit = localStorage.getItem('unit');
    this.weather.main.temp = Math.round(curTemp);
  }

  pressEnter(event) {
    if (event.key === "Enter"){
      this.saveCity();
    }
  }

  detectFocus(focus){
    if (focus == true){
      this.focusing = true;
    } else {
      this.focusing = false;
    }
    console.log(this.focusing);
  }

  saveCity(){
    let inputLocation = {
      city: this.city,
      code: this.code
    }

    localStorage.setItem('location', JSON.stringify(inputLocation));
    this.updateWeather(inputLocation.city, inputLocation.code);
  }

}
