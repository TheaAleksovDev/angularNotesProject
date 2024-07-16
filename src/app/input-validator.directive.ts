import {
  AfterViewChecked,
  Directive,
  ElementRef,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: 'input,textarea[appInputValidator]',
  standalone: true,
})
export class InputValidatorDirective implements AfterViewChecked {
  private elementRef = inject(ElementRef);
  @Input({ required: true, alias: 'appInputValidator' }) checkInput!: boolean;
  public isFilled = false;

  ngAfterViewChecked(): void {
    if (this.checkInput && !this.elementRef.nativeElement.value) {
      this.elementRef.nativeElement.style.border = '2px solid red';
      this.isFilled = false;
    } else {
      this.elementRef.nativeElement.style.border = '2px solid lightgrey';
      this.isFilled = true;
    }
  }
}
