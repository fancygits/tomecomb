import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import { BooksService } from './books/books.service';
import { HttpParams } from '@angular/common/http';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tome Comb';

  @ViewChild('bookSearchbar') bookSearchbar: ElementRef;
  books: any;
  isSearching: boolean;
  apiResponse: any;
  page = 0;
  params = new HttpParams({
    fromObject: {
      printType: 'books',
      startIndex: '0',
      maxResults: '10'
    }
  });

  constructor(private booksService: BooksService) {
    this.isSearching = false;
    this.apiResponse = [];
  }

  ngOnInit() {
    fromEvent(this.bookSearchbar.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      ,filter(res => res.length > 2)  // if character length is greater than 2
      ,debounceTime(1000)             // Time in milliseconds between key event
      ,distinctUntilChanged()         // If previous query is different from current
    ).subscribe((text: string) => {   // subscription for response
      this.search(text);
    });
  }

  private searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    let params = this.params.append('q', term);
    return this.booksService.search(params);
  }

  private search(term: string) {
    this.isSearching = true;
    this.searchGetCall(term).subscribe((res) => {
      console.log('API Result', res);
      this.isSearching = false;
      this.apiResponse = res;
    }, (err) => {
      this.isSearching = false;
      console.error('Error', err);
    });
  }

  hiddenSearch() {
    let term = this.bookSearchbar.nativeElement.value;
    this.search(term);
  }
}
