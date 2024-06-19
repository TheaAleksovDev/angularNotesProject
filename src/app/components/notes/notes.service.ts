import { Injectable } from '@angular/core';
import { type Note } from './note.model';
import { Form } from '../add-note-popup/form.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  [x: string]: any;
  private notes: Note[] = [];


  private subjects: string[] = []

  constructor(){
    const notes =localStorage.getItem('notes')
    const subjects = localStorage.getItem('subjects')
    if(notes != undefined){
      this.notes = JSON.parse(notes)
    }
    if(subjects != undefined){
      this.subjects = JSON.parse(subjects)
    }
 
  }

  private saveNotes(){
    localStorage.setItem('notes',JSON.stringify(this.notes))
  }

  
  private saveSubjects(){
    localStorage.setItem('subjects',JSON.stringify(this.subjects))
  }



  getNotes(subject: string) {
    return this.notes.filter(
      (note) => note.subject.toLowerCase() === subject.toLowerCase()
    );
  }

  getSubjects() {
    return this.subjects;
  }

  addNote(formData: Form) {
    if (
      formData.title &&
      formData.date &&
      formData.subject &&
      formData.context
    ) {
      this.notes.push({ ...formData, id: this.notes.length + 1 });
      if (!this.subjects.includes(formData.subject.toLowerCase())) {
        this.subjects.push(formData.subject.toLowerCase());
        this.saveSubjects()
      }
      

      this.saveNotes()

      return true;

    } else {
      return false;
    }
  }
  
  deleteNote(id:number){

    this.notes = this.notes.filter(note => note.id != id)
    this.saveNotes()
  }

  

  
}
