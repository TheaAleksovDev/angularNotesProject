import { Injectable } from '@angular/core';
import { type Note } from './note.model';
import { Form } from '../add-note-popup/form.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notes: Note[] = [];

  private subjects: string[] = [];

  constructor() {
    const notes = localStorage.getItem('notes');
    const subjects = localStorage.getItem('subjects');
    if (notes != undefined) {
      this.notes = JSON.parse(notes);
    }
    if (subjects != undefined) {
      this.subjects = JSON.parse(subjects);
    }
  }

  private saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  private saveSubjects() {
    localStorage.setItem('subjects', JSON.stringify(this.subjects));
  }

  getNotes(subject: string) {
    return this.notes.filter(
      (note) => note.subject.toLowerCase() === subject.toLowerCase()
    );
  }

  getSubjects() {
    return this.subjects;
  }

  tryToAddSubject(subject: string) {
    if (!this.subjects.includes(subject.toLowerCase())) {
      this.subjects.push(subject.toLowerCase());
      this.saveSubjects();
    }
  }

  removeSubject(subjectToRemove: string) {
    this.subjects = this.subjects.filter(
      (subject) => subject !== subjectToRemove
    );
    this.notes = this.notes.filter((note) => note.subject !== subjectToRemove);
    this.saveSubjects();
    this.saveNotes();
  }

  addNote(formData: Form) {
    if (
      formData.title &&
      formData.date &&
      formData.subject &&
      formData.context
    ) {
      this.notes.push({ ...formData, id: this.notes.length + 1 });
      this.tryToAddSubject(formData.subject);
      this.saveNotes();

      return true;
    } else {
      return false;
    }
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter((note) => note.id != id);
    this.saveNotes();
  }
}
