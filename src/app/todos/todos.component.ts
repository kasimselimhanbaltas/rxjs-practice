import { Component, OnDestroy } from '@angular/core';
import { UsersStore } from '../user.store';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleFilterPipe } from './title-filter.pipe';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnDestroy {

  subscriptions: Subscription = new Subscription();
  todos: any[];

  _filteredList: any[];

  todoInput = new FormControl('', [Validators.required, Validators.minLength(3)]);
  

  get filteredList() {
    if(!this.todoInput.value) return this.todos;
    if(this.todoInput.value && this.todoInput.value.length < 3) {
      this._filteredList = this.todos;
    }
    else {
      this._filteredList = this.todos.filter(todo =>
        todo.title.toLowerCase().includes(this.todoInput.value.toLowerCase())
      );
    } 
    return this._filteredList;
  }

  constructor(private fb: FormBuilder, private usersStore: UsersStore) {
    this.usersStore.getTodos();
    this.subscriptions.add(
      this.usersStore.todos$.subscribe((list) => {
        this.todos = list;
        console.log(this.todos)
      })
    );
    this._filteredList = this.todos;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  errors: { [key: string]: boolean } = this.todoInput.errors;
  shouldShowError(errorType: string): boolean {
    const control = this.todoInput;
    return control?.hasError(errorType);
  }

}
