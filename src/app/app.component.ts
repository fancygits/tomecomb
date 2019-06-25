import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import { BooksService } from './books/books.service';
import { HttpParams } from '@angular/common/http';
import { debounceTime, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tome Comb';
  books: any;
  isSearching: boolean;
  apiResponse: any;
  params = new HttpParams({
    fromObject: {
      q: '',
      printType: 'books',
      startIndex: '0',
      maxResults: '12'
    }
  });
  pageSize = 12;
  currentPage = 0;
  totalItems = 0;
  
  @ViewChild('bookSearchbar') bookSearchbar: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
      this.currentPage = 0;
      this.search(text);
    });
  }

  private searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    let params = this.params.set('q', term);
    return this.booksService.search(params);
  }

  private search(term: string) {
    this.isSearching = true;
    this.searchGetCall(term).subscribe((res) => {
      console.log('API Result', res);
      this.isSearching = false;
      this.apiResponse = res;
      if (this.params.get('startIndex') == '0') {
        this.totalItems = this.apiResponse['totalItems'];
      }
    }, (err) => {
      this.isSearching = false;
      console.error('Error', err);
    });
  }

  hiddenSearch() {
    let term = this.bookSearchbar.nativeElement.value;
    this.search(term);
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.updatePage();
  }

  private updatePage() {
    let maxResults = this.pageSize;
    if (this.currentPage == this.paginator.getNumberOfPages() - 1) {
      maxResults = this.paginator.getNumberOfPages() % this.paginator.pageSize;
    }
    this.params = this.params.set('startIndex', (this.currentPage * this.pageSize).toString());
    this.params = this.params.set('maxResults', maxResults.toString());
    this.hiddenSearch();
  }
}
