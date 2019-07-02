import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiKeys } from './apikeys';
import { Observable } from 'rxjs';

@Injectable()
export class BooksService {
  readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {
   }

  search(params: HttpParams) {
    params = params.append('key', ApiKeys.apiKey);
    return this.http.request('GET', this.apiUrl, {responseType: 'json', params });
  }
}
