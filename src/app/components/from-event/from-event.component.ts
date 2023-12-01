import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, fromEvent, takeUntil, tap } from 'rxjs';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-from-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent extends AbstractComponent implements AfterViewInit {
  @ViewChild('zone') zone!: ElementRef;

  ngAfterViewInit(): void {
    const mouseOver$: Observable<MouseEvent> = fromEvent(this.zone.nativeElement, 'mouseover');

    mouseOver$.pipe(
      tap(event => console.log(event)),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
