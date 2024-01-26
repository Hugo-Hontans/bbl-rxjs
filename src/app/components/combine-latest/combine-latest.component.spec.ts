import { CombineLatestComponent } from "./combine-latest.component";
import { waitForAsync } from '@angular/core/testing';


describe('CombineLatestComponent', () => {
    let component: CombineLatestComponent;

    beforeEach(() => {
        component = new CombineLatestComponent();
        component.ngOnInit();
    });

    it('Should have new movie in userMovies$ when addUserFavoriteMovie', waitForAsync(() => {
        // WHEN
        component.userFavoriteMovieControl.setValue(5);
        component.addUserFavoriteMovie();

        // THEN
        component.userMovies$.subscribe({
            next: (userMovies) => expect(userMovies).toEqual([
                { id: 2, name: 'Rome' },
                { id: 3, name: 'Paris' },
                { id: 5, name: 'Londres' }
            ]),
            error: (err) => fail(err)
        });
    }));

    it('Should have new movie in userMovies$ when addMovie', waitForAsync(() => {
        // GIVEN
        component['_user$'].next({ movieIds: [2, 3, 7] });

        // WHEN
        component.movieControl.setValue('Genève');
        component.addMovie();

        // THEN
        component.userMovies$.subscribe({
            next: (userMovies) => expect(userMovies).toEqual([
                { id: 2, name: 'Rome' },
                { id: 3, name: 'Paris' },
                { id: 7, name: 'Genève' }
            ]),
            error: (err) => fail(err)
        });
    }));
});