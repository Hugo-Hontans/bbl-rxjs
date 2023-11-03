import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeObservableService {

  constructor() { }

  getInterval$(): Observable<number> {
    return interval(3000);
  }
}
