import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY} from 'rxjs';
import { switchMap, catchError} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private baseWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private urlSuffix = '&units=imperial&appid=b7c0ba47ae69cf90b384cba18e2bd837';

  searchInput = new FormControl();
  weather: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(switchMap(city => this.getWeather(city)))
      .subscribe(
        res => {this.weather = `Current temperature is ${res.main.temp}F, humidity: ${res.main.humidity}%`; },
        err => console.log(`Can't get weather. Error code: %s, URL: %s`, err.message, err.url)
       )
  }

  getWeather(city: string): Observable<any> {
    return this.http.get(this.baseWeatherURL + city + this.urlSuffix)
      .pipe(catchError(err => {
        if (err.status === 404) {
          console.log(`City ${city} not found`);
          return EMPTY;
        }
       })
      );
  }
}
