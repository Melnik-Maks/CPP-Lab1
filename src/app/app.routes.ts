import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'cloud',
    loadComponent: () => import('./cloud/cloud.page').then((m) => m.CloudPage)
  },
  {
    path: 'abstract-class',
    loadComponent: () =>
      import('./abstract-class/abstract-class.page').then((m) => m.AbstractClassPage)
  },
  {
    path: 'service-page',
    loadComponent: () =>
      import('./service-page/service-page.page').then((m) => m.ServicePagePage)
  },
  {
    path: 'gift-shop',
    loadComponent: () =>
      import('./gift-shop/gift-shop.page').then((m) => m.GiftShopPage)
  }
];
