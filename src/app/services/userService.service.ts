// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, mergeMap, tap } from 'rxjs';

export interface user {
  "id": number,
  "name": string,
  "username": string,
  "email": string,
  "address": {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
      "lat": string,
      "lng": string
    }
  }
  "phone": string,
  "website": string,
  "company": {
    "name": string,
    "catchPhrase": string,
    "bs": string
  }
}


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }
  
  fetchUsers(): Observable<user[]> {
    return this.http.get<user[]>(`${this.baseUrl}/users`)
  }

  getThirdAlbumPhotos(userId: number): Observable<any[]> {
    // Fetch the albums by user
    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/albums`).pipe(
      // Fetch the photos of 3rd album
      mergeMap(albums => this.http.get<any[]>(`${this.baseUrl}/albums/${albums[2].id}/photos`))
    );
  }
}
