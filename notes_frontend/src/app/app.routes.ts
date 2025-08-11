import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
  // Root route renders notes UI (main panel)
  { path: '', component: NotesComponent }
];
