import { Component, inject, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { type Note } from './note.model';
import { CommonModule } from '@angular/common';
import { NoteComponent } from '../note/note.component';
import { MatIconModule } from '@angular/material/icon';
import { AddNotePopupComponent } from '../add-note-popup/add-note-popup.component';
import { RemoveSubjectPopupComponent } from '../remove-subject-popup/remove-subject-popup.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    NoteComponent,
    MatIconModule,
    AddNotePopupComponent,
    RemoveSubjectPopupComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  private notesService = inject(NotesService);

  selectedNoteId: number | undefined;
  newNoteOpened = false;
  removeSubjectOpened = false;

  subjects = this.notesService.getSubjects();
  selectedSubject: string = this.subjects[0];
  subjectToRemove: string | undefined;

  notes: Note[] | undefined;

  ngOnInit() {
    this.notes = this.selectedSubject
      ? this.notesService.getNotes(this.selectedSubject)
      : this.notesService.getNotes(this.subjects[0]);
  }

  onRemoveSubjectConfirm(subject: string) {
    this.openCloseRemoveSubject();
    this.subjectToRemove = subject;
  }

  onRemoveSubject() {
    if (this.subjectToRemove) {
      this.notesService.removeSubject(this.subjectToRemove);
      this.openCloseRemoveSubject();
      this.subjects = this.notesService.getSubjects();
      this.onSelectSubject(this.subjects[0]);
    }
  }

  openCloseRemoveSubject() {
    this.removeSubjectOpened = !this.removeSubjectOpened;
  }

  onSelectedNote(id: number) {
    if (this.selectedNoteId === id) {
      this.selectedNoteId = undefined;
    } else {
      this.selectedNoteId = id;
    }
  }
  onSelectSubject(subject: string) {
    this.selectedSubject = subject.toLowerCase();
    this.notes = this.notesService.getNotes(subject);
  }

  openCloseNewNote() {
    this.newNoteOpened = !this.newNoteOpened;
  }

  refreshSubject(subject: string) {
    this.onSelectSubject(subject);
  }
}
