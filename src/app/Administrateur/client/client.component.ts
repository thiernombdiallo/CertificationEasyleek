import { Component } from '@angular/core';
import { GestionClientService } from 'src/app/Services/gestion-client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  clients:  []=[];
  constructor(private clientService: GestionClientService , ) {}

  ngOnInit(): void {
    this.getListeRestaurateurs();
  }
  getListeRestaurateurs() {
    this.clientService.getListeClient().subscribe((response: any) => {
      console.log("Regarder", response)
      this.clients = response.data;
    });
  }
}
