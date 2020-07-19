import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Client } from "../../models/client";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:null,
    balance:null
  };
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(
      client => {
        this.client = client;
        console.log(this.client.firstName);
        console.log('client', client['firstName'])
      }
    )
  }
  
  onSubmit() {
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Client Updated', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/client/',this.id])
  }
}

