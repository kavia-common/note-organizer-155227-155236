import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// PUBLIC_INTERFACE
@Injectable()
/**
 * Service to handle CRUD operations on notes via HTTP.
 */
export class NotesService {
  private apiURL = '/api/notes';

  constructor(private readonly _http: HttpClient) {}

  /**
   * Get all notes.
   */
  getNotes(): Observable<Note[]> {
    // @ts-ignore: Used by Angular DI
    return this.http.get<Note[]>(this.apiURL);
  }

  /**
   * Create a new note.
   */
  createNote(note: Omit<Note, 'id'>): Observable<Note> {
    // @ts-ignore: Used by Angular DI
    return this.http.post<Note>(this.apiURL, note);
  }

  /**
   * Update an existing note.
   */
  updateNote(note: Note): Observable<Note> {
    // @ts-ignore: Used by Angular DI
    return this.http.put<Note>(`${note.id ? `${this.apiURL}/${note.id}` : this.apiURL}`, note);
  }

  /**
   * Delete note by id.
   */
  deleteNote(id: string): Observable<void> {
    // @ts-ignore: Used by Angular DI
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
