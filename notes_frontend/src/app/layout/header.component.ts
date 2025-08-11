import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
/**
 * Top navigation bar with app title and actions.
 */
export class HeaderComponent {
  /**
   * Emits when user clicks to add a note.
   */
  @Output() addNote = new EventEmitter<void>();
}
