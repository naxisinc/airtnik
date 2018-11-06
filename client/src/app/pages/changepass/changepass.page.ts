import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.page.html',
  styleUrls: ['./changepass.page.scss']
})
export class ChangepassPage implements OnInit {
  password: String;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  changePassForm = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    },
    { validator: this.checkPasswords }
  );

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {}

  changePass() {
    const data = {
      password: this.changePassForm.value.password,
      token: this.router.url.split('=')[1]
    };
    this.authService.changePassword(data).subscribe(
      result => {
        // Show Success Message
        this.toast.success('The password was updated successfuly');
        // Redirect Login Page
        this.router.navigate(['login']);
      },
      error => {
        this.toast.error('Your token is expired. Try again.');
      }
    );
  }
}
