import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent {
  @Input() value: string = '';
  @Output() inputChange = new EventEmitter<string>();
  @Input() errors: { [key: string]: boolean } = {};

  onChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.inputChange.emit(inputValue);
  }

  shouldShowError(type: string): boolean {
    return this.errors && this.errors[type];
  }
}