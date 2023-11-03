import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'share-replay',
    loadComponent: () => import('./components/share-replay/share-replay.component').then((c) => c.ShareReplayComponent)
  },
  {
    path: 'with-latest-from',
    loadComponent: () => import('./components/with-latest-from/with-latest-from.component').then((c) => c.WithLatestFromComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
