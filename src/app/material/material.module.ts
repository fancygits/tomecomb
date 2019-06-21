import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatInputModule
  ]
})
export class MaterialModule { }
