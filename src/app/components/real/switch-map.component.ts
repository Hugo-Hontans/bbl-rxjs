import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../abstract.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, startWith, switchMap, tap } from 'rxjs';
import { ApiService, Dog } from 'src/app/services/api.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-switch-map',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, AsyncPipe, JsonPipe, NgIf],
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss'],
  providers: [ApiService]
})
export class SwitchMapComponent extends AbstractComponent implements OnInit {

  dogControl = new FormControl<string>('');

  filteredDogs$: Observable<Dog[]> | undefined;

  constructor(private apiServie: ApiService) {
    super();
  }

  ngOnInit(): void {
    this.filteredDogs$ = this.dogControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(console.log),
      switchMap(value => this.apiServie.getDogs(value))
    );
  }
}
