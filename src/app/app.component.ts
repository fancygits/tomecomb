import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tome Comb';
  books: any = {};
  private apiKey: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiKey = '***REMOVED***';
    this.apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  }

  searchBooks(searchterm: string) {
    this.books = this.http.get(this.apiUrl + '?q=' + searchterm + '&key=' + this.apiKey);
  }
}
