import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDetailPage } from './admin-details.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDetailPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../admin-stats/admin-stats.module').then(m => m.AdminStatsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/admin-details/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin-details/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDetailRoutingModule {}
