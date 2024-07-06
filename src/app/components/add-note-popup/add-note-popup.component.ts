import { Component, EventEmitter, inject, OnInit } from '@angular/core';

import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { type Form } from './form.model';
import { Output } from '@angular/core';
import { NotesService } from '../notes/notes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-note-popup',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  onClick() {
    this.closed.emit();
  }

  onAddedNote() {
    this.addedNote.emit(this.formData.subject);
  }

  private convertToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  addNote() {
    this.success = this.notesService.addNote(this.formData);
    if (this.success && this.success) {
      this.closed.emit();
      this.onAddedNote();
    }
  }
}
