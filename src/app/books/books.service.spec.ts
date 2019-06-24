import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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

  it('should be created', () => {
    service = TestBed.get(BooksService);
    expect(service).toBeTruthy();
  });

  it('should get a list of books about harry potter', () => {
    service = TestBed.get(BooksService);
    service.getBookList('harry potter', 0).subscribe(books => {
      expect(books['items']).toBe(true);
      expect(books['items'].length).toBe(10);
    })
    //expect(service.getBookList('harry potter', 0)).toBe('json');
  });
});
