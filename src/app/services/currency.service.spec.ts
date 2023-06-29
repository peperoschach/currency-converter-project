import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';
import { CurrencyCard } from '../models/currency-card.model';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });
    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch currency data from the API', () => {
    const code = 'USD';

    service.getCurrencyData(code).subscribe((data: CurrencyCard) => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${code}`);
    expect(req.request.method).toBe('GET');
  });

  it('should return cached currency data if cache is valid', () => {
    const code = 'USD';
    const dummyData: CurrencyCard = {
      code: 'USD',
      name: 'Dólar Americano/Real Brasileiro',
      bid: '4.7957',
      pctChange: '0.6',
      create_date: '2023-06-27 16:27:10'
    };
    service['currencyData'] = dummyData;
    service['lastUpdate'] = Date.now() - service['cacheDuration'] / 2;

    service.getCurrencyData(code).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    httpMock.expectNone(`${service['apiUrl']}/${code}`);
  });

  it('should fetch currency data from the API if cache is expired', () => {
    const code = 'USD';
    service['currencyData'] = null;
    service['lastUpdate'] = Date.now() - service['cacheDuration'] * 2;

    service.getCurrencyData(code).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${code}`);
    expect(req.request.method).toBe('GET');
  });
});
