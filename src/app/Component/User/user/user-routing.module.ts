import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from '../../userlogin/userlogin.component';

import { UserComponent } from './user.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { CourseComponent } from '../course/course.component';
import { ProductComponent } from '../product/product.component';
import { AdoptComponent } from '../adopt/adopt.component';


const routes: Routes = [
        {path: 'UserLogin' , component: UserloginComponent},
        {path: 'training/:id' , component:CourseComponent },
        {path: 'product/:id' , component:ProductComponent },
        {path: 'pet-detail/:id' , component:AdoptComponent },
        {path: '**' , component: PageNotFoundComponent },
        {path: '', component:UserComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}