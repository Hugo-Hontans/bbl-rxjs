import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, interval, take, tap } from 'rxjs';
import { AbstractComponent } from '../abstract.component';

interface Dog {
  name: string;
  color: string;
}

@Component({
  selector: 'app-distinct-until-changed',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './distinct-until-changed.component.html',
  styleUrls: ['./distinct-until-changed.component.scss']
})
export class DistinctUntilChangedComponent extends AbstractComponent implements OnInit {

  colorDogChanged$: Observable<Dog> | undefined;

  private _selectedDog$: BehaviorSubject<Dog> = new BehaviorSubject({ name: 'Toutou', color: 'beige' });

  private dogs: Dog[] = [{ name: 'Snoopy', color: 'beige' }, { name: 'Idéfix', color: 'blanc' }, { name: 'Rantanplan', color: 'blanc' }, { name: 'Rex', color: 'black' }];

  ngOnInit(): void {
    this.colorDogChanged$ = this._selectedDog$.pipe(
      filter(dog => !!dog),
      distinctUntilChanged((previous, current) => {
        return previous.color === current.color;
      })
    );
    // On pourrait utiliser distinctUntilKeyChanged('color')


    let index = 0;
    interval(3000).pipe(
      take(4),
      tap(() => {
        this._selectedDog$.next(this.dogs[index]);
        index ++;
      }),
    ).subscribe();
  }
}
