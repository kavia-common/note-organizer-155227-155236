/* global confirm */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note, NotesService } from './notes.service';
import { NotesListComponent } from './notes-list.component';
import { NoteEditorComponent } from './note-editor.component';

/**
 * Container for notes list and editor. Handles note selection and passing events between child components.
 */
@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  providers: [NotesService],
  imports: [
    CommonModule,
    NotesListComponent,
    NoteEditorComponent
  ]
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  selectedNote: Note | null = null;
  searchText: string = '';
  loading = false;

  constructor(private readonly _notesService: NotesService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  /**
   * Fetch all notes from backend and update the view.
   */
  fetchNotes() {
    this.loading = true;
    this._notesService.getNotes().subscribe({
      next: (notes: Note[]) => {
        this.notes = notes;
        this.doSearch(this.searchText); // Also update filteredNotes
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  /**
   * Handler for searching notes.
   * @param text search input
   */
  doSearch(text: string) {
    const q = (text ?? '').toLowerCase();
    this.filteredNotes = q.length
      ? this.notes.filter((note) => (note.title + note.content).toLowerCase().includes(q))
      : this.notes.slice();
    if (this.selectedNote && !this.filteredNotes.some(n => n.id === this.selectedNote!.id)) {
      this.selectedNote = this.filteredNotes.length > 0 ? this.filteredNotes[0] : null;
    }
    this.searchText = text;
  }

  /**
   * Select a note to view/edit.
   */
  selectNote(note: Note) {
    this.selectedNote = note;
  }

  /**
   * Begin creation of a new note.
   */
  createNote() {
    this.selectedNote = {
      id: '',
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Handle note save event (new or updated).
   */
  onSave(note: Note) {
    this.loading = true;
    // If editing (id exists), update. Else, create.
    if (note.id) {
      this._notesService.updateNote(note).subscribe({
        next: (updated: Note) => {
          const idx = this.notes.findIndex(n => n.id === updated.id);
          if (idx > -1) this.notes[idx] = updated;
          this.doSearch(this.searchText);
          this.selectedNote = updated;
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
    } else {
      this._notesService.createNote(note).subscribe({
        next: (created: Note) => {
          this.notes.unshift(created);
          this.doSearch(this.searchText);
          this.selectedNote = created;
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
    }
  }

  /**
   * Delete a note (with confirmation).
   */
  onDelete(note: Note) {
    if (!note.id) return;
    if (!confirm('Are you sure you want to delete this note?')) return;
    this.loading = true;
    this._notesService.deleteNote(note.id).subscribe({
      next: () => {
        this.notes = this.notes.filter(n => n.id !== note.id);
        this.doSearch(this.searchText);
        this.selectedNote = null;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
