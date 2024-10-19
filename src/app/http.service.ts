import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  // Make sure this method exists and is named correctly
  getJournals(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/get-journals`);
  }
}
