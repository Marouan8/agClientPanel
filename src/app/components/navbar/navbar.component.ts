import { Component, OnInit } from "@angular/core";
import { AuthClientService } from "../../services/auth-client.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userLoggedIn: string;
  constructor(
    private authService: AuthClientService,
    private flashMessage: FlashMessagesService,
    private route: Router) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe(
      auth => {
        if(auth) {
          this.isLoggedIn = true;
          this.userLoggedIn = auth.email;
        } else {
          this.isLoggedIn = false;
        }
      }
    )
  }

  onLogout() {
    this.authService.logout();
    return this.route.navigate(['/login']);
  }
}
