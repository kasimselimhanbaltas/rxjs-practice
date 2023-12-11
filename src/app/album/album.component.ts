import { Component, OnDestroy } from '@angular/core';
import { UserService, user } from '../services/userService.service';
import { Observable, Subscription } from 'rxjs';
import { UsersStore } from '../user.store';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnDestroy {

  subscriptions: Subscription = new Subscription();
  selectedUser: user | any;
  photos$?: Observable<any[]>;
  users: user[];

  constructor(private service: UserService, private usersStore: UsersStore) {
    this.subscriptions.add(
      this.usersStore.selectedUser$.subscribe((user) => {
      this.selectedUser = user;
      console.log("Album User: ", this.selectedUser);
    })
    );
    this.subscriptions.add(
      this.usersStore.users$.subscribe((list) => {
      this.users = list;
      console.log(list)
    })
    );
    //this.photos$ = this.fetchAlbum(1);

  }

  fetchAlbum(user: user): Observable<any> {
    let id = user.id;
    return this.service.getThirdAlbumPhotos(id);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
