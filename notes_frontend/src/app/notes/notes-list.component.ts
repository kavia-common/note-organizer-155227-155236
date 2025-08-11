import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from './notes.service';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
/**
 * List sidebar for notes, with search.
 */
export class NotesListComponent {
  /**
   * List of notes to display.
   */
  @Input() notes: Note[] = [];
  /**
   * The currently selected note.
   */
  @Input() selectedNote: Note | null = null;
  /**
   * Current search input value.
   */
  @Input() searchText = '';
  /**
   * Emitted when the user updates search text.
   */
  @Output() search = new EventEmitter<string>();
  /**
   * Emitted when the user selects a note.
   */
  @Output() selectNote = new EventEmitter<Note>();
  /**
   * Emitted when the "New Note" button is clicked.
   */
  @Output() addNote = new EventEmitter<void>();

  // Helper for type-safe input event in template
  emitSearch(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.search.emit(target ? target.value : '');
  }
}
