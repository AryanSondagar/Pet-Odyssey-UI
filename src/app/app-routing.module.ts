import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Component/Admin/dashboard/dashboard.component';
import { AdminMarketplaceComponent } from './Component/Admin/admin-marketplace/admin-marketplace.component';
import { AdminCourseComponent } from './Component/Admin/admin-course/admin-course.component';
import { AdminAdoptionComponent } from './Component/Admin/admin-adoption/admin-adoption.component';

const routes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent  },
    { path: 'marketplace',
    component: AdminMarketplaceComponent },
    { path: 'course',
    component:  AdminCourseComponent},
    { path: 'adoption',
    component: AdminAdoptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
