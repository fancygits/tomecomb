import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let injector: TestBed;
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService]
    });
    injector = getTestBed();
    service = injector.get(BooksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#search', () => {
    let dummyParams = new HttpParams().set('q', 'harry potter');

    it('should fetch the data', () => {
      service.search(dummyParams).subscribe(result => {
          expect(result['items'].toBe(true))
          expect(result['items'].length).toBe(10);
        });

        const req = httpMock.expectOne(`${service.apiUrl}?q=harry%20potter&key=xxxxxxxxxxxxxx`);
        expect(req.request.url).toBe(`${service.apiUrl}`);
        expect(req.request.params.toString()).toEqual('q=harry%20potter&key=xxxxxxxxxxxxxx');
    });
  });

  it('should be created', () => {
    service = TestBed.get(BooksService);
    expect(service).toBeTruthy();
  });
});
