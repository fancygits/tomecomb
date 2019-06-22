import { Component } from '@angular/core';
import { BooksService } from './books/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tome Comb';
  books: any = {};
  searchterm = '';
  page = 0;

  constructor(private booksService: BooksService) {}

  searchBooks() {
    this.booksService.getBookList(this.searchterm, this.page).subscribe(
      data => { this.books = data; },
      err => console.error(err),
      () => console.log('finished getting books with the keyword ' + this.searchterm)
    );
  }
}
