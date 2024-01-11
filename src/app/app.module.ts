import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './Component/Admin/dashboard/dashboard.component';
import { AdminMarketplaceComponent } from './Component/Admin/admin-marketplace/admin-marketplace.component';
import { AdminCourseComponent } from './Component/Admin/admin-course/admin-course.component';
import { AdminAdoptionComponent } from './Component/Admin/admin-adoption/admin-adoption.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminComponent } from './Component/Admin/admin/admin.component';
import { UserHomeComponent } from './Component/User/user/user-home/user-home.component';
import { UserComponent } from './Component/User/user/user.component';

import { AdminRoutingModule } from './Component/Admin/admin/admin-routing.module';
import { UserRoutingModule } from './Component/User/user/user-home/user-routing.module';
import { AdminHomeComponent } from './Component/Admin/admin/admin-home/admin-home.component';
import { AdoptionFormComponent } from './Component/Admin/admin-adoption/adoption-form/adoption-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JsonPipe } from '@angular/common';
import { TopWidgetsComponent } from './Component/Admin/dashboard/top-widgets/top-widgets.component';
import { SalesByMonthComponent } from './Component/Admin/dashboard/sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from './Component/Admin/dashboard/sales-by-category/sales-by-category.component';
import { LastFewTransactionsComponent } from './Component/Admin/dashboard/last-few-transactions/last-few-transactions.component';
import { TopThreeProductComponent } from './Component/Admin/dashboard/top-three-product/top-three-product.component';


@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    AdminMarketplaceComponent,
    AdminCourseComponent,
    AdminAdoptionComponent,
    AdminComponent,
    UserHomeComponent,
    UserComponent,
    AdminHomeComponent,
    AdoptionFormComponent,
    TopWidgetsComponent,
    SalesByMonthComponent,
    SalesByCategoryComponent,
    LastFewTransactionsComponent,
    TopThreeProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    JsonPipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
