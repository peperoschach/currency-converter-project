import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrencyCard } from '../models/currency-card.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiUrl = environment.apiUrl;
  private cacheDuration = 180000; // 3 minutes
  private currencyData: CurrencyCard | null = null;
  private lastUpdate: number = 0;

  constructor(private http: HttpClient) { }

  public getCurrencyData(code: string): Observable<CurrencyCard> {
    if (this.isCacheValid()) {
      return of(this.currencyData!);
    } else {
      return this.fetchCurrencyData(code).pipe(
        switchMap(data => {
          this.currencyData = data;
          this.lastUpdate = Date.now();
          return of(this.currencyData!);
        })
      );
    }
  }

  private fetchCurrencyData(code: string): Observable<CurrencyCard> {
    return this.http.get<CurrencyCard>(`${this.apiUrl}/${code}`);
  }

  private isCacheValid(): boolean {
    return this.lastUpdate + this.cacheDuration > Date.now();
  }
}
