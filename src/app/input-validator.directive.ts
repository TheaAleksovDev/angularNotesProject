import {
  AfterViewChecked,
  Directive,
  ElementRef,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: 'input,textarea,div[appInputValidator]',
  standalone: true,
})
export class InputValidatorDirective implements AfterViewChecked {
  private elementRef = inject(ElementRef);
  @Input({ required: false, alias: 'appInputValidator' }) checkInput!: boolean;
  public isFilled = false;
  @Input({ required: false }) inputElement = this.elementRef.nativeElement;
  @Input({ required: false }) isDate!: boolean;

  ngAfterViewChecked(): void {
    if (this.isDate) {
      const divElement = this.elementRef.nativeElement;
      console.log(divElement);
      if (this.checkInput && !this.inputElement.value) {
        divElement.style.border = '2px solid red';
        this.inputElement.style.border = 'none';

        this.isFilled = false;
      } else {
        divElement.style.border = 'none';
        this.inputElement.style.border = 'none';

        this.isFilled = true;
      }
    } else {
      if (this.checkInput && !this.inputElement.value) {
        this.inputElement.style.border = '2px solid red';
        this.isFilled = false;
      } else {
        this.inputElement.style.border = '2px solid lightgrey';
        this.isFilled = true;
      }
    }
  }
}
