import { Component, OnInit } from '@angular/core';
import { AuthClientService } from '../../services/auth-client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password: string;
  constructor(
    private authService: AuthClientService, 
    private route: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.register(this.email, this.password).then(
      register => {
          this.flashMessage.show('congratulations, you are in !', {cssClass: 'alert-success', timeout: 5000});
          this.route.navigate(['/']);
        }
    )
   .catch(error => {
    this.flashMessage.show(error.message, {cssClass: 'alert-danger', timeout: 5000})
   } )
  } 

}
