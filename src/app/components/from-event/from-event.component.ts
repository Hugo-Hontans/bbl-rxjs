import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, takeUntil, tap } from 'rxjs';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-from-event',
  standalone: true,
  imports: [],
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent extends AbstractComponent implements AfterViewInit {
  @ViewChild('zone') zone!: ElementRef;

  ngAfterViewInit(): void {
    const mouseOver$: Observable<MouseEvent> = fromEvent(this.zone.nativeElement, 'mouseover');

    mouseOver$.pipe(
      tap(console.log),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
