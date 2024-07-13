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

  ngAfterViewChecked(): void {
    if (this.checkInput && !this.elementRef.nativeElement.value) {
      console.log('red');
      this.elementRef.nativeElement.style.border = '2px solid red';
    } else {
      console.log('grey');

      this.elementRef.nativeElement.style.border = '2px solid lightgrey';
    }
  }
}
