import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditUserComponent } from 'src/app/edit-user/edit-user.component';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css']
})
export class NameInputComponent {

   // 1.01.42   1.22.14
  @Input() value: string = '';
  @Output() inputChange = new EventEmitter<string>();
  @Input() errors: { [key: string]: boolean} = {};

  onChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.inputChange.emit(inputValue);
  }
  shouldShowError(type: string): boolean {
    return this.errors && this.errors[type];
  }

  getMinLength(): number {
    return 3;
  }
}
 