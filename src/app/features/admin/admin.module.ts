import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../shared/shared.module';
import { AdminAdoptionComponent } from './manage-adoption/admin-adoption.component';
import { AdoptionListComponent } from './manage-adoption/adoption-list/adoption-list.component';
import { AdminCourseComponent } from './manage-courses/admin-course.component';
import { CoursListComponent } from './manage-courses/cours-list/cours-list.component';
import { AdminMarketplaceComponent } from './manage-marketplace/admin-marketplace.component';
import { ProductListComponent } from './manage-marketplace/product-list/product-list.component';
import { AdminRoutingModule } from './layout/admin-routing.module';
import { AdminComponent } from './layout/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LastFewTransactionsComponent } from './dashboard/last-few-transactions/last-few-transactions.component';
import { SalesByCategoryComponent } from './dashboard/sales-by-category/sales-by-category.component';
import { SalesByMonthComponent } from './dashboard/sales-by-month/sales-by-month.component';
import { TopThreeProductComponent } from './dashboard/top-three-product/top-three-product.component';
import { TopWidgetsComponent } from './dashboard/top-widgets/top-widgets.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    TopWidgetsComponent,
    SalesByMonthComponent,
    SalesByCategoryComponent,
    LastFewTransactionsComponent,
    TopThreeProductComponent,
    AdminAdoptionComponent,
    AdoptionListComponent,
    AdminCourseComponent,
    CoursListComponent,
    AdminMarketplaceComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    SharedModule,
    AdminRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
