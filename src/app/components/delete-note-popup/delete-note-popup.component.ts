import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-delete-note-popup',
  standalone: true,
  imports: [],
  templateUrl: './delete-note-popup.component.html',
  styleUrl: './delete-note-popup.component.css'
})
export class DeleteNotePopupComponent {
  @Input() id!:number;
  @Output() closed = new EventEmitter<void>()
  @Output() delete = new EventEmitter<number>()

  close(){
    this.closed.emit()
  }

  onDelete(){
    console.log(this.id)
    this.delete.emit(this.id)
    this.close()
  }

  


}
