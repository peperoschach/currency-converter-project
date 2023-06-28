import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currencyCode: { [key: string]: string } = {
    CAD: 'CAD',
    ARS: 'ARS',
    GBP: 'GBP'
  };

  handleReloadCurrency(currency: string, newCurrencyCode: string): void {
    this.currencyCode[currency] = newCurrencyCode;
  }
}
