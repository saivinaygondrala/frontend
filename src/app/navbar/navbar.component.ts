import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('loginToken') ? true : false;
  }
  public logout() {
    if (localStorage.getItem('loginToken')){
      localStorage.removeItem('loginToken');
      localStorage.removeItem('username');
      window.location.reload();
    }

  }
}
