import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Dog {
  name: string;
  color: string;
}

export interface User {
  movieIds: number[];
}


export interface Movie {
  id: number;
  name: string;
}

@Injectable()
export class ApiService {

  private _dogs: Dog[] = [{ name: 'Snoopy', color: 'beige' }, { name: 'Idéfix', color: 'blanc' }, { name: 'Rantanplan', color: 'blanc' }, { name: 'Rex', color: 'black' }];

  constructor() { }

  getDogs(searchValue: string): Observable<Dog[]> {
    const dogs = this._dogs.filter(dog => dog.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    return of(dogs);
  }
}
