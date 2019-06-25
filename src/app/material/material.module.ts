import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule,
  ],
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule,
  ]
})
export class MaterialModule { }
