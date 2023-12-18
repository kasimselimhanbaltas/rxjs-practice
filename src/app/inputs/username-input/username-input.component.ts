import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';
import { CustomTextInputAbstractClass } from '../CustomTextInputAbstractClass';

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
export class UsernameInputComponent extends CustomTextInputAbstractClass<string> {

  //@Input() errors: { [key: string]: boolean } = {};
 
}
