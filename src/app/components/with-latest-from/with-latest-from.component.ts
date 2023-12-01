import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractComponent } from '../abstract.component';
import { FakeObservableService } from 'src/app/services/fake-observable.service';
import { Observable, interval, map, takeUntil, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-with-latest-from',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './with-latest-from.component.html',
  styleUrls: ['./with-latest-from.component.scss'],
  providers: [FakeObservableService]
})
export class WithLatestFromComponent extends AbstractComponent implements OnInit {

  private _interval1$: Observable<number> = this.fakeObsService.getInterval$();

  private _interval2$: Observable<number> = interval(1000);

  interval3$: Observable<string> | undefined;

  constructor(private fakeObsService: FakeObservableService) {
    super();
  }

  ngOnInit(): void {
    this.interval3$ = this._interval1$.pipe(
      withLatestFrom(this._interval2$),
      map(([int1, int2]) => {
        return `Interval 1 (3s): ${int1} Interval 2 (1s): ${int2}`;
      }),
      takeUntil(this.destroy$)
    );
  }
}
