import { Component, OnInit } from "@angular/core";
import { AuthClientService } from "../../services/auth-client.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthClientService,
    private flashMessage: FlashMessagesService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe(
      auth => {
        if(auth) {
          return this.route.navigate(['/']);
        }
      }
    )
  }

  onLogin() {
    this.authService.login(this.email, this.password).then((auth) => {
      if (auth) {
        this.flashMessage.show("you are logged successfully", {
          cssClass: "alert-success",
          timeout: 5000,
        });
        this.route.navigate(['/']);
      }
    })
    .catch(error => {
      this.flashMessage.show(error.message, {
        cssClass: "alert-danger",
        timeout: 10000,
      });
    })
  }

  onLoginWithGoogle() {
    this.authService.loginWithGoogle().then
    this.authService.login(this.email, this.password).then((auth) => {
      if (auth) {
        this.flashMessage.show("you are logged successfully", {
          cssClass: "alert-success",
          timeout: 5000,
        });
        this.route.navigate(['/']);
      }
    })
    .catch(error => {
      this.flashMessage.show(error.message, {
        cssClass: "alert-danger",
        timeout: 10000,
      });
    })
  }

}
