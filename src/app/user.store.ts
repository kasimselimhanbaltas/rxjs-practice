import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, Observable, catchError, switchMap, tap } from "rxjs";
import { UserService } from "./services/userService.service";
import { user } from "./services/userService.service";

export interface UsersState {
  users: user[];
  selectedUser: user | any;
  todoList: any[];
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {

  usersLocalList: user[];
  todoList: any[];

  constructor(private service: UserService) {
    super({selectedUser: {}, users: [], todoList: []});
  }

  readonly usersListEffect = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(() => this.service.fetchUsers()),
      tap({
          next: (users: user[]) => {
            this.setUsers(users);
            this.usersLocalList = users;
            console.log("cs")
          },
          error: (e) => this.logError(e),
        }),
    )
  );
  readonly todoListEffect = this.effect((trigger$: Observable<void>) =>
  trigger$.pipe(
    switchMap(() => this.service.fetchTodos()),
    tap({
        next: (todos: any[]) => {
          this.setTodos(todos);
        },
        error: (e) => this.logError(e),
      }),
  )
);
  getTodos(): void {
    this.todoListEffect();
  }
  getUsers(): void {
    this.usersListEffect();
  }

  updateUsers(formInput, id: number): void {
    this.usersLocalList[id - 1].name = formInput.nameInput;
    this.usersLocalList[id - 1].username = formInput.nickNameInput;
    this.usersLocalList[id - 1].email = formInput.emailInput;

    this.setUsers(this.usersLocalList);
  }

  readonly setUsers = this.updater((state, payload: user[]) => ({ ...state, users: payload }));

  readonly users$: Observable<user[]> = this.select(state => state.users);
  
  readonly setSelectedUser = this.updater((state, payload: user) => ({ ...state, selectedUser: payload }));

  readonly selectedUser$: Observable<user> = this.select(state => state.selectedUser);
  
  readonly setTodos = this.updater((state, payload: any[]) => ({ ...state, todoList: payload }));

  readonly todos$: Observable<any[]> = this.select(state => state.todoList);

  logError(e: any): void {
    throw new Error("Method not implemented.");
  }
}

