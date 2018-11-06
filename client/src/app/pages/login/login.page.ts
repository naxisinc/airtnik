import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  email: String;
  password: String;
  headers: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {}

  onLogin() {
    let credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.authenticateUser(credentials).subscribe(
      res => {
        // Storing the token in the localStorage
        res.headers.keys().map(key => {
          if (key === 'x-auth') {
            const token = res.headers.get(key);
            localStorage.setItem('x-auth', token);
          }
        });
        // Redirect from Dashboard
        this.router.navigate(['radios']);
        // Show Success Message
        this.toast.success('Welcome to Air Technik Inc.');
      },
      error => {
        this.toast.error('The password you’ve entered is incorrect.');
      }
    );
  }
}
