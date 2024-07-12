import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-remove-subject-popup',
  standalone: true,
  imports: [],
  templateUrl: './remove-subject-popup.component.html',
  styleUrl: './remove-subject-popup.component.css',
})
export class RemoveSubjectPopupComponent {
  @Output() removed = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  onRemoveSubject() {
    this.removed.emit();
  }

  onClose() {
    this.closed.emit();
  }
}
