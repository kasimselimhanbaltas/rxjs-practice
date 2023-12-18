import { Component, OnInit } from '@angular/core';
import { UsersStore } from './user.store';
import { Observable } from 'rxjs';
import { user } from './services/userService.service';
// import { UsersStore } from './edit-user/user-store.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersStore]
})
export class AppComponent{

  constructor(private usersStore: UsersStore) {
    this.usersStore.getUsers();
    this.usersStore.getTodos();
  }

  title = 'rxjs-practice';

}
