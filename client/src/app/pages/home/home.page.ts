import { Component, OnInit } from '@angular/core';
import { SendEmailService } from '../../services/sendEmail.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  contact: Object;
  constructor(private email: SendEmailService, private toast: ToastService) {
    this.contact = {
      name: '',
      email: '',
      message: ''
    };
  }

  ngOnInit() {}

  send() {
    this.email.send(this.contact).subscribe(
      result => {
        // Show Success Message
        this.toast.success(
          'Thank you for contacting us. We will respond to your request as soon as possible.'
        );
      },
      error => {
        // Show Error Message
        this.toast.error(
          'The email can not be delivery. Try again or call us at (305) 994-7771. Thank you'
        );
      }
    );
  }
}
