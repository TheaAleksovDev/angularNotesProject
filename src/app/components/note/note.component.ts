import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { type Note } from '../notes/note.model';
import { CommonModule, DatePipe } from '@angular/common';
import { NotesService } from '../notes/notes.service';

import { MatIconModule } from '@angular/material/icon';
import { DeleteNotePopupComponent } from '../delete-note-popup/delete-note-popup.component';
@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, MatIconModule, DeleteNotePopupComponent, DatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  @Input({ required: true }) note!: Note;
  @Input() selectedNote: number | undefined;
  deleteNoteOpened = false;

  private notesService = inject(NotesService);

  @Output() selected = new EventEmitter<number>();
  @Output() deleteActionCompleted = new EventEmitter<string>();

  onClick() {
    this.selected.emit(this.note.id);
  }

  openCloseDeletePopup() {
    this.deleteNoteOpened = !this.deleteNoteOpened;
  }

  onDeleteClick(id: number) {
    this.notesService.deleteNote(id);
    this.deleteActionCompleted.emit(this.note.subject);
  }
}
