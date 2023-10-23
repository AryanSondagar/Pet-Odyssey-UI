import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminMarketplaceComponent } from '../admin-marketplace/admin-marketplace.component';
import { AdminCourseComponent } from '../admin-course/admin-course.component';
import { AdminAdoptionComponent } from '../admin-adoption/admin-adoption.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
    {path: 'admin', component: AdminComponent,
            children : [
                {
                    path: '' ,
                    component:AdminHomeComponent ,
                }
            ]
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'admin/marketplace', component: AdminMarketplaceComponent },
    { path: 'admin/course', component: AdminCourseComponent },
    { path: 'admin/adoption', component: AdminAdoptionComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
