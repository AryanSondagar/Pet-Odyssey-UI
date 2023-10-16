import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' ;


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './Component/Admin/side-nav/side-nav.component';
import { HeaderComponent } from './Component/Admin/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './Component/Admin/dashboard/dashboard.component';
import { AdminMarketplaceComponent } from './Component/Admin/admin-marketplace/admin-marketplace.component';
import { AdminCourseComponent } from './Component/Admin/admin-course/admin-course.component';
import { AdminAdoptionComponent } from './Component/Admin/admin-adoption/admin-adoption.component';

@NgModule({
  declarations: [
    AppComponent,
  
    SideNavComponent,
    HeaderComponent,
    DashboardComponent,
    AdminMarketplaceComponent,
    AdminCourseComponent,
    AdminAdoptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
