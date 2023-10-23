import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user.component';
import { UserHomeComponent } from './user-home.component';


const routes: Routes = [
    {
        path:'',
        component: UserComponent,
        children : [
            {
                path: '',
                component: UserHomeComponent 
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
