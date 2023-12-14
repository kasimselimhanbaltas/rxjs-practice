import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditUserComponent } from 'src/app/edit-user/edit-user.component';
import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,  } from '@angular/forms';


@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameInputComponent),
      multi: true
    }
  ]
})
export class NameInputComponent implements ControlValueAccessor {

  @Input() errors: { [key: string]: boolean } = {};

  onChange: any = () => { };
  onTouch: any = () => { };

  private _nameInput: string;
  public get nameInput(): string {
    return this._nameInput;
  }
  public set nameInput(nameInput: string) {
    this._nameInput = nameInput;
    this.onChange(nameInput);
  }

  writeValue(nameInput: any) {
    this.nameInput = nameInput;
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
