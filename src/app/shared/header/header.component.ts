import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = false; // Update with actual auth logic
  currentUser: any = null; // Update with actual user data

  logout() {
    // Implement logout logic
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}