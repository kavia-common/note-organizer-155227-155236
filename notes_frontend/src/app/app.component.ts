import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';
import { NotesComponent } from './notes/notes.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NotesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
/**
 * Root component hosting the overall layout: sidebar, header, and main content area.
 */
export class AppComponent {
  /**
   * The title of the application.
   */
  title = 'Notes Organizer';
}
