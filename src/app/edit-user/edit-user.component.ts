import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, user } from '../services/userService.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {

  selectedUser: user | any;

  myForm: FormGroup = this.fb.group({
    nameInput: ['', [Validators.required, Validators.minLength(3)]],
    nickNameInput: ['', [Validators.required, Validators.minLength(3)]],
    emailInput: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {

    this.userService.selectedUser$.subscribe((user: user) => {
      this.selectedUser = user;
      if (user) {
        this.myForm.patchValue({
          nameInput: user.name,
          nickNameInput: user.username,
          emailInput: user.email,
        });
      } else {
        this.myForm.reset();
      }
    });

  }

  onSubmit() {
    console.log("form value:", this.myForm.value)
    this.userService.updateUsers(this.myForm.value, this.selectedUser.id)
  }
  shouldShowError(controlName: string, errorType: string): boolean {
    const control = this.myForm.get(controlName);
    return control?.hasError(errorType) && control.touched;
  }

  getMinLength(controlName: string): number {
    return this.myForm.get(controlName)?.errors?.['minlength']?.requiredLength || 0;
  }


}
