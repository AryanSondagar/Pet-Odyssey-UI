import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from '../../userlogin/userlogin.component';

import { UserComponent } from './user.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';


const routes: Routes = [
        {path: 'UserLogin' , component: UserloginComponent},
        {path: '**' , component: PageNotFoundComponent },
        {path: '', component:UserComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}