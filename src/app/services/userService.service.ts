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

  /*
  user selected -> get user id
  fetch the albums from  https://jsonplaceholder.typicode.com/users/{}/albums
  find the id of third album 
  fetch the photos from https://jsonplaceholder.typicode.com/albums/{}/photos
  */

  constructor(private http: HttpClient) { }
  selectedUserSubject = new Subject();
  selectedUser$ = this.selectedUserSubject.asObservable();

  setSelectedUser(selectedUser: user) {
    this.selectedUserSubject.next(selectedUser);
    console.log("Service User(UPDATED):", selectedUser)
  }

  usersSubject = new BehaviorSubject<user[]>([]);
  users$ = this.usersSubject.asObservable();
  usersLocalList: user[];
  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(`${this.baseUrl}/users`).pipe(
      tap(users => {
        this.usersSubject.next(users);
        this.usersLocalList = users;
      })
    );
  }

  // Bu metodun kullanılması, BehaviorSubject'in değerini dışarıdan değiştirmek için kullanılır.
  updateUsers(formInput, id: number): void {
    console.log(formInput)
    this.usersLocalList[id - 1].name = formInput.nameInput;
    this.usersLocalList[id - 1].username = formInput.nickNameInput;
    this.usersLocalList[id - 1].email = formInput.emailInput;
    console.log("updating user: ", this.usersLocalList[id - 1])
    console.log(formInput, this.usersLocalList)
    this.usersSubject.next(this.usersLocalList);
  }

  getThirdAlbumPhotos(userId: number): Observable<any[]> {
    // Fetch the albums by user
    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/albums`).pipe(
      // Fetch the photos of 3rd album
      mergeMap(albums => this.http.get<any[]>(`${this.baseUrl}/albums/${albums[2].id}/photos`))
    );
  }
  // mergeMap, switchMap, 

  // getData(): Observable<user[]> {
  //   let result = new Subject<user[]>();
  //   fetch(this.apiUrl)
  //     .then((response) => response.json())
  //     .then((json) => result.next(json));
  //   return result.asObservable();
  // }

}
