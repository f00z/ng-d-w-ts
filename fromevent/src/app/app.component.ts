import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, pipe } from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  searchInput = new FormControl('');
  constructor(){
    this.searchInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe(stock => this.getStockQuoteFromServer(stock));
  }
    
  getStockQuoteFromServer(stock: string){
    console.log(`The price of ${stock} is ${(100 * Math.random()).toFixed(4)}`);
  }
}
