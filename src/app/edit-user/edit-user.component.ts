import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, user } from '../services/userService.service';
import { UsersStore } from '../user.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnDestroy{
  
  external: string;
  selectedUser: user | any;
  subscriptions: Subscription = new Subscription();

  userFormGroup: FormGroup = this.fb.group({
    nameInput: ['', [Validators.required, Validators.minLength(3)]],
    nickNameInput: ['', [Validators.required, Validators.minLength(3)]],
    emailInput: ['', [Validators.required, Validators.email]],
  });
childval: string;

  constructor(private fb: FormBuilder, private userStore: UsersStore) {

    this.subscriptions.add(
    this.userStore.selectedUser$.subscribe((user: user) => {
      this.selectedUser = user;
      if (user) {
        this.userFormGroup.patchValue({
          nameInput: user.name,
          nickNameInput: user.username,
          emailInput: user.email,
        });
      } else {
        this.userFormGroup.reset();
      }
    })
    );
    // Input default values are empty strings
    this.userFormGroup.patchValue({
      nameInput: "",
      nickNameInput: "",
      emailInput: "",
    });

  }

  onSubmit() {
    console.log("form value:", this.userFormGroup.value)
    this.userStore.updateUsers(this.userFormGroup.value, this.selectedUser.id)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
