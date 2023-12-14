export abstract class CustomTextInputAbstractClass<T> {

  // @Input() errors: { [key: string]: boolean } = {};

  abstract errors:  { [key: string]: boolean };

  onChange: any = () => { };
  onTouch: any = () => { };

  private _inputValue: T;
  public get inputValue(): T {
    return this._inputValue;
  }
  public set inputValue(inputValue: T) {
    this._inputValue = inputValue;
    this.onChange(inputValue);
  }

  writeValue(inputValue: any) {
    this.inputValue = inputValue;
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