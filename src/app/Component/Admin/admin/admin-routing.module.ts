import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminMarketplaceComponent } from '../admin-marketplace/admin-marketplace.component';
import { AdminCourseComponent } from '../admin-course/admin-course.component';
import { AdminAdoptionComponent } from '../admin-adoption/admin-adoption.component';
import { ProductListComponent } from '../admin-marketplace/product-list/product-list.component';
import { CoursListComponent } from '../admin-course/cours-list/cours-list.component';
import { AdoptionListComponent } from '../admin-adoption/adoption-list/adoption-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { authGuard } from 'src/app/auth.guard';



const routes: Routes = [
    {
        path: 'admin', component: AdminComponent,
        //canActivate: [authGuard] ,
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
    imports: [RouterModule.forRoot(routes), BrowserModule, CommonModule],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
