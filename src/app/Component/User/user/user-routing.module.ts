import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './login/userlogin/userlogin.component';
import { AdminloginComponent } from './login/userlogin/adminlogin/adminlogin.component';
import { UserComponent } from './user.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';

const routes: Routes = [
        {path: 'UserLogin' , component: UserloginComponent},
        {path: 'AdminLogin', component: AdminloginComponent},
        {path: '**' , component: PageNotFoundComponent },
        {path: '', component:UserComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}