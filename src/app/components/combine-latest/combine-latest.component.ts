import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Movie, User } from 'src/app/services/api.service';

@Component({
  selector: 'app-combine-latest',
  standalone: true, 
  imports: [AsyncPipe, JsonPipe, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.scss']
})
export class CombineLatestComponent implements OnInit {

  private _user$: BehaviorSubject<User> = new BehaviorSubject({ movieIds: [2, 3] });

  private _movies$: BehaviorSubject<Movie[]> = new BehaviorSubject([
    { id: 1, name: 'Lyon' },
    { id: 2, name: 'Rome' },
    { id: 3, name: 'Paris' },
    { id: 4, name: 'Berlin' },
    { id: 5, name: 'Londres' },
    { id: 6, name: 'Madrid' }
  ]);

  userFavoriteMovieControl = new FormControl<number>(null);

  movieControl = new FormControl<string>('');

  userMovies$: Observable<Movie[]>;

  ngOnInit(): void {
    this.userMovies$ = combineLatest([this._user$, this._movies$]).pipe(
      map(([user, allMovies]) => allMovies.filter(movie => user.movieIds.includes(movie.id)))
    )
  }

  addUserFavoriteMovie(): void {
    this._user$.next({ movieIds: [...this._user$.value.movieIds, this.userFavoriteMovieControl.value] });
    this.userFavoriteMovieControl.reset();
  }

  addMovie(): void {
    this._movies$.next([...this._movies$.value, { id: this._movies$.value.length + 1, name: this.movieControl.value }]);
    this.movieControl.reset();
  }
}
