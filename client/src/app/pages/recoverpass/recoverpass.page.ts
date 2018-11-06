import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss']
})
export class RecoverpassPage implements OnInit {
  email: String = '';

  constructor(private authService: AuthService, private toast: ToastService) {}

  ngOnInit() {}

  recover() {
    let emailObj = { email: this.email };
    this.authService.verifyEmail(emailObj).subscribe(
      res => {
        this.toast.success(
          'An email was sent to your inbox. Please check it and follow the instructions.'
        );
      },
      error => {
        if (error.status === 401) {
          this.toast.error('This email does not exist in the database.');
        } else {
          this.toast.error('Something is wrong.');
        }
      }
    );
  }
}
