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
  searchterm: string = '';
  private apiKey: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiKey = '***REMOVED***';
    this.apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  }

  searchBooks() {
    this.books = this.http.get(this.apiUrl + '?q=' + this.searchterm + '&key=' + this.apiKey);
    console.log(this.searchterm + " was the searchterm");
  }
}
