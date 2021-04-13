import { AssertNotNull } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private weather: WeatherService) {}

  searchForm = new FormGroup({
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    continent: new FormControl('')
  })
  
  ngOnInit(): void {
  }

  collectReport(){
    console.clear();

    var warning = document.getElementById("warning")!;
    warning.innerText = "";
    var city = this.searchForm.value.city;
    var state = this.searchForm.value.state;
    var country = this.searchForm.value.country;
    var continent = this.searchForm.value.continent;
    
    var outputSection = document.getElementById("outputSection")!;
        outputSection.innerHTML = "";
    if(city!= "" && state!= "" && country!= "" && continent!= ""){
      //--------------------------------------------------------------------------------------
      //modifying the string "city" to proper case 
      var first_character = city.substr(0, 1).toUpperCase();
      city = city.substr(1, city.length-1).toLowerCase()
      city = first_character + city;
      console.log(city);
      var count = 0;
       for(var i = 0; i < city.length-1; i++ ){
        if(city[i] == " "){
          count++;
        } 
      }
      var index = 0;
      for(i = 0; i < count; i++){
        index = city.indexOf(" ", index);
        console.log(index);
        first_character = city.substr(index+1, 1).toUpperCase();
        var one_half = city.substr(0, index+1);
        var second_half = city.substr(index+2, city.length-(index+2)); 
        city = one_half + first_character + second_half;
        index = index + 2;
      }
      // console.log(city);
      //--------------------------------------------------------------------------------------
      //modifying the string "state" to proper case 
      first_character = state.substr(0, 1).toUpperCase();
      state = state.substr(1, state.length-1).toLowerCase();
      state = first_character + state;
      var count = 0;
      for(var i = 0; i < state.length-1; i++ ){
        if(state[i] == " "){
          count++;
        } 
      }
      var index = 0;
      for(i = 0; i < count; i++){
        index = state.indexOf(" ", index);
        console.log(index);
        first_character = state.substr(index+1, 1).toUpperCase();
        var one_half = state.substr(0, index+1);
        var second_half = state.substr(index+2, state.length-(index+2)); 
        state = one_half + first_character + second_half;
        index = index + 2;
      }
      // console.log(state);
      //--------------------------------------------------------------------------------------
      //modifying the string "country" to proper case  //start here
      first_character = country.substr(0, 1).toUpperCase();
      country = country.substr(1, country.length-1).toLowerCase();
      country = first_character + country;
      var count = 0;
      for(var i = 0; i < country.length-1; i++ ){
        if(country[i] == " "){
          count++;
        } 
      }
      var index = 0;
      for(i = 0; i < count; i++){
        index = country.indexOf(" ", index);
        console.log(index);
        first_character = country.substr(index+1, 1).toUpperCase();
        var one_half = country.substr(0, index+1);
        var second_half = country.substr(index+2, country.length-(index+2)); 
        country = one_half + first_character + second_half;
        index = index + 2;
      }
      // console.log(country);
      //--------------------------------------------------------------------------------------
      //modifying the string "continent" to proper case  
      first_character = continent.substr(0, 1).toUpperCase();
      continent = continent.substr(1, continent.length-1).toLowerCase();
      continent = first_character + continent;
      console.log(continent);
      var count = 0;
      for(var i = 0; i < continent.length-1; i++ ){
        if(continent[i] == " "){
          count++;
        } 
      }
      var index = 0;
      for(i = 0; i < count; i++){
        index = continent.indexOf(" ", index);
        console.log(index);
        first_character = continent.substr(index+1, 1).toUpperCase();
        var one_half = continent.substr(0, index+1);
        var second_half = continent.substr(index+2, continent.length-(index+2)); 
        continent = one_half + first_character + second_half;
        index = index + 2;
      }
      // console.log(continent);
      //--------------------------------------------------------------------------------------
      this.weather.getLocationCode(city).subscribe((result: any) => {
        console.log(result);
        let end = result.length; 
      
        count = 0;
        for(let i = 0; i < end; i++){
          if( state == result[i].AdministrativeArea['EnglishName'] ){
            if( country == result[i].Country['EnglishName'] ) {
              if( city == result[i].EnglishName ) {
                if( continent == result[i].Region['EnglishName'] ) {
                  count++;
                  this.weather.getWeatherReport(result[i].Key).subscribe((result: any)=>{
                    console.log(result[0].RainProbability);
                    console.log(result[0].Temperature['Value']);
                    
                    var outputEle = document.createElement("div"); 
                    outputEle.innerHTML = `<br>Rain probability: &nbsp;` + result[0].RainProbability + `<br>Today's temperature: ` + result[0].Temperature['Value'];

                    outputSection?.appendChild(outputEle);
                  });
                }
              }
            }
          }
          console.log("");
        } // for loop ends
        
        if(count > 1){
          var outputConfusionEle = document.createElement("div");
          outputConfusionEle.innerHTML = `<span style="color: rgb(95, 57, 233)"><br>* With your specified search, there are more than one result, you decide which one to choose<br>`;
          outputSection?.appendChild(outputConfusionEle);
        } else if(count == 0){
          var noResultEl = document.createElement("div");
          noResultEl.innerHTML = `<span style="color: red"><br>* No result with your specified location<br></span>`;
          outputSection?.appendChild(noResultEl);
        }
        
      }
      //--------------------------------------------------------------------------------------
      );
    } else {
      warning.innerText = "* All fields are mandatory";
    }
  }

  clearAll(){
    console.log("Clear button is clicked");
    window.location.reload();
  }

}


