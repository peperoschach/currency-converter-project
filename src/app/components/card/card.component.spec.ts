import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { CurrencyService } from 'src/app/services/currency.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let currencyService: CurrencyService;
  let myService: CurrencyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CardComponent],
      providers: [CurrencyService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    spyOn(currencyService, 'getCurrencyData').and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch currency data on component initialization', () => {
    expect(currencyService.getCurrencyData).toHaveBeenCalledWith(component.currencyCode);
  });

  it('should fetch currency data again on currency code change', () => {
    const newCurrencyCode = 'EUR';
    const changes = { currencyCode: new SimpleChange(null, newCurrencyCode, false) };
    component.currencyCode = newCurrencyCode;
    component.ngOnChanges(changes);
    expect(currencyService.getCurrencyData).toHaveBeenCalledWith(newCurrencyCode);
  });


  it('should start interval and fetch currency data periodically', fakeAsync(() => {
    component.currencyCode = 'USD';
    component.ngOnInit();

    tick(1000);
    expect(currencyService.getCurrencyData).toHaveBeenCalledWith('USD');

    tick(5000);
    expect(currencyService.getCurrencyData).toHaveBeenCalledWith('USD');

    expect(currencyService.getCurrencyData).toHaveBeenCalledTimes(2);

    discardPeriodicTasks();
  }));

  it('should clear interval on component destruction', () => {
    spyOn(window, 'clearInterval');
    component['interval'] = 123;
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalledWith(123);
  });
});
