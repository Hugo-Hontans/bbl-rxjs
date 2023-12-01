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
  },
  {
    path: 'from-event',
    loadComponent: () => import('./components/from-event/from-event.component').then((c) => c.FromEventComponent)
  },
  {
    path: 'distinct-until-changed',
    loadComponent: () => import('./components/distinct-until-changed/distinct-until-changed.component').then((c) => c.DistinctUntilChangedComponent)
  },
  {
    path: 'switch-map',
    loadComponent: () => import('./components/real/switch-map.component').then((c) => c.SwitchMapComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
