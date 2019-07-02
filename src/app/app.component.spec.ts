import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { BooksService } from './books/books.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MOCKBOOK } from './books/book.mock';
import { of } from 'rxjs';
import { PageEvent } from '@angular/material';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let component: AppComponent;
  let booksService: BooksService;
  let booksSpy: jasmine.Spy;
  let searchSpy: jasmine.Spy;
  let mockBook = MOCKBOOK;

  beforeEach(async(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [BooksService]
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(AppComponent);
    de = fixture.debugElement;

    // BooksService provided by Component
    booksService = de.injector.get(BooksService);
    booksSpy = spyOn(booksService, 'search').and.returnValue(of(mockBook));
  }));

  describe('layout', () => {
    it('should create the app', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it(`should have as title 'Tome Comb'`, () => {
      expect(fixture.componentInstance.title).toEqual('Tome Comb');
    });

    it('should have an image tag with the title in an alt attribute', () => {
      const logoDe = fixture.debugElement.query(By.css('img'));
      const logo: HTMLElement = logoDe.nativeElement;
      expect(logo.getAttribute('alt')).toBe('Tome Comb');
    });
  });

  describe('#search', () => {
    it('should get book results and go to page 0', () => {
      fixture.detectChanges();
      let inst = fixture.componentInstance;
      inst.bookSearchbar.nativeElement.value = 'harry potter';
      fixture.whenStable().then(() => {
        inst.hiddenSearch();
        expect(booksSpy).toHaveBeenCalled();
        expect(fixture.componentInstance.apiResponse).toBe(mockBook);
        expect(fixture.componentInstance.currentPage).toBe(0);
      });
    });

    it('should return empty observable when search term is blank', () => {
      let inst = fixture.componentInstance;
      inst.bookSearchbar.nativeElement.value = '';
      inst.hiddenSearch();
      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.apiResponse).toEqual([]);
      });
    });
  });

  describe('pagination', () => {
    it('should move to the next page and get the next set of results', () => {
      expect(de.query(By.css('mat-paginator'))).toBeFalsy();
      de.componentInstance.apiResponse = {'totalItems': 2405 };  // mat-paginator is only visible when apiResponse['totalItems'] is set.
      de.componentInstance.totalItems = 2405;

      fixture.detectChanges();
      let paginator = de.query(By.css('mat-paginator'));
      expect(paginator).toBeTruthy();
      expect(paginator.componentInstance.length).toEqual(2405);
      expect(paginator.componentInstance.pageIndex).toEqual(0);
      expect(paginator.componentInstance.pageSize).toEqual(12);
      let nextButton = de.query(By.css('button.mat-paginator-navigation-next'));
      expect(nextButton.nativeElement).toBeTruthy();

      nextButton.nativeElement.click();
      
      de.componentInstance.apiResponse = {'totalItems': 2405 };  // resets apiReponse['totalItems'] after nextButton.click()
      fixture.detectChanges();
      expect(paginator.componentInstance.pageIndex).toEqual(1);
      expect(paginator.componentInstance.length).toEqual(2405);
      
      nextButton.nativeElement.click();
      
      de.componentInstance.apiResponse = {'totalItems': 2405 };  // resets apiReponse['totalItems'] after nextButton.click()
      fixture.detectChanges();
      expect(paginator.componentInstance.pageIndex).toEqual(2);
      expect(paginator.componentInstance.length).toEqual(2405);
    });

    it('should reduce the maxResults on the last page', () => {
      de.componentInstance.apiResponse = {'totalItems': 15 };
      de.componentInstance.totalItems = 15;
      fixture.detectChanges();
      let paginator = de.query(By.css('mat-paginator'));
      expect(paginator).toBeTruthy();
      expect(paginator.componentInstance.length).toEqual(15);
      expect(paginator.componentInstance.pageIndex).toEqual(0);
      expect(paginator.componentInstance.pageSize).toEqual(12);
      let nextButton = de.query(By.css('button.mat-paginator-navigation-next'));
      expect(nextButton.nativeElement).toBeTruthy();
      
      nextButton.nativeElement.click();
      
      de.componentInstance.apiResponse = {'totalItems': 15 };
      fixture.detectChanges();
      expect(paginator.componentInstance.pageIndex).toEqual(1);
      expect(paginator.componentInstance.length).toEqual(15);

    });

  });
});