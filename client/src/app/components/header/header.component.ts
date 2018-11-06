import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogoutClick() {
    this.authService.logout().subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['home']);
        localStorage.clear();
      } else {
        console.log('Something is wrong');
      }
    });
  }
}
