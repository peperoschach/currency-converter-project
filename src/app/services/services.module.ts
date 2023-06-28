import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyService } from './currency.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CurrencyService
  ]
})
export class ServicesModule { }
