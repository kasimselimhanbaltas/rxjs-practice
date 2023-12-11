import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.css']
})
export class UsernameInputComponent {

  @Input() value: string = '';
  @Output() inputChange = new EventEmitter<string>();
  @Input() errors: { [key: string]: boolean } = {}
  //@Input() validators: ValidatorFn[] = [];

  onChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.inputChange.emit(inputValue);
  }

  shouldShowError(type: string): boolean {
    return this.errors && this.errors[type];
  }
  getMinLength(): number {
    // implement your logic to get min length for the name input
    return 3;
  }
  // applyValidators(control: AbstractControl): void {
  //   for (const validator of this.validators) {
  //     validator(control);
  //   }
  // }

}
