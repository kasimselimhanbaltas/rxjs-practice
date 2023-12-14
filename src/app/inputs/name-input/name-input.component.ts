import { Component, Input } from '@angular/core';
import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR,  } from '@angular/forms';
import { CustomTextInputAbstractClass } from '../CustomTextInputAbstractClass';


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
export class NameInputComponent extends CustomTextInputAbstractClass<string> {

  @Input() errors: { [key: string]: boolean } = {};
 
}
