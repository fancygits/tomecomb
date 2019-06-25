import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiKeys } from './apikeys';

@Injectable()
export class BooksService {
  private apiKey = 'xxxxxxxxxxxxxx';
  readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {
    this.apiKey = ApiKeys.apiKey;
   }

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
