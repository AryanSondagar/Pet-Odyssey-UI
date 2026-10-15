import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminMarketplaceComponent } from '../manage-marketplace/admin-marketplace.component';
import { AdminCourseComponent } from '../manage-courses/admin-course.component';
import { AdminAdoptionComponent } from '../manage-adoption/admin-adoption.component';
import { ProductListComponent } from '../manage-marketplace/product-list/product-list.component';
import { CoursListComponent } from '../manage-courses/cours-list/cours-list.component';
import { AdoptionListComponent } from '../manage-adoption/adoption-list/adoption-list.component';
import { authGuard } from '@core/guards/auth.guard';



const routes: Routes = [
    {
        path: '', component: AdminComponent,
        canActivate: [authGuard],
        data: { roles: ['admin'] },
        // canActivate: [authGuard],
        // data: { role: 'Admin' },
        children: [
            { path: '', redirectTo: 'marketplace', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'marketplace', component: AdminMarketplaceComponent },
            { path: 'course', component: AdminCourseComponent },
            { path: 'adoption', component: AdminAdoptionComponent },
            { path: 'productlist', component: ProductListComponent },
            { path: 'courselist', component: CoursListComponent },
            { path: 'adoptionlist', component: AdoptionListComponent },
            { path: '**', redirectTo: 'marketplace' },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
