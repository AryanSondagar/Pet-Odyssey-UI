import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { OpenDialogComponent } from './components/open-dialog/open-dialog.component';

@NgModule({
  declarations: [OpenDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [OpenDialogComponent],
})
export class SharedModule {}
