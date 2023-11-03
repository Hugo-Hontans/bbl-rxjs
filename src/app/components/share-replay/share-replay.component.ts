import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeObservableService } from 'src/app/services/fake-observable.service';
import { Observable, shareReplay, takeUntil, tap } from 'rxjs';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-share-replay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-replay.component.html',
  styleUrls: ['./share-replay.component.scss']
})
export class ShareReplayComponent extends AbstractComponent implements OnInit {

  interval1$: Observable<number> = this.fakeObsService.getInterval$().pipe(
    tap(() => console.log('interval 1')),
    takeUntil(this.destroy$)
  );

  interval2$: Observable<number> = this.fakeObsService.getInterval$().pipe(
    tap(() => console.log('interval 2')),
    takeUntil(this.destroy$),
    shareReplay()
  );

  constructor(private fakeObsService: FakeObservableService) {
    super();
  }

  ngOnInit(): void {
    this.interval1$.subscribe();

    this.interval2$.subscribe();
  }
}
