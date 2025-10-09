import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Component/User/user/user.component';
import { AdminComponent } from './Component/Admin/admin/admin.component';
import { authGuard } from './auth.guard';
import { CourseComponent } from './Component/User/course/course.component';


const routes: Routes = [
  {
    path: '', component: UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
