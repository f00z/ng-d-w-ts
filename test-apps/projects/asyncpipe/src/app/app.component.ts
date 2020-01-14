import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `{{numbers$ | async}}`
  
})
export class AppComponent {
  numbers$: Observable<number> = interval(1000)
                                  .pipe(take(10));
}
