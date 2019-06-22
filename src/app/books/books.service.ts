import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BooksService {
  private apiKey = '***REMOVED***';
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  getBookList(searchterm: string, index: number) {
    const query = this.apiUrl + '?q=' + searchterm + '&&printType=books&maxResults=10&startIndex=' + index + '&key=' + this.apiKey;
    return this.http.get(query);
  }

}
