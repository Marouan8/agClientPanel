import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/client";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthClientService } from "../../services/auth-client.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    balance: 0,
    user: ''
  };
  constructor(
    private clientService: ClientService,
    private authService: AuthClientService,
    private route: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe(
      auth => {
        this.client.user = auth.uid;
      }
    )
  }

  onSubmit() {
    console.log(this.client);
    this.clientService.newClient(this.client);
    this.flashMessage.show("client added successfully", {
      cssClass: "alert-primary",
      timeout: 4000,
    });
    return this.route.navigate(["/"]);
  }
}
