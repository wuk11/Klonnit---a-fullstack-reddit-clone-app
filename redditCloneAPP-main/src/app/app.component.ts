import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private auth: AuthService) {}

  isCollapsed = false;
  isMobileView = false;

  ngOnInit(){
    this.checkScreenSize()
  }

  @HostListener('window:resize', [])
  onResize(){
    this.checkScreenSize()
  }

  checkScreenSize(){
    this.isMobileView = window.innerWidth < 992;
  }

  collapse(){
    this.isCollapsed = !this.isCollapsed
  }

  logout() {
    this.auth.logout();
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  isLoggedOut() {
    return this.auth.isLoggedOut();
  }
}
