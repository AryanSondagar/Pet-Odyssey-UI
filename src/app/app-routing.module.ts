import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('@features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'UserLogin',
    loadChildren: () => import('@features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'training/:id',
    loadChildren: () => import('@features/courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('@features/marketplace/marketplace.module').then(m => m.MarketplaceModule)
  },
  {
    path: 'pet-detail/:id',
    loadChildren: () => import('@features/adoption/adoption.module').then(m => m.AdoptionModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('@features/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [authGuard],
    data: { roles: ['user', 'User'] }
  },
  {
    path: 'admin',
    loadChildren: () => import('@features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent 
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
