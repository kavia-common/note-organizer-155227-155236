import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from './notes.service';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css'
})
/**
 * The editor UI for editing or creating a note.
 */
export class NoteEditorComponent implements OnChanges {
  @Input() note: Note | null = null;
  @Output() save = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<Note>();
  @Output() cancel = new EventEmitter<void>();

  titleValue = '';
  contentValue = '';
  isEditing = false;

  ngOnChanges(changes: SimpleChanges): void {
    // Update values when a different note is selected
    if (changes['note']) {
      this.titleValue = this.note?.title ?? '';
      this.contentValue = this.note?.content ?? '';
      this.isEditing = !!(this.note && this.note.id && (this.note.title || this.note.content));
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Save new or edited note.
   */
  doSave() {
    if (!this.titleValue.trim() && !this.contentValue.trim()) return;
    const base: Note = this.note
      ? {
          id: this.note.id ?? '',
          createdAt: this.note.createdAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          title: this.titleValue,
          content: this.contentValue,
        }
      : {
          id: '',
          title: this.titleValue,
          content: this.contentValue,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
    this.save.emit(base);
  }

  // PUBLIC_INTERFACE
  /**
   * Delete this note.
   */
  doDelete() {
    if (this.note && this.note.id) this.delete.emit(this.note);
  }
}
