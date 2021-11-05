import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: any;
  constructor(private router: Router, private news: NewsService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  // Logout 
  logOut() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

     this.router.navigateByUrl(`login`);
  }
  // Navigate to Profile
  profile() {
     this.router.navigateByUrl(`profile`);
  }
  // Get CurrentUser Info
  getCurrentUser() {
    let res = this.news.currentuser;
    this.username = res.username;
  }
  home() {
     this.router.navigateByUrl(`home`);
    
  }
}
