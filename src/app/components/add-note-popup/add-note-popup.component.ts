import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { type Form } from './form.model';
import { Output } from '@angular/core';
import { NotesService } from '../notes/notes.service';
import { CommonModule } from '@angular/common';
import { InputValidatorDirective } from '../../input-validator.directive';

@Component({
  selector: 'app-add-note-popup',
  standalone: true,
  imports: [FormsModule, CommonModule, InputValidatorDirective],
  templateUrl: './add-note-popup.component.html',
  styleUrl: './add-note-popup.component.css',
})
export class AddNotePopupComponent {
  success: boolean = true;

  formData: Form = {
    title: '',
    date: '',
    subject: '',
    context: '',
  };
  private notesService = inject(NotesService);

  @Output() closed = new EventEmitter<void>();
  @Output() addedNote = new EventEmitter<string>();
  alertInvalidInputs = false;

  @ViewChildren(InputValidatorDirective)
  allInputs?: QueryList<InputValidatorDirective>;
  areInputsFilled = false;

  checkInputs() {
    if (!this.alertInvalidInputs) {
      return;
    }
    let isFilled = true;
    this.allInputs?.forEach((element) => {
      if (!element.isFilled) {
        isFilled = false;
      }
    });
    this.areInputsFilled = isFilled;
  }

  onClick() {
    this.closed.emit();
  }

  onAddedNote() {
    this.addedNote.emit(this.formData.subject);
  }

  addNote() {
    this.success = this.notesService.addNote(this.formData);

    if (this.success === true) {
      this.alertInvalidInputs = false;
    } else {
      this.alertInvalidInputs = true;
    }

    if (this.success && this.success) {
      this.closed.emit();
      this.onAddedNote();
    }
  }
}
