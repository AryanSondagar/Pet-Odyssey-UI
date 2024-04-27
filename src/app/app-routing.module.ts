import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Component/User/user/user.component';
import { AdminComponent } from './Component/Admin/admin/admin.component';
import { PageNotFoundComponent } from './Component/page-not-found/page-not-found.component';


const routes: Routes = [
    {path: '' , component: UserComponent},
    {path: 'admin', component: AdminComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
