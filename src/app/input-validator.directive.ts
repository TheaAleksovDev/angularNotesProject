import {
  AfterContentChecked,
  Directive,
  ElementRef,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: 'input,textarea,div[appInputValidator]',
  standalone: true,
})
export class InputValidatorDirective implements AfterContentChecked {
  private elementRef = inject(ElementRef);
  @Input({ required: false, alias: 'appInputValidator' }) checkInput!: boolean;
  public isFilled = false;
  @Input({ required: false }) inputElement = this.elementRef.nativeElement;
  @Input({ required: false }) isDate!: boolean;

  isDateValid(dateToCheck: string) {
    const date = new Date(dateToCheck);

    return !isNaN(date.getTime());
  }

  ngAfterContentChecked(): void {
    if (this.isDate) {
      const divElement = this.elementRef.nativeElement;
      const dateValid = this.isDateValid(this.inputElement.value);
      console.log(dateValid);

      if (
        (this.checkInput && !this.inputElement.value) ||
        (this.checkInput && !dateValid)
      ) {
        divElement.style.border = '2px solid red';
        this.inputElement.style.border = 'none';
      } else {
        divElement.style.border = 'none';
        this.inputElement.style.border = 'none';
      }
    } else {
      if (this.checkInput && !this.inputElement.value) {
        this.inputElement.style.border = '2px solid red';
      } else {
        this.inputElement.style.border = '2px solid lightgrey';
      }
    }
  }
}
