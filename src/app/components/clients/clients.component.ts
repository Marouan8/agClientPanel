import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/client";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthClientService } from "../../services/auth-client.service";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  total: number = 0;
  serachClients: Client[];
  constructor(
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthClientService
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      this.clientService.getClients(auth.uid).subscribe((clients) => {
        this.serachClients = this.clients = clients;
        this.total = this.getTotal();
      });
    });
  }

  getTotal() {
    return this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);
  }

  deleteClient(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(id);
        this.flashMessage.show("Client deleted", {
          cssClass: "alert-danger",
          timeout: 4000,
        });
        this.router.navigate(["/"]);
        Swal.fire({
          title: "deleted",
          text: "this client is deleted",
          icon: "success",
          timer: 3000,
        });
      }
    });
  }
  serach(query: string) {
    this.serachClients = query
      ? this.clients.filter((client) =>
          client.firstName.toLowerCase().includes(query.toLowerCase())
        ) ||
        this.clients.filter((client) =>
          client.lastName.toLowerCase().includes(query.toLowerCase())
        )
      : this.clients;
  }
}
