import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptComponent } from './pet-detail/adopt.component';

const routes: Routes = [{ path: '', component: AdoptComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionRoutingModule {}
