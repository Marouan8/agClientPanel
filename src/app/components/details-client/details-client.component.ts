import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/client';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  id: string;
  client: Client;
  showBalance: boolean = false;
  constructor(private clientService: ClientService, private route: ActivatedRoute, private flashMessage: FlashMessagesService, private router: Router) { }

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
    this.flashMessage.show('Balance updated', {cssClass: 'alert-warning', timeout: 4000})
  }

  deleteClient(id: string) {
    if(confirm('are you sure to delete this client')) {
      this.clientService.deleteClient(id);
      this.flashMessage.show('Client deleted', {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/']);
    
    }
  }

}
