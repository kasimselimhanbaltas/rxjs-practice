import { Component, OnDestroy } from '@angular/core';
import { UserService, user } from '../services/userService.service';
import { UsersStore } from '../user.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnDestroy {

  subscriptions: Subscription = new Subscription();
  selectedUser: user | any;
  users: user[];

  constructor(private service: UserService, private userService: UserService, private usersStore: UsersStore) {
    this.subscriptions.add(
      this.usersStore.users$.subscribe((list) => {
        this.users = list;
      })
    );
    //this.photos$ = this.fetchAlbum(1);

  }
  onUserSelected(user: user) {
    //this.photos$ = this.fetchAlbum(user);
    this.usersStore.setSelectedUser(user);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
