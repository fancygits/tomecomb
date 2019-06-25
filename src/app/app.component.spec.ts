import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { BooksService } from './books/books.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MOCKBOOK } from './books/book.mock';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let booksService: BooksService;
  let booksSpy;
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
    debugElement = fixture.debugElement;

    // BooksService provided by Component
    booksService = debugElement.injector.get(BooksService);
    booksSpy = spyOn(booksService, 'search').and.returnValue(mockBook);
  }));

  it('should get book results', () => {
    fixture.detectChanges();
    let inst = fixture.componentInstance;
    inst.bookSearchbar.nativeElement.value = 'harry potter';
    fixture.whenStable().then(() => {
      inst.hiddenSearch();
      expect(booksSpy).toHaveBeenCalled();
      expect(fixture.componentInstance.apiResponse).toContain('volumeInfo');
    });
  });

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