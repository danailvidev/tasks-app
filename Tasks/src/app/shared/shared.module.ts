import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { SpinnerComponent } from '../common/spinner/spinner.component';
import { MaterialModule } from '@angular/material';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }