import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsernameInputComponent),
      multi: true
    }
  ]
})
export class UsernameInputComponent implements ControlValueAccessor{

  @Input() errors: { [key: string]: boolean } = {}

  onChange: any = () => { };
  onTouch: any = () => { };

  private _userNameInput: string;
  public get userNameInput(): string {
    return this._userNameInput;
  }
  public set userNameInput(userNameInput: string) {
    this._userNameInput = userNameInput;
    this.onChange(userNameInput);
  }

  writeValue(userNameInput: any) {
    this.userNameInput = userNameInput;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  shouldShowError(type: string): boolean {
    return this.errors && this.errors[type];
  }
  getMinLength(): number {
    return 3;
  }

}
