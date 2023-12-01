import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable()
export class FakeObservableService {

  constructor() { }

  getInterval$(): Observable<number> {
    return interval(3000);
  }
}
