import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { UserService, user } from '../services/userService.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent {
  onUserSelected(user: user) {
    this.photos$ = this.fetchAlbum(user);
    this.userService.setSelectedUser(user);
  }
  ngOnInit() {
    this.userService.selectedUser$.subscribe((user) => {
      this.selectedUser = user;
      console.log("Album User: ", this.selectedUser);
    });
  }

  selectedUser: user | any;
  photos$?: Observable<any[]>;
  users: user[];
  constructor(private service: UserService, private userService: UserService) {
    this.userService.getUsers().subscribe();
    this.userService.users$.subscribe((list) => {
      this.users = list;
      console.log(list)
    });
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

}
