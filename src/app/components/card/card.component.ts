import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyCard } from 'src/app/models/currency-card.model';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() currencyCode!: string;
  @Output() reloadCurrencyCode = new EventEmitter<string>();
  public isLoading = false;
  public error = false;
  public currencyData: CurrencyCard | null = null;
  private interval: any;
  private subscription = new Subscription();

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.startInterval();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currencyCode'] && !changes['currencyCode'].firstChange) {
      this.restartInterval();
    }
  }

  ngOnDestroy(): void {
    this.clearInterval();
    this.subscription.unsubscribe();
  }

  private fetchCurrencyData(): void {
    this.isLoading = true;
    this.error = false;
    this.subscription.unsubscribe();
    this.subscription = this.currencyService.getCurrencyData(this.currencyCode).subscribe({
      next: (data: CurrencyCard) => {
        this.currencyData = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.error = true;
        this.isLoading = false;
      }
    });
  }

  public formattedDateCreate(value: string | undefined): string {
    if (value) {
      return value.slice(11, 19) || '-';
    }
    return '-';
  }

  public formattedName(value: string | undefined): string {
    if (value) {
      const nameParts = value.split('/');
      return nameParts[0].trim() || '-';
    }
    return '-';
  }

  public parseCurrencyValue(value: string | undefined): number {
    return parseFloat(value || '0');
  }

  public handleReloadCurrency(): void {
    this.reloadCurrencyCode.emit(this.currencyCode);
    this.restartInterval();
  }

  private startInterval(): void {
    this.fetchCurrencyData();
    this.interval = setInterval(() => {
      this.fetchCurrencyData();
    }, 180000);
  }

  private restartInterval(): void {
    this.clearInterval();
    this.startInterval();
  }

  private clearInterval(): void {
    clearInterval(this.interval);
  }
}
