import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Component/User/user/user.component';
import { AdminComponent } from './Component/Admin/admin/admin.component';
import { authGuard } from './auth.guard';
import { CourseComponent } from './Component/User/course/course.component';
import { PageNotFoundComponent } from './Component/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Component/User/user/user-routing.module').then(m => m.UserRoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./Component/Admin/admin/admin-routing.module').then(m => m.AdminRoutingModule)
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
