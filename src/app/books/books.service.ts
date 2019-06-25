import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class BooksService {
  readonly apiKey = '***REMOVED***';
  readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  search(params: HttpParams) {
    params = params.append('key', this.apiKey);
    return this.http.request('GET', this.apiUrl, {responseType: 'json', params });
  }

  // makeBook(): Promise<Book[]> {
  //   return this.http.get<Book>(this.apiUrl, { params })
  //     .map(response => {
  //       const array = JSON.parse(response.json()) as any[];
  //       const book = array.map(data => new Book(data));
  //       return book;
  //     })
  //     .toPromise();
  // }

}
