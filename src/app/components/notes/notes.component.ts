import { Component, inject, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { type Note } from './note.model';
import { CommonModule } from '@angular/common';
import { NoteComponent } from '../note/note.component';
import { MatIconModule } from '@angular/material/icon';
import { AddNotePopupComponent } from '../add-note-popup/add-note-popup.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NoteComponent, MatIconModule, AddNotePopupComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  private notesService = inject(NotesService);

  selectedNote: number | undefined;
  newNoteOpened = false;

  subjects = this.notesService.getSubjects();
  selectedSubject: string = this.subjects[0];

  notes: Note[] | undefined;

  ngOnInit() {
    this.notes = this.selectedSubject
      ? this.notesService.getNotes(this.selectedSubject)
      : this.notesService.getNotes(this.subjects[0]);
  }

  onSelectedNote(id: number) {
    if (this.selectedNote === id) {
      this.selectedNote = undefined;
    } else {
      this.selectedNote = id;
    }
  }
  onSelectSubject(subject: string) {
    this.selectedSubject = subject.toLowerCase();
    this.notes = this.notesService.getNotes(subject);
  }

  openCloseNewNote() {
    this.newNoteOpened = !this.newNoteOpened;
  }

  refreshSubject(subject:string){
    this.onSelectSubject(subject)
  }
  
  anyNotesCheck(): boolean {
    return this.notesService['some']((note: Note) => note.subject === 'math');
  }

}
