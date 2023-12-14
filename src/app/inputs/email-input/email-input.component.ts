import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true
    }
  ]
})
export class EmailInputComponent implements ControlValueAccessor {
  
  @Input() errors: { [key: string]: boolean } = {};

  onChange: any = () => { };
  onTouch: any = () => { };

  private _emailInput: string;
  public get emailInput(): string {
    return this._emailInput;
  }
  public set emailInput(emailInput: string) {
    this._emailInput = emailInput;
    this.onChange(emailInput);
  }

  writeValue(emailInput: any) {
    this.emailInput = emailInput;
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