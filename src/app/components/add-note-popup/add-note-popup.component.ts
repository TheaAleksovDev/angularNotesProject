import { Component, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type Form } from './form.model';
import { Output } from '@angular/core';
import { NotesService } from '../notes/notes.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-note-popup',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-note-popup.component.html',
  styleUrl: './add-note-popup.component.css',
})
export class AddNotePopupComponent {
  success: boolean = true;
  formData: Form = {
    title: '',
    date: null,
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

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.formData.date = event.target.value;
  }

  addNote() {
    this.success = this.notesService.addNote(this.formData);
    if (this.success && this.success) {
      this.closed.emit();
      this.onAddedNote();
    }
  }
}
